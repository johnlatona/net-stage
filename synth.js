Nexus.context = Tone.context

class Oscillator {
  constructor(type, name) {
    this.name = name;
    this.synth = new Tone.PolySynth(10, Tone.Synth)
    this.synth.set({
      "oscillator": {
        "type": type
      }
    })
    this.volume = new Tone.Volume();

    this.synth.connect(this.volume);

    this.sustained = false;
    this.note = '';

  }

  playNote(zone, input, value, note) {
    console.log('within for loop', this.name, note);
    let method;
    if (this.sustained) {
      method = 'triggerAttack';
    }
    else method = value > 0 ? 'triggerAttack' : 'triggerRelease';
    if (method === 'triggerAttack') {
      console.log('toggle on');
      piano.toggleKey(input, true)
    }
    else {
      piano.toggleKey(input, false)
    }
    this.synth[method](note);
    this.note = note;
  }

  handleVolume(value) {
    let val = (value - 75) / 1.95;
    console.log(val);
    this.volume.volume.value = val;
  }

  handleSustain(value) {;
    if (value > 100) {
      this.sustained = true;
    }
    else this.sustained = false;
    console.log(this.sustained);
  }
}

function createOscillator(type) {
  const name = type;
  return {
    name: type,
    bool: true,
    instrument: new Oscillator(type, name)
  }
}

let osc1 = null
let osc2 = null
let osc3 = null;

const oscillators = [osc1, osc2, osc3];

const oscSelectors = document.getElementsByClassName('osc-wavetype');

const gain = new Tone.Gain();
gain.gain.value = 1;
const filter = new Tone.Filter();
const reverb = new Tone.Reverb();
const chorus = new Tone.Chorus();

for (let i = 0; i < oscSelectors.length; i++) {
  console.log(oscSelectors[i]);
  oscSelectors[i].addEventListener('change', function(event) {
    if (oscillators[i]) {
      oscillators[i].bool = false;
      oscillators[i].instrument.volume.mute = true;
    }

    const waveType = event.target.value.toLowerCase();
    oscillators.splice(i, 1, createOscillator(waveType));

    console.log(oscillators)

    reverb.generate()
    .then(() => {
      oscillators[i].instrument.volume.connect(filter);
      oscillators[i].bool = true;
      filter.connect(gain);
      gain.connect(reverb);
      reverb.connect(chorus);
      chorus.toMaster();
    });

    oscilloscope.on('change', function(v) {
      console.log(v);
    });

    oscilloscope.connect(Tone.Master)
  })
}

handleFrequency = value => {
  const val = value / 127 * 14800 + 200;
  console.log('frequency', val);
  filter.frequency.value = val;
}

handleReverbDecay= value => {
  const val = value / 127 * 100;
  console.log(val);
  reverb.decay.value = val;
}

handleReverbWetDry = value => {
  const val = value / 127 * 1;
  console.log('wet/dry', val * 100);
  reverb.wet.value = val;
}

handleChorusDepth = value => {
  const val = value / 127;
  console.log('depth', val);
  chorus.depth.value = val;
}

handleChorusFrequency = value => {
  const val = value / 127 * 5;
  console.log('freqChorus', val);
  chorus.frequency.value = val;
}

handleChorusWet = value => {
  const val = value / 127;
  chorus.wet.value = val;
}

class MidiAccess {
  constructor(midiMapper, osc1, osc2, osc3) {
    this.midiMapper = midiMapper || console.log;
    this.osc1 = osc1;
    this.osc2 = osc2;
    this.osc3 = osc3;
  }

  start() {
    return new Promise((resolve, reject) => {
      this.requestAccess().then(access => {
        this.initialize(access);
        resolve();
      }).catch(() => {
        reject('Something went wrong');
      })
    })
  }

  initialize(access) {
    const devices = access.inputs.values();
    for (let device of devices) {
      this.initializeDevice(device);
    }
  }

  initializeDevice(device) {
    device.onmidimessage = this.onMessage.bind(this);
  }

  onMessage(message) {
    let [zone, input, value] = message.data;

    this.midiMapper({zone, input, value});
  }

  requestAccess() {
    return new Promise((resolve, reject) => {
      if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess()
        .then(resolve)
        .catch(reject);
      }
      else reject()
    })
  }
}

const midi = new MidiAccess(midiMapper);

document.addEventListener("DOMContentLoaded", () => {
  midi.start()
  .then(() => {
    console.log('started');
  })
  .catch(console.error);
});

function midiMapper({zone, input, value}) {
  if(zone === 144 || zone === 128) {
    if (input >= 36 || input <= 99) {
      const notes = ['C2', 'Db2', 'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2', 'Ab2', 'A2', 'Bb2', 'B2', 'C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3', 'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4', 'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5', 'C6', 'Db6', 'D6', 'Eb6', 'E6', 'F6', 'Gb6', 'G6', 'Ab6', 'A6', 'Bb6', 'B6', 'C7'];

      const notesHash = {};

      for (let i = 0; i < notes.length; i++) {
        const midiInput = i + 36;
        notesHash[midiInput] = notes[i];
      }

      const note = notesHash[input];

      for (let i = 0; i < oscillators.length; i++) {
        let inst = oscillators[i]

        if (inst) {
          inst.instrument.playNote(zone, input, value, note);
        }
      }
    }
  }
  else if (zone === 176) {
    for (let i = 0; i < oscillators.length; i++) {
      let inst = oscillators[i];
      console.log("")

      if(inst) {
        switch(input) {
          case 21:
            handleReverbDecay(value);
            break;
          case 22:
            handleReverbWetDry(value);
            break;
          case 23:
            handleChorusDepth(value);
            break;
          case 24:
            handleChorusFrequency(value);
            break;
          case 25:
            handleFrequency(value);
            break;
          case 28:
            handleChorusWet(value);
            break;
          case 41:
            oscillators[0].instrument.handleVolume(value);
            break;
          case 42:
            oscillators[1].instrument.handleVolume(value);
            break;
          case 43:
            oscillators[2].instrument.handleVolume(value);
            break;
          case 51:
            if (value === 127) {
              oscillators[0].instrument.volume.mute = false;
            }
            else {
              oscillators[0].instrument.volume.mute = true;
            }
            break;
          case 52:
            if (value === 127) {
              oscillators[1].instrument.volume.mute = false;
            }
            else {
              oscillators[1].instrument.volume.mute = true;
            }
            break;
          case 53:
            if (value === 127) {
              oscillators[2].instrument.volume.mute = false;
            }
            else {
              oscillators[2].instrument.volume.mute = true;
            }
            break;
          case 64:
            inst.instrument.handleSustain(value);
            break;
        }
      }

    }
  }
  console.log('midiMapper', zone, input, value)
}

const width = window.innerWidth / 2;
var oscilloscope = new Nexus.Oscilloscope('#oscilloscope', {
  'size': [width, 200]
})

oscilloscope.colorize("accent", "#E82C0C")
oscilloscope.colorize("fill", "#323133")

oscilloscope.on('change', function(v) {
  console.log(v);
});

oscilloscope.connect(Tone.Master)

var piano = new Nexus.Piano('#piano', {
  'size': [width, 200],
  'mode': 'button',
  'lowNote': 36,
  'highNote': 97
});

piano.colorize("accent", "#E82C0C");

var volumeOne = new Nexus.Dial("#osc1-volume", {
  'size': [75, 75],
  'interaction': 'radial',
  'mode': 'relative',
  'min': 0,
  'max': 1,
  'step': 0.00787402,
  'value': 0
})

volumeOne.colorize("accent", "#E82C0C");
