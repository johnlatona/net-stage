import Tone from 'tone';

export class MidiAccess {
  constructor(args) {
    this.onDeviceInput = args.onDeviceInput || console.log;
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
    this.onDeviceInput({zone, input, value});
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

const midi = new MidiAccess({ onDeviceInput });

midi.start()
.then(() => {
  console.log('started');
})
.catch(console.error);

// function onMidiMessage(message) {
//   //UIn8Array -- index 1 is midi input id for device -- keys are 36 through 99.index 2 is midi attack -- how hard or soft. max 127, min is 0.
//   let [_, input, attack] = message.data;
//   console.log({input, attack});
// }

class Instrument {
  constructor() {
    this.synth = new Tone.PolySynth(8, Tone.FMSynth);
    this.filter = new Tone.Filter();
    this.volume = new Tone.Gain();

    this.synth.connect(this.filter);
    this.filter.connect(this.volume);
    this.volume.toMaster();
    this.sustained = false;
    this.note = '';

  }

  playNote(zone, input, value, note) {
    let method;
    if (this.sustained) {
      method = 'triggerAttack';
    }
    else method = value > 0 ? 'triggerAttack' : 'triggerRelease';
    console.log(note);
    console.log('method', method);
    console.log('note', note);
    this.synth[method](note);
    this.note = note;
  }

  handleVolume(value) {
    let val = value / 127;
    this.volume.gain.value = val;
  }

  handleFrequency(value) {
    let val = value / 127 * 14800 + 200;
    console.log(val);
    this.filter.frequency.value = val;
  }

  handleSustain(value) {;
    if (value > 100) {
      this.sustained = true;
    }
    else this.sustained = false;
    console.log(this.sustained);
  }
}

const inst = new Instrument();

export function onDeviceInput({zone, input, value }) {
  if(zone === 144 || zone === 128) {
    if (input >= 36 || input <= 99) {
      const notes = ['C2', 'Db2', 'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2', 'Ab2', 'A2', 'Bb2', 'B2', 'C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3', 'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4', 'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5', 'C6', 'Cb6', 'D6', 'Eb6', 'E6', 'F6', 'Gb6', 'G6', 'Ab6', 'A6', 'Bb6', 'B6', 'C7'];

      const notesHash = {};

      for (let i = 0; i < notes.length; i++) {
        const midiInput = i + 36;
        notesHash[midiInput] = notes[i];
      }

      const note = notesHash[input];
      inst.playNote(zone, input, value, note);
    }
  }
  if(zone === 176) {
    switch(input) {
      case 49:
        inst.handleVolume(value);
        break;
      case 25:
        inst.handleFrequency(value);
        break;
      case 64:
        inst.handleSustain(value);
    }
  }
  console.log('onDeviceInput', zone, input, value)

}
