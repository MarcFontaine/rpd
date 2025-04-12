<script>
import AllElements from './AllElements.svelte';
import {screen} from './state.svelte'
</script>
<div style="display:flex; flex-direction: row; width: 100%;">
    <div style="border: 3px solid black;" >
    <AllElements element={screen.screen1} />
    </div>
    <div style="border: 3px solid black;" >
    <AllElements element={screen.screen2} />
    </div>
</div> 
