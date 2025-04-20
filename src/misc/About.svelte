<script lang="ts">
//does not work in nix-build !!
import now from '~build/time'
import { sha } from '~build/git'
</script>

<div>
    Built Info: {`Build ${sha.substring(0,8)} at ${now}`}
</div>
<div>
    <a href="https://www.github.com/MarcFontaine/rigpage">Source on github</a>
</div>
