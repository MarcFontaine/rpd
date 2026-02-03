import * as CAT from '../cat'

type Action = (() => any) | null

class Bookmark {
  label: string;
  action: Action;
  isDisabled: boolean;
  constructor(label:string, action: Action) {
    this.label = label;
    this.action = action;
    this.isDisabled = true;
    if (action) this.isDisabled = false;
  }
  getLabel (_v:string) {
    return this.label;
  }
  runAction (_v:string) {
    if (this.action) this.action();
  }
}

const magicFrequencyBookmark =
  { getLabel: (v:string) => frequencyOptions(v).label
  , runAction: (v:string) => frequencyOptions(v).action()
  , isDisabled: false
  }

function frequencyOptions(v:string):{ label: string; action: () => any; }
{
  let prefix = v
  const suffices = ['k', 'M', 'm', 'Hz', 'H', 'hz'];
  suffices.forEach(s => prefix = prefix.replace(s,''));
  const f=new Number(prefix);
  if (Number.isNaN(f)) return {label: "Magic", action: ()=>{}}
  const guess = guessFrequency(f.valueOf());
  if (guess)
    return(
      { label: guess.s
      , action: ()=> {if (guess.f) CAT.setFrequency(guess.f)}
      })
   else return(
      { label: 'Magic'
      , action: () => {}
      })
}

// Tuning range of the TRX: 1500kHz - 30000kHz
// guessFrequency must return a search label that contains original input as a substring.
// This would not work:
// f=100 -> search-label='10MHz' because the seach bar will not pick up '10Mhz'

function guessFrequency(f:number): { f: number; s: string; } | null
{
  if (f == 1) return ({ f:10000000, s:'10MHz' })
  else if (f < 30 && f > 1.5) return ({f:  1000000*f ,s:      `${f}MHz` })
  else if ( f <      150 ) return ({f:      100000*f ,s:  `${f*100}kHz` })
  else if ( f <     1500 ) return ({f:       10000*f ,s:   `${f*10}kHz` })
  else if ( f <    15000 ) return ({f:        1000*f ,s:      `${f}kHz` })
  else if ( f <   150000 ) return ({f:         100*f ,s:   `${f*100}Hz` })
  else if ( f <  1500000 ) return ({f:          10*f ,s:    `${f*10}Hz` })
  else if ( f < 30000000 ) {
    const r = 10*Math.round(f/10);
    if (r==f) return ({f: r, s:`${r}Hz` })
    else return ({f:r, s:`${f} -> Rounded to ${r}Hz`})
  }
  else return(null)
}

function frequency_kHz(f:number) {
  return new Bookmark (
      `Set Frequency to ${f} kHz`
    , () => { CAT.setFrequency(f*1000) }
    )
}

function ft8_frequency(f:number) {
  return new Bookmark (
      `FT8 at ${f} kHz`
    , () => {
        CAT.setFrequency(f*1000);
	CAT.set_MODE_USB();
    })
}

const ft8_bookmarks
  = [ 1840, 3573, 5357, 7074
    , 10136, 14074, 18100, 21074
    , 24915, 28074].map(f => ft8_frequency(f));

function band(l:number) {
  return new Bookmark (
      `Jump to ${l}m Band`
      , null
     )
}

const band_bookmarks
  = [ 160, 80, 60, 40, 30
    , 20, 17, 15, 12, 10].map(l => band(l));

function mode(m:string, action:Action) {
  return new Bookmark (
      `Set ${m} Mode`
    , action
    )
}

const mode_bookmarks =
  [ mode('CW',  () => CAT.set_MODE_CW()  )
  , mode('LSB', () => CAT.set_MODE_LSB() )
  , mode('USB', () => CAT.set_MODE_USB() )
  , mode('AM',  () => CAT.set_MODE_AME() )
  ];

const xk852Power =
  [ new Bookmark('TX Power: OFF',  () => CAT.set_OP_MODE_RX() )
  , new Bookmark('TX Power: 10%', () => CAT.set_OP_MODE_TX_LOW() )
  , new Bookmark('TX Power: 50%', () => CAT.set_OP_MODE_TX_MID() )
  , new Bookmark('TX Power: 100%',() => CAT.set_OP_MODE_TX_FULL() )
  ]

function xk852ExtraCmd(cmd:string, description:string) {
  return new Bookmark (
      `XK852 Command: ${cmd} : ${description}`
    , () => { CAT.sendCmd(CAT.toCmd(cmd)) }
    )
}

const xk852Extra_bookmarks =
  [ xk852ExtraCmd('*X2','Power Status OFF')
  , xk852ExtraCmd('*O1','Query Status')
  , xk852ExtraCmd('*O2','Query CM')
  , xk852ExtraCmd('*Tu','Start Selftest')
  , xk852ExtraCmd('*Tu5','Selftest Query CM')
  , xk852ExtraCmd('*T28','Selftest Query BITE')
  , xk852ExtraCmd('*N0','Noise Blank OFF')
  , xk852ExtraCmd('*N1','Noise Blank ON')
  , xk852ExtraCmd('*V0','Voice Control ON')
  , xk852ExtraCmd('*V1','Voice Control OFF')
  , xk852ExtraCmd('*H0','FSK STOP OFF')
  , xk852ExtraCmd('*H1','FSK STOP')
  ]

export const am_broadcast = [
  new Bookmark (
      `CHN 1 Chinese National Radio AM Broadcast at 6140kHz`
    , () => {
        CAT.setFrequency(6140000);
	CAT.set_MODE_AME();
    }),
  new Bookmark (
      `CHN 6 Chinese National Radio AM Broadcast at 6160kHz`
    , () => {
        CAT.setFrequency(6160000);
	CAT.set_MODE_AME();
    }),
  new Bookmark (
      `ROU Romania Int. AM Broadcast at 1.1880kHz`
    , () => {
        CAT.setFrequency(11880000);
	CAT.set_MODE_AME();
    }),
  new Bookmark (
      `CHN Chinese National Radio AM Broadcast at 11.910kHz`
    , () => {
        CAT.setFrequency(11910000);
	CAT.set_MODE_AME();
    }),
  new Bookmark (
      `KRE NORTH Korea Radio AM Broadcast at 13.760kHz`
    , () => {
        CAT.setFrequency(13760000);
	CAT.set_MODE_AME();
    })

]

export const bookmarks
  = new Array().concat (
    [ frequency_kHz(14010) ]
  , [ magicFrequencyBookmark ]
  , ft8_bookmarks
  , band_bookmarks
  , mode_bookmarks
  , xk852Power
  , xk852Extra_bookmarks
  , am_broadcast
  );
