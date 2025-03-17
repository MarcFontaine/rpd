import {setReturnMsg} from './setXK852Status';
import {pushLog} from './state.svelte';
import * as State from './state.svelte';
import {type Cmd} from './state.svelte';
import {setGuiMode, GuiMode} from './gui';
import {catOnConnect} from './cat';

function matchReturnMsg(str: string) {
  const pattern = /(Reply: \x0a)(.+)/g;
  const matches: RegExpStringIterator<RegExpExecArray> = str.matchAll(pattern);
  const arr = Array.from(matches);
  if (arr && arr[0] && arr[0][2]) return arr[0][2]
  else return "undefined";
}

export async function connect (url: string) {
  console.log(url);
  const ws = new WebSocket(url);
  ws.onmessage = (evt: MessageEvent) => {
      evt.data.text().then(
        function(value: string) {
	  const xk852Status = matchReturnMsg(value);
	  setReturnMsg(xk852Status);
	  pushLog(
	    { src:'hamlib_return(websocket)'
	    , msg: value
	    });
	},
        function(error: string) {console.log(error);}
      );
  };
  ws.onopen = (_evt: Event) => {
    State.setSendCmdCallback(mkCallback(ws));
    setGuiMode(GuiMode.Connected);
    catOnConnect();
  };
  ws.onerror = (_evt: Event) => {
    State.setSendCmdCallback(undefined);
    setGuiMode(GuiMode.SomeError);
  };
  ws.onclose = (_evt: Event) => {
    State.setSendCmdCallback(undefined);
    setGuiMode(GuiMode.SomeError);
  };
};

function mkCallback(ws: WebSocket) {
  return function(data: Cmd) { sendWsHamlib(ws,data) }
}

function sendWsHamlib(ws: WebSocket, cmd: Cmd) {
  ws.send(cmd.rigctld);
  console.log(cmd.rigctld);
}
