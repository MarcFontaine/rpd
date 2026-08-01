import { encode, bool, bytes, arrayLen, u8, uint} from 'cbor-utils'

const CMD = {
  StartBootLoader: 'StartBootLoader',
  Panic: 'Panic',
  Test:  'Test',
  Reset: 'Reset',
  LED: 'LED',
  LEDBlink: 'LEDBlink',
  RadioOn: 'RadioOn',
  RadioOff: 'RadioOff',
  TxOn: 'TxOn',
  TxOff: 'TxOff',
  MorseSpeed: 'MorseSpeed',
  MorseSend: 'MorseSend',
  MorseAppend: 'MorseAppend'
} as const

export const tags = {
  StartBootLoader: 0,
  Panic:           1,
  Test:            2,
  Reset:           3,
  LED:             4,
  LEDBlink:        5,
  RadioOn:         6,
  RadioOff:        7,
  TxOn:            8,
  TxOff:           9,
  MorseSpeed:     10,
  MorseSend:      11,
  MorseAppend:    12,
} as const;

export type Cmd = {
  readonly cmd: typeof CMD[keyof typeof CMD];
  [variableData: string]: any;
};

export function toCBOR(cmd:Cmd):Uint8Array {
  return encode((e) => {
  const tag = tags[cmd.cmd];
  function two() {
    e.encode(arrayLen, 2);
    e.encode(u8, tag);
  }
  function oneNumber(n: number) {
    e.encode(arrayLen, 2);
    e.encode(u8, tag);
    e.encode(uint, n);
  }
  function txt_bytes(t: string) {
    e.encode(arrayLen, 2);
    e.encode(u8, tag);
    const encoder = new TextEncoder();
    e.encode(bytes, encoder.encode(t));
  }
  switch (cmd.cmd) {
    case 'LED':
      two(); e.encode(bool, cmd.value);
      break;
    case 'LEDBlink':
      oneNumber(cmd.interval);
      break;
    case 'RadioOn':
      oneNumber(cmd.time);
      break;
    case 'TxOn':
      oneNumber(cmd.time);
      break;
    case 'MorseSpeed':
      oneNumber(cmd.ditlen);
      break;
    case 'MorseSend':
      txt_bytes(cmd.txt);
      break;
    case 'MorseAppend':
      txt_bytes(cmd.txt);
      break;
    default:
      e.encode(arrayLen, 1);
      e.encode(u8, tag)
  };
  }
  )
}

export const prebuild_cmds = {
  start_boot_loader: toCBOR({cmd: CMD.StartBootLoader}),
  panic: toCBOR({cmd: CMD.Panic}),
  test: toCBOR({cmd: CMD.Test}),
  reset: toCBOR({cmd: CMD.Reset}),
  led_on: toCBOR({cmd: CMD.LED, value: true}),
  led_off: toCBOR({cmd: CMD.LED, value: false}),
  led_blink_1s: toCBOR({cmd: CMD.LEDBlink, interval: 1000}),
  radio_on_10s: toCBOR({cmd: CMD.RadioOn, time: 10000}),
  radio_off: toCBOR({cmd: CMD.RadioOff}),
  tx_on_4s:  toCBOR({cmd: CMD.TxOn, time: 4000}),
  tx_off: toCBOR({cmd: CMD.TxOff}),
  wps_24 : toCBOR({cmd: CMD.MorseSpeed, ditlen: 50 })
};
