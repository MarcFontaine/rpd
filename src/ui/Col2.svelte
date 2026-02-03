<script>
import AllElements from './AllElements.svelte';
import {settings} from '../state.svelte'
</script>
<div style="display:flex; flex-direction: row; width: 100%;" >
  <div class="column" >
      <div class="tile" >
      <AllElements element={settings.screen1} />
      </div>
      <div class="tile" >
      <AllElements element={settings.screen3} />
      </div>
  </div> 
  <div class="column" >
      <div class="tile" >
      <AllElements element={settings.screen2} />
      </div>
      <div class="tile" >
      <AllElements element={settings.screen4} />
      </div>
  </div> 
</div>

<style>
.column {
  font-size: 0.4em;
  display:flex;
  flex-direction: column;
  width: 50%;
  padding: 0px 0px;
  margin: 0px 0px 0px 0px;
  border-width: 0px;
}
.tile {
  border: none;
  padding: 1em 1em 1em 1em;
}
</style>