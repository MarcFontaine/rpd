<script lang="ts">
import {type Cmd, prebuild_cmds, toCBOR} from './cmd.ts';
import {device, connectRigToUsb} from './hidraw.ts';
//console.log(prebuild_cmds);

const reportId = 0;
</script>

<div>
CMD test
  <div>
  <button
    onclick={() => {connectRigToUsb()}}
  >
  Connect RigToUsb
  </button>
  </div>

  <div>
  <button
    onclick={() => {device.sendReport(reportId, prebuild_cmds.led_on);}}
  >
  LED ON
  </button>
  </div>

  <div>
  <button
    onclick={() => {device.sendReport(reportId, prebuild_cmds.led_off);}}
  >
  LED OFF
  </button>
  </div>

  <div>
  <button
    onclick={() => {device.sendReport(reportId, prebuild_cmds.led_blink_1s);}}
  >
  LED Blink
  </button>
  </div>

</div>
