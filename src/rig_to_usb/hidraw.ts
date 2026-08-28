import {pushLog} from '../state.svelte';
import {setReturnMsg} from '../setXK852Status';
import {type CmdType} from '../state.svelte';
import { type Cmd, CMD, toCBOR, deserializeHIDReport } from './cmd';
import * as State from '../state.svelte';
export var device:HIDDevice;

const reportId = 0;

export async function connectRigToUsb() {
  if ("hid" in navigator) {
    const deviceFilter = {
      filters : [
        { vendorId: 0x1209, productId: 0x0001 }
      ]
    };
    const devices = await navigator.hid.requestDevice(deviceFilter);
    if (devices && devices[0]) {
      const rig_to_usb = devices[0];
      await rig_to_usb.open();
      device = rig_to_usb;
      device.addEventListener("inputreport", handleHidInput);
      State.setSendCmdCallback(send_cat);
    }
  }
}

function handleHidInput(event: HIDInputReportEvent) {
  const { data, device:_d, reportId:_r } = event;
  const bytes = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  const report = deserializeHIDReport(bytes);
  if (report.ok()) {
    console.log(report.value);
    const msg_string = (new TextDecoder("utf-8")).decode(
      report.value.cat_rx_msg!.subarray(1, -1)
    );
    pushLog(
      { src: 'rig_to_usb:cat_rx_msg'
        , date: new Date()
        , msg: report.value.cat_rx_msg
	, data: msg_string
      });
    setReturnMsg(msg_string);
  } else {
    console.error("Decode Error",bytes);
    console.error("Decode Error",report.error);
  }
};

function send_cat(cmd: CmdType) {
  device.sendReport(
    reportId,
    toCBOR({
      cmd: CMD.SendCat,
      bytes: cmd.xk852serialNative
    })
  )
};

export function sendReport(cmd: Cmd) {
  device.sendReport(reportId, toCBOR(cmd))
}
