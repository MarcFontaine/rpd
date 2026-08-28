<script lang="ts">
import {toXK852Cmd} from '../cat.ts';
import {type Cmd, CMD, prebuild_cmds, toCBOR} from './cmd.ts';
import {sendReport, connectRigToUsb} from './hidraw.ts';
//console.log(prebuild_cmds);

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
    onclick={() => {sendReport(prebuild_cmds.led_on);}}
  >
  LED ON
  </button>
  </div>

  <div>
  <button
    onclick={() => {sendReport(prebuild_cmds.led_off);}}
  >
  LED OFF
  </button>
  </div>

  <div>
  <button
    onclick={() => {sendReport(prebuild_cmds.led_blink_1s);}}
  >
  LED Blink
  </button>
  </div>

  <div>
  <button
    onclick={() => { sendReport(
      {
        cmd: CMD.SendCat,
	bytes: toXK852Cmd("*O1")
      })
    }
    }
  >
  Cat query status
  </button>
  </div>
</div>
