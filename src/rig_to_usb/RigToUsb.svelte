<script lang="ts">
import { onMount } from 'svelte';
import {toXK852Cmd} from '../cat.ts';
import {type Cmd, CMD, prebuild_cmds, toCBOR} from './cmd.ts';
import {isConnected, sendCmd, sendReport, tryAutoConnectRigToUsb, connectRigToUsb} from './hidraw.ts';

let isWorkable = $state(false);
onMount(async () => {
  if (!isConnected()) {
    tryAutoConnectRigToUsb()
      .then ((s) => isWorkable = s)
  }
})

let radioOnTimeOut = $state(3600);

</script>
<div>
  <h3>
  RigToUsb Test
  </h3>
<div>
  {#if !isWorkable}
    <button
      onclick={() => {connectRigToUsb()}}
    >
    Connect RigToUsb
    </button>
  {/if}
</div>

<div>
  <div>
    <button
      onclick={() => {sendReport(prebuild_cmds.led_on);}}
    >
    LED ON
    </button>
    <button
      onclick={() => {sendReport(prebuild_cmds.led_off);}}
    >
    LED OFF
    </button>
    <button
      onclick={() => {sendReport(prebuild_cmds.led_blink_1s);}}
    >
    LED Blink
    </button>
  </div>
  <div>
  <button
    onclick={() => { sendCmd(
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
  <button
      onclick={() => { sendCmd(
      {
	  cmd: CMD.RadioOff
      })
      }}
    >
      Radio Off
    </button>
    <button
      onclick={() => { sendCmd(
	{
	  cmd: CMD.RadioOn,
	  timeout_ms: radioOnTimeOut * 1000
	})
      }
      }
    >
    Radio On With Timeout
    </button>
    Timeout: <input type="number" min="10" max="36000" bind:value={radioOnTimeOut} /> Seconds
  </div>
</div>
