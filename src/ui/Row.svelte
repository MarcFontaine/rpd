<script>
import AllElements from './AllElements.svelte';
import {screen1, screen2, screen3, screen4} from '../state.svelte'
</script>
<div class="row" >
    <div class="tile" >
    <AllElements element={screen1.value} />
    </div>
    <div class="tile" >
    <AllElements element={screen2.value} />
    </div>
    <div class="tile" >
    <AllElements element={screen3.value} />
    </div>
    <div class="tile" >
    <AllElements element={screen4.value} />
    </div>
</div> 

<style>
.row {
  display:flex;
  flex-direction: row;
  width: 100%;
  padding: 0px 0px;
  margin: 0px 0px 0px 0px;
  border-width: 0px;
}
.tile {
  border: none;
  padding: 0px 0.5em 0px 0.5em;
}
</style>