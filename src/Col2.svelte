<script>
import AllElements from './AllElements.svelte';
import {settings} from './state.svelte'
</script>
<div style="display:flex; flex-direction: row; width: 100%; font-size: 0.4em;">
  <div style="display:flex; flex-direction: column; width: 50%;">
      <div style="border: 3px solid black;" >
      <AllElements element={settings.screen1} />
      </div>
      <div style="border: 3px solid black;" >
      <AllElements element={settings.screen3} />
      </div>
  </div> 
  <div style="display:flex; flex-direction: column; width: 50%; font-size: 0.4em;">
      <div style="border: 3px solid black;" >
      <AllElements element={settings.screen2} />
      </div>
      <div style="border: 3px solid black;" >
      <AllElements element={settings.screen3} />
      </div>
  </div> 
</div>