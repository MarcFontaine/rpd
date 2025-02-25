<script lang="ts">
import now from '~build/time'
import { sha } from '~build/git'
</script>

<div>
<details>
  <summary>
    <span>About
  </summary>
  <div>
    Built Info: {`Build ${sha} at ${now}`}
  </div>
  <div>
    <a href="https://www.github.com/MarcFontaine/rigpage">Source on github</a>
  </div>
</details>
</div>