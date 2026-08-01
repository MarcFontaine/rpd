export var device;

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
      device= rig_to_usb;
    }
  }
}
