<script>
// https://svelte.dev/playground/clock?version=5.31.1
import { onMount } from 'svelte';
  let time = $state(new Date());
  let seconds = $derived(time.getSeconds() + time.getMilliseconds()/1000);

  onMount(() => {
	  const interval = setInterval(() => {
		  time = new Date();
	  }, 100);

	  return () => {
		  clearInterval(interval);
	  };
  });
</script>

<svg viewBox="-50 -50 100 100">
	<circle class="clock-face" r="48" />


	<!-- second hand -->
	<g transform="rotate({24 * seconds})">
		<line class="second" y1="10" y2="-38" />
		<line class="second-counterweight" y1="10" y2="2" />
	</g>
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
	}

	.clock-face {
		stroke: #333;
		fill: white;
	}

	.second,
	.second-counterweight {
		stroke: rgb(180, 0, 0);
	}

	.second-counterweight {
		stroke-width: 3;
	}
</style>