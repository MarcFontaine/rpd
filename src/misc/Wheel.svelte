<script lang="ts">
let wheel = $state(0);
let dx = $state(0);
let dy = $state(0);
let dz = $state(0);

let accum_x = $state(0);
let accum_y = $state(0);
let accum_z = $state(0);


const deviceFilter = {
  filters : [
    { vendorId: 0x0483, productId: 0x5757, usagePage: 1 }
  ]
  };

function handleHidInput(event) {
  const { data, device, reportId } = event;
  wheel = data.getInt16(1, true);
};

async function connectRigControl() {
  if ("hid" in navigator) {
//    navigator.hid.addEventListener("connect", ({ device }) => {
//      console.log(`HID connected: ${device.productName}`);
//    });
    const devices = await navigator.hid.requestDevice(deviceFilter);
    console.log(devices);
    const rigControl = devices[0];
    await rigControl.open();
    rigControl.addEventListener("inputreport",handleHidInput);
  }
}

</script>

<div class="wheel"

  onwheel={(event) => {
    dx=event.deltaX;
    dy=event.deltaY;
    dx=event.deltaZ;
    accum_x+=event.deltaX;
    accum_y+=event.deltaY;
    accum_x+=event.deltaZ;

}}
>
Scroll Wheel diagnostic:
<br>
dx={dx}
<br>
dy={dy}
<br>
dz={dz}
<br>
Accumumated x={accum_x}
<br>
Accumumated y={accum_y}
<br>
Accumumated z={accum_z}
</div>

<div class="wheel">
RigControl USB diagnostic:
<br>
wheel={wheel}
<br>

<button
  onclick={connectRigControl}
>
Connect HID device
</button>
</div>
<style>
.wheel {
  font-family: "Courier New";
  font-size: 3em;
  font-weight: bold;
  white-space: pre;
}
</style>