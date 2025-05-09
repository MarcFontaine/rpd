import * as State from './state.svelte';

export async function connect (url: string) {
  const eventSource = new EventSource(url,  { withCredentials: true });
  eventSource.addEventListener("state",(event:MessageEvent) => {
    State.espHomeEvent.data = event.data;
    const data = JSON.parse(event.data);
    switch (data.id) {
      case 'sensor-hf_power_forward' :
        { State.espHomeEvent.powerForward = data.value; break; }
      case 'sensor-hf_power_reverse' :
        { State.espHomeEvent.powerReverse = data.value; break; }
      default  : break;
    }
  });
}