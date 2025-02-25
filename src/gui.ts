// eslint-disable-next-line no-unused-vars
export enum GuiMode {
// eslint-disable-next-line no-unused-vars
  NotConnected = 'NotConnected',
// eslint-disable-next-line no-unused-vars
  Connected = 'Connected',
// eslint-disable-next-line no-unused-vars
  ConnectedTxOn = 'ConnectedTxOn',
// eslint-disable-next-line no-unused-vars
  SomeError = 'SomeError'
}

/*
* Set Gui Mode
* @param {GuiMode} mode the Gui Mode
*/
export function setGuiMode(mode: GuiMode) {
  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
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
