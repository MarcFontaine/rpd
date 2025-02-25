<script lang="ts">
import {sendCmd, toCmd} from './cat';

let cmd=$state('')

function onclick() {
  sendCmd(toCmd(cmd))
}
</script>

<div>
<h1>Send XK852 Command</h1>
<span style="font-size:1em;">
  Enter Command:
  <input style="font-size:1em;" type="text" bind:value={cmd}>
<button style="font-size:1em;" onclick={onclick} >
SEND COMMAND: {cmd}
</button>
</span>
</div>
