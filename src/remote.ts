// eslint-disable-next-line no-unused-vars
export let extraConfig: JSON;

/**
* Load extra Config

*/
export function loadExtraConfig() {
  fetch (
  'https://remote-qth.oh0.duckdns.org/config/config.json',
  { method: 'GET',
    headers: { }
  },
  )
  .then(
    response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    }
  )
  .then(data => { extraConfig=data ; console.log(data)});
}
