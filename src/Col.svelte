<script>
import AllElements from './AllElements.svelte';
import {settings} from './state.svelte'
</script>
<div style="display:flex; flex-direction: column; width: 100%;">
    <div style="border: 3px solid black;" >
    <AllElements element={settings.screen1} />
    </div>
    <div style="border: 3px solid black;" >
    <AllElements element={settings.screen2} />
    </div>
    <div style="border: 3px solid black;" >
    <AllElements element={settings.screen3} />
    </div>
    <div style="border: 3px solid black;" >
    <AllElements element={settings.screen4} />
    </div>
</div> 
