export enum GuiMode {
  NotConnected = 'NotConnected',
  Connected = 'Connected',
  ConnectedTxOn = 'ConnectedTxOn',
  SomeError = 'SomeError'
}

/*
* Set Gui Mode
* @param {GuiMode} mode the Gui Mode
*/
export function setGuiMode(mode: GuiMode) {
  switch (mode) {
    case GuiMode.NotConnected:
      document.body.style.background = 'blueviolet';
      break;
    case GuiMode.Connected:
      document.body.style.background = 'rgb(36, 234, 29)';
      break;
    case GuiMode.ConnectedTxOn:
      document.body.style.background = 'rgb(14, 6, 237)';
      break;
    case GuiMode.SomeError:
      document.body.style.background = 'red';
      break;
  }
}
