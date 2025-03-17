import { XK852Power, XK852Mode } from './types';
import { rig } from './state.svelte';

// F1407400K  I2B   J9G0N0V0Z1H1S2

export function setReturnMsg(msg: string)
{
  //ignore this message T message
  if (msg != '\n T  ') {
    rig.returnMsg = msg;
    parseXK852Status(msg);
  }
}

function parseXK852Status(str: string) {
  const pattern:RegExp = /\*F(\d{7})K(.{2})I(.)B(...)J(.)G(.)N(.)V(.)Z(.)H(.)S(.)/g;
  const matches: RegExpStringIterator<RegExpExecArray> = str.matchAll(pattern);
  const arr = Array.from(matches);
  if (arr && arr[0]) {
    const m=arr[0];
    rig.time = Date.now ();
    rig.frequency = parseFrequency(m[1]);
    rig.mode = parseMode(m[3]);
    rig.power = parsePower(m[11]);
  }
}

function parseFrequency(s: string) {
  return 10*Number(s);
}

function parsePower(s: string) {
  switch (s) {
    case '0' : return XK852Power.Off;
    case '1' : return XK852Power.RxOnly;
    case '2' : return XK852Power.Low;
    case '3' : return XK852Power.Mid;
    case '4' : return XK852Power.Full;
    default  : return {}; // TODO
  }
}

function parseMode(s: string) {
  switch (s) {
    case '1' : return XK852Mode.AME;
    case '2' : return XK852Mode.USB;
    case '3' : return XK852Mode.LSB;
    case '5' : return XK852Mode.CW;
    case '6' : return XK852Mode.ISB;
    case '7' : return XK852Mode.FSK_LP;
    case '8' : return XK852Mode.FSK_MID;
    case '9' : return XK852Mode.FSK_HP;
    default  : return {};
  }
}
