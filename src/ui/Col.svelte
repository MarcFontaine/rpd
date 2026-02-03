<script>
import AllElements from './AllElements.svelte';
import {settings} from '../state.svelte'
</script>
<div class="column" >
    <div class="tile" >
    <AllElements element={settings.screen1} />
    </div>
    <div class="tile" >
    <AllElements element={settings.screen2} />
    </div>
    <div class="tile" >
    <AllElements element={settings.screen3} />
    </div>
    <div class="tile" >
    <AllElements element={settings.screen4} />
    </div>
</div>

<style>
.column {
  display:flex;
  flex-direction: column;
  width: 100%;
  padding: 0px 0px;
  margin: 0px 0px 0px 0px;
  border-width: 0px;
}
.tile {
  border: none;
  padding: 1em 0px 1em 0px;
}
</style>