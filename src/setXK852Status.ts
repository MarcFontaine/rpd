import { XK852Power } from './types';
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
    rig.frequency = Number(m[1])*10;
    rig.frequencyConfirmed = true;
    switch (m[11]) {
      case '0' : rig.power = XK852Power.Off; break
      case '1' : rig.power = XK852Power.RxOnly; break
      case '2' : rig.power = XK852Power.Low; break
      case '3' : rig.power = XK852Power.Mid; break
      case '4' : rig.power = XK852Power.Full; break     
      default  : rig.power = {};
    }
    console.log(arr[0][2]);
    console.log(arr[0][3]);
    console.log(arr[0][4]);
    console.log(arr[0][5]);
    console.log(arr[0][6]);
    console.log(arr[0][7]);
    console.log(arr[0][8]);
    console.log(arr[0][9]);
    console.log(arr[0][10]);
    console.log(arr[0][11]);
  }
}

