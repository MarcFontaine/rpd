<script>
import AllElements from './AllElements.svelte';
import {screen1, screen2, screen3, screen4} from '../state.svelte'
</script>
<div style="display:flex; flex-direction: row; width: 100%;" >
  <div class="column" >
      <div class="tile" >
      <AllElements element={screen1.value} />
      </div>
      <div class="tile" >
      <AllElements element={screen3.value} />
      </div>
  </div> 
  <div class="column" >
      <div class="tile" >
      <AllElements element={screen2.value} />
      </div>
      <div class="tile" >
      <AllElements element={screen4.value} />
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