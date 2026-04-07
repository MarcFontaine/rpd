<script lang="ts">
let { isConfirmed, gap, width, char
    , wheelSpeed, clickSpeed
    , rounding, exp , min, max
    , value, setter }= $props();

function clamp(f:number) {
  if (f < min) return min
    else if (f > max) return max
    else return f;
}

function toDigit() {
  const d = Math.floor(Math.abs(value)/exp) - Math.floor(Math.abs(value)/exp/10)*10;
  return d.toString();
}

function round(a: number) {
  return clamp(Math.sign(a) * Math.floor(Math.abs(a)/exp) * exp )
}

function accumValue( d: number): void {
  const fn = value + d * exp;
  setter(clamp(rounding ? round(fn) : fn));
}

let acc = 0;

function accumLocal (d:num) {
  acc += d;
  if (acc > 1 | acc < -1) {
    const delta = Math.sign(acc) * Math.floor( Math.abs(acc) );
    acc = acc - delta;
    accumValue(delta);
  }
}

</script>

{#snippet digit(upperLower)}
   <button
     class={[
         'frequency',
         isConfirmed && 'frequency_confirmed',
	 !isConfirmed && 'frequency_not_confirmed',
	 upperLower && 'upper_half_text',
	 !upperLower && 'lower_half_text'	 
       ]}
    onwheel = {(e) => {
      e.preventDefault();
      accumLocal(- e.deltaY * wheelSpeed);
    }}
    onclick = { () => {
      acc = 0;
      accumValue(upperLower ? clickSpeed: -clickSpeed)
    }}
   >
   {char || toDigit() }
   </button>
{/snippet}

<div
  class="button_container"
  style:width={width}
  style:gap={`${gap}px`}
  >
  {@render digit(true)}
  {@render digit(false)}
</div>

<style>
.frequency {
  font-family: "Courier New";
  font-size: 1em;
  white-space: pre;
  padding: 0px 0px;
  margin: 0px 0px 0px 0px;
  border-width: 0px;
  width: 100%;
  font-style: normal;
  justify-content: center
}

.frequency_confirmed {
  font-weight: normal;
}

.frequency_not_confirmed {
  font-weight: bold;
}

.button_container {
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  min-width: fit-content;
  overflow: hidden;
  flex-shrink: 0;
  font-size: var(--digit-font-size, 0.3 em);
}

.upper_half_text {
    height: 0.5em;
    display: flex;
    line-height: 1em;
    align-items: flex-start;
    overflow: hidden;
}

.lower_half_text {
    height: 0.5em;
    display: flex;
    line-height: 1em;
    align-items: flex-end;
    overflow: hidden;
}
</style>