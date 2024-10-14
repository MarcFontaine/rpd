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

import {Terminal} from 'xterm';
import {FitAddon} from 'xterm-addon-fit';
import {WebLinksAddon} from 'xterm-addon-web-links';
import 'xterm/css/xterm.css';
import {
  serial as polyfill, SerialPort as SerialPortPolyfill,
} from 'web-serial-polyfill';

/**
 * Elements of the port selection dropdown extend HTMLOptionElement so that
 * they can reference the SerialPort they represent.
 */
declare class PortOption extends HTMLOptionElement {
  port: SerialPort | SerialPortPolyfill;
}

let portSelector: HTMLSelectElement;
let connectButton: HTMLButtonElement;
let PTT_OFF: HTMLButtonElement;
let PTT_ON: HTMLButtonElement;

let portCounter = 1;
let port: SerialPort | SerialPortPolyfill | undefined;
let reader: ReadableStreamDefaultReader | ReadableStreamBYOBReader | undefined;

const urlParams = new URLSearchParams(window.location.search);
const usePolyfill = urlParams.has('polyfill');
const bufferSize = 8 * 1024; // 8kB

const term = new Terminal({
  scrollback: 10_000,
});

const fitAddon = new FitAddon();
term.loadAddon(fitAddon);

term.loadAddon(new WebLinksAddon());

const encoder = new TextEncoder();
term.onData(sendSerial);

/**
 * Returns the option corresponding to the given SerialPort if one is present
 * in the selection dropdown.
 *
 * @param {SerialPort} port the port to find
 * @return {PortOption}
 */
function findPortOption(port: SerialPort | SerialPortPolyfill):
    PortOption | null {
  for (let i = 0; i < portSelector.options.length; ++i) {
    const option = portSelector.options[i];
    if (option.value === 'prompt') {
      continue;
    }
    const portOption = option as PortOption;
    if (portOption.port === port) {
      return portOption;
    }
  }

  return null;
}

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
  portSelector.appendChild(portOption);
  return portOption;
}

/**
 * Adds the given port to the selection dropdown, or returns the existing
 * option if one already exists.
 *
 * @param {SerialPort} port the port to add
 * @return {PortOption}
 */
function maybeAddNewPort(port: SerialPort | SerialPortPolyfill): PortOption {
  const portOption = findPortOption(port);
  if (portOption) {
    return portOption;
  }

  return addNewPort(port);
}

/**
 * Sets |port| to the currently selected port. If none is selected then the
 * user is prompted for one.
 */
async function getSelectedPort(): Promise<void> {
  if (portSelector.value == 'prompt') {
    try {
      const serial = usePolyfill ? polyfill : navigator.serial;
      port = await serial.requestPort({});
    } catch (e) {
      return;
    }
    const portOption = maybeAddNewPort(port);
    portOption.selected = true;
  } else {
    const selectedOption = portSelector.selectedOptions[0] as PortOption;
    port = selectedOption.port;
  }
}

/**
 * Show serial input and diagnostics.
 * @param {String} msg  the message to show.
 * @param {void} callback
 * Optional callback that fires when the data was processed.
*/
function dumpSerialOut(msg:string, callback?: () => void): void {
  const element=document.getElementById('serialOut');
  if (element) element.innerText = msg;
  term.writeln(msg, callback);
}

/**
 * Resets the UI back to the disconnected state.
 */
function markDisconnected(): void {
  dumpSerialOut('<DISCONNECTED>');
  portSelector.disabled = false;
  connectButton.textContent = 'Connect';
  connectButton.disabled = false;
  port = undefined;
}

/**
 * Initiates a connection to the selected port.
 */
async function connectToPort(): Promise<void> {
  await getSelectedPort();
  if (!port) {
    return;
  }

  const options = {
    baudRate: 9600,
    dataBits: 7,
    parity: 'even' as ParityType,
    stopBits: 1,
    flowControl: <const> 'none',
    bufferSize,
  };
  console.log(options);

  portSelector.disabled = true;
  connectButton.textContent = 'Connecting...';
  connectButton.disabled = true;

  try {
    await port.open(options);
    dumpSerialOut('<CONNECTED>');
    connectButton.textContent = 'Disconnect';
    connectButton.disabled = false;
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      dumpSerialOut(`<ERROR: ${e.message}>`);
    }
    markDisconnected();
    return;
  }

  while (port && port.readable) {
    try {
      try {
        reader = port.readable.getReader({mode: 'byob'});
      } catch {
        reader = port.readable.getReader();
      }

      let buffer = null;
      for (;;) {
        const {value, done} = await (async () => {
          if (reader instanceof ReadableStreamBYOBReader) {
            if (!buffer) {
              buffer = new ArrayBuffer(bufferSize);
            }
            const {value, done} =
                await reader.read(new Uint8Array(buffer, 0, bufferSize));
            buffer = value?.buffer;
            return {value, done};
          } else {
            return await reader.read();
          }
        })();

        if (value) {
          await new Promise<void>((resolve) => {
            dumpSerialOut(value, resolve);
          });
        }
        if (done) {
          break;
        }
      }
    } catch (e) {
      console.error(e);
      await new Promise<void>((resolve) => {
        if (e instanceof Error) {
          dumpSerialOut(`<ERROR: ${e.message}>`, resolve);
        }
      });
    } finally {
      if (reader) {
        reader.releaseLock();
        reader = undefined;
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

    markDisconnected();
  }
}

/**
 * Closes the currently active connection.
 */
async function disconnectFromPort(): Promise<void> {
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
      }
    }
  }

  markDisconnected();
}

document.addEventListener('DOMContentLoaded', async () => {
  const terminalElement = document.getElementById('terminal');
  if (terminalElement) {
    term.open(terminalElement);
    fitAddon.fit();

    window.addEventListener('resize', () => {
      fitAddon.fit();
    });
  }

  portSelector = document.getElementById('ports') as HTMLSelectElement;
  PTT_OFF = document.getElementById('PTT_OFF') as HTMLButtonElement;
  PTT_ON = document.getElementById('PTT_ON') as HTMLButtonElement;
  PTT_ON.addEventListener('click', setTxOn);
  PTT_OFF.addEventListener('click', setTxOff);

  connectButton = document.getElementById('connect') as HTMLButtonElement;
  connectButton.addEventListener('click', () => {
    if (port) {
      disconnectFromPort();
    } else {
      connectToPort();
    }
  });

  const polyfillSwitcher =
      document.getElementById('polyfill_switcher') as HTMLAnchorElement;
  if (usePolyfill) {
    polyfillSwitcher.href = './';
    polyfillSwitcher.textContent = 'Switch to native API';
  } else {
    polyfillSwitcher.href = './?polyfill';
    polyfillSwitcher.textContent = 'Switch to API polyfill';
  }

  const serial = usePolyfill ? polyfill : navigator.serial;
  const ports: (SerialPort | SerialPortPolyfill)[] = await serial.getPorts();
  ports.forEach((port) => addNewPort(port));

  // These events are not supported by the polyfill.
  // https://github.com/google/web-serial-polyfill/issues/20
  if (!usePolyfill) {
    navigator.serial.addEventListener('connect', (event) => {
      // const portOption = addNewPort(event.target as SerialPort);
      addNewPort(event.target as SerialPort);
      // portOption.selected = true;
      connectToPort();
    });
    navigator.serial.addEventListener('disconnect', (event) => {
      const portOption = findPortOption(event.target as SerialPort);
      if (portOption) {
        portOption.remove();
      }
    });
  }
});

/**
 * Turn the transmitter off
 */
function setTxOff() {
  document.body.style.background = 'rgb(36, 234, 29)';
}

/**
 * Turn the transmitter On
 */
function setTxOn() {
  document.body.style.background = 'rgb(14, 6, 237)';
}

/**
 * Send Data to the serial port
 * @param {string} data the command to send
*/
function sendSerial(data:string) {
  if (port?.writable == null) {
    console.warn(`unable to find writable port`);
    return;
  }

  const writer = port.writable.getWriter();

  writer.write(encoder.encode(data));

  writer.releaseLock();
}
