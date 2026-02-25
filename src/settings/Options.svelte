<script lang="ts">
interface Props {
    o: boolean;
    d: string;
}

let { o = $bindable(), d }: Props = $props();

</script>
<div>
  <label>
  <input
    type="checkbox"
    class="myInput"
    bind:checked={o}
  >
  {d}
  </label>
</div>

<style>
.myInput {
  width: 1em;
  height: 1em;
  font-size: inherit;
  margin: 0;
}
</style>