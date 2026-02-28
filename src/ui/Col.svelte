<script>
import AllElements from './AllElements.svelte';
import {screen1, screen2, screen3, screen4} from '../state.svelte'
</script>
<div class="column" >
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