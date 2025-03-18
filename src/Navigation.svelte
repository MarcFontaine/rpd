<script lang="ts">
import {link} from 'svelte-spa-router'
import active from 'svelte-spa-router/active'
</script>

<nav>
<div class="nav"> 
<ul>
  <li>
    <a href="/rigcontrol" use:link use:active={'/rigcontrol'} >CAT</a>
  </li>
  <li>
    <a href="/serial" use:link use:active={'/serial'} >Serial Port</a>
  </li>
  <li>
    <a href="/config" use:link use:active={'/config'} >Config</a>
  </li>
  <li>
    <a href="/webrtc" use:link use:active={'/webrtc'} >Audio/Video</a>
  </li>
  <li>
    <a href="/debug" use:link use:active={'/debug'} >Debug</a>
  </li>
  <li>
    <a href="/aux" use:link use:active={'/aux'} >Aux</a>
  </li>
</ul>
</div>
</nav>

<style>
li {
  display:inline;
}
</style>