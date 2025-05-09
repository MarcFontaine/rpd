import * as State from './state.svelte';

export async function connect (url: string) {
  const eventSource = new EventSource(url,  { withCredentials: true });
  eventSource.addEventListener("state",(event:MessageEvent) => {
    State.espHomeEvent.data = event.data;
  });
}