<script lang="ts">

let { x } = $props();
</script>
<svg
  width="4em" height="2em"
  viewBox="-100 -100 200 100"
>
  <path d="M-90 0 A 90 90 0 0 1 90 0"
  stroke="black"
  fill="green"
  stroke-width="2"
  fill-opacity="0.5"
  transform="rotate({(x-100)*1.8})"
  />
</svg>
