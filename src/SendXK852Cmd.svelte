<script lang="ts">
import {sendCmd, toCmd} from './cat';

let cmd=$state('')

function onclick() {
  sendCmd(toCmd(cmd))
}
</script>

<div>
<span style="font-size:1em;">
  <input style="font-size:1em;" type="text" bind:value={cmd}>
  <button style="font-size:1em;" onclick={onclick} >
    SEND XK852 COMMAND : {cmd}
  </button>
</span>
</div>
