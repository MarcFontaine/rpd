<script>
import { elementByName } from './elementByName';
import {screen1, screen2, screen3, screen4} from '../state.svelte'

const T1 = elementByName(screen1.value);
const T2 = elementByName(screen2.value);
const T3 = elementByName(screen3.value);
const T4 = elementByName(screen4.value);
</script>

<div class="row" >
  <div class="tile"><T1 /></div>
  <div class="tile"><T2 /></div>
  <div class="tile"><T3 /></div>
  <div class="tile"><T4 /></div>  
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