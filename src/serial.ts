/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  SerialPort as SerialPortPolyfill,
} from 'web-serial-polyfill';

import {setGuiMode, GuiMode} from './gui';
import * as State from './state.svelte';
import {type Cmd} from './state.svelte';
import {pushLog, setReturnMsg} from './state.svelte';

/**
 * Elements of the port selection dropdown extend HTMLOptionElement so that
 * they can reference the SerialPort they represent.
 */
export declare class PortOption extends HTMLOptionElement {
  port: SerialPort | SerialPortPolyfill;
}

export let portSelector: HTMLSelectElement;

export let portCounter = 1;
export let port: SerialPort | SerialPortPolyfill | undefined;
export let reader: ReadableStreamDefaultReader;

export const urlParams = new URLSearchParams(window.location.search);
const bufferSize = 8 * 1024; // 8kB

/**
 * Adds the given port to the selection dropdown.
 *
 * @param {SerialPort} port the port to add
 * @return {PortOption}
 */
function addNewPort(port: SerialPort | SerialPortPolyfill): PortOption {
  const portOption = document.createElement('option') as PortOption;
  portOption.textContent = `Port ${portCounter++}`;
  portOption.port = port;
  return portOption;
}


/**
 * Sets |port| to the currently selected port. If none is selected then the
 * user is prompted for one.
 */
async function getSelectedPort(): Promise<void> {
    try {
      const serial = navigator.serial;
      port = await serial.requestPort({});
    } catch (e) {
      return;
    }
}

/**
 * Show serial input and diagnostics.
 * @param {string} msg  the message to show.
 * @param {void} callback
 * Optional callback that fires when the data was processed.
*/
function dumpSerialOut(msg: string, callback?: () => void): void {
  pushLog(
    { src: 'serial-outmsg'
    , date: new Date()
    , msg: msg
    });
  if (callback) callback();
}

/**
 * Resets the UI back to the disconnected state.
 */
function markDisconnected(): void {
  dumpSerialOut('<DISCONNECTED>\n');
  port = undefined;
  State.setSendCmdCallback(undefined);
}

class LineBreakTransformer {
  container: string;
  constructor() {
    this.container = '';
  }
//TODO: handle multiline outputs from TX852
  transform(chunk:string, controller:any) {
    this.container += chunk;
    const lines = this.container.split('\r');
    this.container = lines.pop() || '';
    if (lines.length >0) {
       controller.enqueue(lines.join(''));
    }
  }

  flush(controller:any) {
    controller.enqueue(this.container);
  }
}

/**
 * Initiates a connection to the selected port.
 */
export async function connectToPort(): Promise<void> {
  await getSelectedPort();
  if (!port) {
    return;
  }
  // TODO: https://wicg.github.io/serial/#setsignals-method
  // TODO: Test with plain old serial adapter not with microham
  const options = {
    baudRate: 9600,
    dataBits: 7,
    parity: 'even' as ParityType,
    stopBits: 1,
    flowControl: <const> 'none',
    bufferSize,
  };
  console.log(options);

  try {
    await port.open(options);
    dumpSerialOut('<CONNECTED>\n');
    setGuiMode(GuiMode.Connected);
    State.setSendCmdCallback(sendSerialReadReply());
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      dumpSerialOut(`<ERROR: ${e.message}>\n`);
    }
    setGuiMode(GuiMode.SomeError);
    markDisconnected();
    return;
  }
  // See: https://wicg.github.io/serial/#dom-serialport-readable
  // There two kinds of error here:
  // Recoverable errors (for example parity errors)
  // and non-recoverable errors
  while (port && port.readable) {
    try {
      reader = port.readable.pipeThrough(new TextDecoderStream())
              .pipeThrough(new TransformStream(new LineBreakTransformer()))
              .getReader();
      for (;;) {
        const {value, done} = await reader.read();
        if (done) {
          break;
        }
        setReturnMsg(value);
        pushLog(
          { src: 'serial-read'
          , date: new Date()
          , msg: value
	  , data: (new TextEncoder()).encode(value)
          });
      }
    } catch (e) {
      console.error(e);
      await new Promise<void>((resolve) => {
         if (e instanceof Error) {
           dumpSerialOut(`<ERROR: ${e.message}>\n`, resolve);
        }
      });
    } finally {
       if (reader) {
         reader.releaseLock();
      }
     }
   }

   if (port) {
     try {
       await port.close();
     } catch (e) {
       console.error(e);
       if (e instanceof Error) {
         dumpSerialOut(`<ERROR: ${e.message}>`);
       }
     }
     setGuiMode(GuiMode.SomeError);
     markDisconnected();
     };
};

/**
 * Closes the currently active connection.
 */
export async function disconnectFromPort(): Promise<void> {
  // Move |port| into a local variable so that connectToPort() doesn't try to
  // close it on exit.
  const localPort = port;
  port = undefined;

  if (reader) {
    await reader.cancel();
  }

  if (localPort) {
    try {
      await localPort.close();
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        dumpSerialOut(`<ERROR: ${e.message}>`);
        setGuiMode(GuiMode.SomeError);
      }
    }
  }
  markDisconnected();
  setGuiMode(GuiMode.NotConnected);
}

/**
 * Send Data to the serial port
 * @param {Uint8Array} data the command to send
*/
function sendSerialReadReply() {
  let readTask: ReturnType<typeof setTimeout>
  return (
    (cmd: Cmd) => {
      if (readTask) clearTimeout(readTask);

      sendSerial(cmd.xk852serialNative);
//      readTask = setTimeout(readSerial, cmd.timeout); TODO: schedule some timeout
    }
  )
};

/**
 * Send Data to the serial port
 * @param {Uint8Array} data the command to send
*/
function sendSerial(bytes: Uint8Array) {
  if (port?.writable == null) {
    console.warn(`unable to find writable port`);
    return;
  }

  const writer = port.writable.getWriter();
  writer.write(bytes);
  pushLog(
    { src: 'serial-write'
    , date: new Date()
    , msg: String.fromCharCode(...bytes)
    , data: bytes
    });
  writer.releaseLock();
}

export async function initWebSerial() {

  const serial = navigator.serial;
  const ports: (SerialPort | SerialPortPolyfill)[] = await serial.getPorts();
  ports.forEach((port) => addNewPort(port));

  navigator.serial.addEventListener('connect', (event) => {
    // const portOption = addNewPort(event.target as SerialPort);
    addNewPort(event.target as SerialPort);
    // portOption.selected = true;
    connectToPort();
  });
}
