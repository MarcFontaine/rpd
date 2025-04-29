import {setGuiMode, GuiMode} from './gui';
import * as State from './state.svelte';
import {type Cmd} from './state.svelte';
import {gui} from './state.svelte';
import {setReturnMsg} from './setXK852Status';
import { XK852Power, XK852Mode } from './types';

const encoder = new TextEncoder();
/**
 * Turn the transmitter off
 */
export function setTxOff() {
  sendCmd(toCmd('*X2'));
  setGuiMode(GuiMode.Connected);
}

/**
 * Turn the transmitter On
 */
export function setTxOn() {
  sendCmd(toCmd('*X1'));
  setGuiMode(GuiMode.ConnectedTxOn);
}

/**
 * Set the frequency
 @param {number} f the target frequncy
 @return {number} the frequency that was used
 */
export function setFrequency(f: number) {
  sendCmd(setFrequencyCmd(f));
}

export function setFrequencyRateLimited(f: number) {
  sendRateLimitedCmd(setFrequencyCmd(f));
}

function setFrequencyCmd(f: number): State.Cmd {
  gui.frequency = {
      value: f
    , confirmed: false
    , time: Date.now ()
  };
  let x = Math.round(f / 10);
  if (x < 150000) x = 150000;
  if (x > 3000000) x = 3000000;
  const fstring = String(x).padStart(7, `0000000` );
  const cmd = `*F${fstring}`;
  return toCmd(cmd);
}

const minSendCmdDelay = 150; // ms
let sendCmdTimeOut : (null | number) = null;

export function sendRateLimitedCmd(c:Cmd) {
  if (Date.now() - latestSendCmdTime > minSendCmdDelay) {
    if (sendCmdTimeOut) clearTimeout(sendCmdTimeOut)
    sendCmdTimeOut = null;
    sendCmd(c);
  }
  else {
    if (sendCmdTimeOut) clearTimeout(sendCmdTimeOut);
    sendCmdTimeOut = setTimeout(() => sendCmd(c), minSendCmdDelay);
  }
}

export function syncRig() { sendCmd(toCmd('*O1')); }

var syncRigDeamonId:number = 0

export function syncRigDeamon() {
  syncRigDeamonId++;
  syncRigDeamonWorker(syncRigDeamonId);
}

function syncRigDeamonWorker(id:number) {
  if ( State.settings.rigSyncInterval
      && State.settings.rigSyncInterval != 0
      && id == syncRigDeamonId ) {
    setTimeout(syncRigDeamonWorker, 1000 * State.settings.rigSyncInterval, id);
    syncRig();
  }
}

export function setOpMode (m: XK852Power) {
  switch (m) {
    case 'Off'          : {set_OP_MODE_OFF(); break; }
    case 'Receive Only' : {set_OP_MODE_RX(); break; }
    case 'Low Power'    : {set_OP_MODE_TX_LOW(); break; }
    case 'Medium Power' : {set_OP_MODE_TX_MID(); break; }
    case 'Full Power'   : {set_OP_MODE_TX_FULL(); break; }
  }
}

export function set_OP_MODE_OFF()     { sendCmd(toCmd('*S0')); }
export function set_OP_MODE_RX()      { sendCmd(toCmd('*S1')); }
export function set_OP_MODE_TX_LOW()  { sendCmd(toCmd('*S2')); }
export function set_OP_MODE_TX_MID()  { sendCmd(toCmd('*S3')); }
export function set_OP_MODE_TX_FULL() { sendCmd(toCmd('*S4')); }

export function setMode (m: XK852Mode) {
  switch (m) {
    case 'AME'              : { set_MODE_AME(); break; }
    case 'USB'              : { set_MODE_USB(); break; }
    case 'LSB'              : { set_MODE_LSB(); break; }
    case 'CW'               : { set_MODE_CW(); break; }
    case 'ISB'              : { set_MODE_ISB(); break; }
    case 'FSK Low Power'    : { set_MODE_FSK_LP(); break; }
    case 'FSK Medium Power' : { set_MODE_FSK_MID(); break; }
    case 'FSK High Power'   : { set_MODE_FSK_HP(); break; }
  }
}

export function set_MODE_AME()     { sendCmd(toCmd('*I1')); }
export function set_MODE_USB()     { sendCmd(toCmd('*I2')); }
export function set_MODE_LSB()     { sendCmd(toCmd('*I3')); }
export function set_MODE_CW()      { sendCmd(toCmd('*I5')); }
export function set_MODE_ISB()     { sendCmd(toCmd('*I6')); }
export function set_MODE_FSK_LP()  { sendCmd(toCmd('*I7')); }
export function set_MODE_FSK_MID() { sendCmd(toCmd('*I8')); }
export function set_MODE_FSK_HP()  { sendCmd(toCmd('*I9')); }

export let latestSendCmdTime = Date.now ();

export function sendCmd(cmd: Cmd) {
  latestSendCmdTime = Date.now ();
  if (!State.settings.demoMode) {
    State.sendCmdCallback(cmd);
  } else  {
    // TODO: setReturnMsg only parses status reports
    setReturnMsg(cmd.xk852String);
  }
}

export function toCmd(cmd: string) {
  return (toCmdTimeout(cmd, 300))
};

function toCmdTimeout(cmd: string, timeout:number) {
  setReturnMsg('...wait...');
  return (
    { xk852String: cmd
    , xk852serialNative: toXK852Cmd(cmd)
    , rigctld: toRigctld(cmd)
    , timeout: timeout
    });
}

/**
 * Format XK852
* @param {string} cmd the command string
* @return {Uint8Array} the XK852 command bytes
*/
function toXK852Cmd(cmd: string): Uint8Array {
  const m = encoder.encode(cmd);
  const msg = new Uint8Array(m.length + 2);
  msg[0] = 10; // begin of message : LF
  msg.set(m, 1);
  msg[m.length + 1] = 13; // begin of message : CR
  return msg;
}

// Some commands may time-out because the XK852 needs its time
// for example transition from power mode rx-only to tx
// send command exprecting 10 return chars:
// +\send_cmd_rx \0x0a\0x2a\0x4f\0x31\0x0d 10
// send command and ignore return:
// +\send_cmd \0x0a\0x2a\0x4f\0x31\0x0d

/**
 * Format Cmd for rigctld
* @param {string} cmd the command string
* @return {string} the hamlib rigctld command
*/
function toRigctld(cmd: string): string {
  var arr = [];
  arr.push('+\\send_cmd_rx ');
  const binaryCMD = toXK852Cmd(cmd);
  binaryCMD.forEach( (byte) => {
    arr.push('\\0x');
    arr.push(byte.toString(16));
  });
  arr.push(' 34');
  arr.push('\n');
  return arr.join('');
}
