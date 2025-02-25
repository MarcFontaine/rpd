export var currentProfile: any;
export function setCurrentProfile(p: any) {
  currentProfile = p;
}

export type Cmd =
  { xk852serialNative: Uint8Array
  , rigctld: string
  , timeout: number
  };

export var sendCmdCallback: any;

export function setSendCmdCallback(fn: any) {
  sendCmdCallback = fn;
}
