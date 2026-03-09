<script lang="ts">
import { replace } from 'svelte-spa-router'
import * as Config from './config';
import * as Profile from '../profile';
import * as WebSerial from '../serial';
</script>

<div>
  <button
    onclick={ () => Profile.initProfile() }
  >
    <h2>
      Connect To Remote QTH
    </h2>
  </button>
  <br>
  <button
      onclick={ () => {
        WebSerial.initWebSerial();
        WebSerial.connectToPort();
        replace('/rigpage')}
      }
   >
    <h2>
      Connect To Serial Port
    </h2>
  </button>
  <br>
  <button
      onclick={ () => {
        replace('/profile')}
      }
   >
    <h2>
      Profile Manager
    </h2>
  </button>
</div>
