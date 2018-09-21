Nexus.context = Tone.context

const topLevelWidth = window.innerWidth / 2;

var oscilloscope = new Nexus.Oscilloscope('#oscilloscope', {
  'size': [topLevelWidth, 200]
})

oscilloscope.colorize("accent", "#E82C0C")
oscilloscope.colorize("fill", "#323133")

oscilloscope.on('change', function(v) {
  console.log(v);
});

oscilloscope.connect(Tone.Master)

const piano = new Nexus.Piano('#piano', {
  'size': [topLevelWidth, 200],
  'mode': 'button',
  'lowNote': 36,
  'highNote': 97
});

piano.colorize("accent", "#E82C0C");

const volumeOne = new Nexus.Dial("#osc1-volume", {
  'size': [50, 50],
  'interaction': 'radial',
  'mode': 'relative',
  'min': 0,
  'max': 1,
  'step': 0.00787402,
  'value': 0
})

const panOne = new Nexus.Pan("#osc1-pan", {
  'size': [75, 20],
  'mode': 'relative',
  'min': -1,
  'max': 1,
  'step': 0.00787402,
  'value': 0
});

const panTwo = new Nexus.Pan("#osc2-pan", {
  'size': [75, 20],
  'mode': 'relative',
  'min': -1,
  'max': 1,
  'step': 0.00787402,
  'value': 0
});

const panThree = new Nexus.Pan("#osc3-pan", {
  'size': [75, 20],
  'mode': 'relative',
  'min': -1,
  'max': 1,
  'step': 0.00787402,
  'value': 0
});

const distortionOne = new Nexus.Dial("#osc1-distortion", {
  'size': [50, 50],
  'mode': 'relative',
  'min': 0,
  'max': 1,
  'step': 0.00787402,
  'value': 0
})

const distortionTwo = new Nexus.Dial("#osc2-distortion", {
  'size': [50, 50],
  'mode': 'relative',
  'min': 0,
  'max': 1,
  'step': 0.00787402,
  'value': 0
})

const distortionThree = new Nexus.Dial("#osc3-distortion", {
  'size': [50, 50],
  'mode': 'relative',
  'min': 0,
  'max': 1,
  'step': 0.00787402,
  'value': 0
})

const volumeTwo = new Nexus.Dial("#osc2-volume", {
  'size': [50, 50],
  'interaction': 'radial',
  'mode': 'relative',
  'min': 0,
  'max': 1,
  'step': 0.00787402,
  'value': 0
})

//Create db Meters in Oscillators
const meterOne = document.getElementById('osc1-meter');
const meterOneContext = meterOne.getContext("2d");
meterOneContext.translate(0, meterOne.height)
meterOneContext.scale(1, -1)
meterOneContext.fillStyle = "#C9C8C8"
meterOneContext.fillRect(0,0,100,150);
const barOne = meterOneContext.createLinearGradient(0,0,0,150);
barOne.addColorStop(0, "#BFFF02")
barOne.addColorStop(0.85, "#02FF24")
barOne.addColorStop(1, "#FF0202")

const meterTwo = document.getElementById('osc2-meter');
const meterTwoContext = meterTwo.getContext("2d");
meterTwoContext.translate(0, meterTwo.height)
meterTwoContext.scale(1, -1)
meterTwoContext.fillStyle = "#C9C8C8"
meterTwoContext.fillRect(0,0,100,150);
const barTwo = meterTwoContext.createLinearGradient(0,0,0,150);
barTwo.addColorStop(0, "#BFFF02")
barTwo.addColorStop(0.85, "#02FF24")
barTwo.addColorStop(1, "#FF0202")


const meterThree = document.getElementById('osc3-meter');
const meterThreeContext = meterThree.getContext("2d");
meterThreeContext.translate(0, meterThree.height)
meterThreeContext.scale(1, -1)
meterThreeContext.fillStyle = "#C9C8C8"
meterThreeContext.fillRect(0,0,100,150);
const barThree = meterThreeContext.createLinearGradient(0,0,0,150);
barThree.addColorStop(0, "#BFFF02")
barThree.addColorStop(0.85, "#02FF24")
barThree.addColorStop(1, "#FF0202")

const volumeThree = new Nexus.Dial("#osc3-volume", {
  'size': [50, 50],
  'interaction': 'radial',
  'mode': 'relative',
  'min': 0,
  'max': 1,
  'step': 0.00787402,
  'value': 0
})

const filterFrequency = new Nexus.Dial("#frequency", {
  'size': [50, 50],
  'interaction': 'radial',
  'mode': 'relative',
  'min': 0,
  'max': 1,
  'step': 0.00787402,
  'value': 0
})

const reverbDecay = new Nexus.Dial("#reverb-decay", {
  'size': [50, 50],
  'interaction': 'radial',
  'mode': 'relative',
  'min': 0,
  'max': 1,
  'step': 0.00787402,
  'value': 0
})

const reverbWetDry = new Nexus.Dial("#reverb-wet-dry", {
  'size': [50, 50],
  'interaction': 'radial',
  'mode': 'relative',
  'min': 0,
  'max': 1,
  'step': 0.00787402,
  'value': 0
})

const chorusDepth = new Nexus.Dial("#chorus-depth", {
  'size': [50, 50],
  'interaction': 'radial',
  'mode': 'relative',
  'min': 0,
  'max': 1,
  'step': 0.00787402,
  'value': 0
})

const chorusFrequency = new Nexus.Dial("#chorus-frequency", {
  'size': [50, 50],
  'interaction': 'radial',
  'mode': 'relative',
  'min': 0,
  'max': 1,
  'step': 0.00787402,
  'value': 0
})

const chorusWetDry = new Nexus.Dial("#chorus-wet-dry", {
  'size': [50, 50],
  'interaction': 'radial',
  'mode': 'relative',
  'min': 0,
  'max': 1,
  'step': 0.00787402,
  'value': 0
})

const eqSlider = new Nexus.Multislider('#eq-slider', {
  'size': [300,175],
  'numberOfSliders': 3,
  'min': 0,
  'max': 1,
  'step': 0,
  'values':[0,0,0]
})

const effectsKnobs = [filterFrequency, reverbDecay, reverbWetDry, chorusDepth, chorusFrequency, chorusWetDry, eqSlider];

const oscillatorKnobs = [volumeOne, volumeTwo, volumeThree, panOne, panTwo, panThree, distortionOne, distortionTwo, distortionThree];

const styleKnobs = (knobsArray, accent, fill) => {
  for (let i = 0; i < knobsArray.length; i++) {
    knobsArray[i].colorize("accent", accent);
    knobsArray[i].colorize("fill", fill);
  }
}

styleKnobs(effectsKnobs, "#E82C0C", "#2B2B2B");
styleKnobs(oscillatorKnobs, "#ABABAA", "#C9C8C8");

eqSlider.on('change', event => {

})

class Oscillator {
  constructor(type, name) {
    this.name = name;
    this.synth = new Tone.PolySynth(10, Tone.Synth)
    this.synth.set({
      "oscillator": {
        "type": type
      }
    })
    this.distortion = new Tone.Distortion();
    this.volume = new Tone.Volume();
    this.meter = new Tone.Meter();
    this.pan = new Tone.Panner();
    this.synth.connect(this.distortion);
    this.distortion.connect(this.pan);
    this.pan.connect(this.volume);
    this.volume.connect(this.meter);
    this.sustained = false;
    this.note = '';

  }

  playNote(zone, input, value, note) {
    let method;
    if (this.sustained) {
      method = 'triggerAttack';
    }
    else method = value > 0 ? 'triggerAttack' : 'triggerRelease';
    if (method === 'triggerAttack') {
      piano.toggleKey(input, true)
    }
    else {
      piano.toggleKey(input, false)
    }
    this.synth[method](note);
    this.note = note;
  }

  handleVolume(value) {
    let val = (value - 100) / 1.95;
    this.volume.volume.value = val;
  }

  handleSustain(value) {;
    if (value > 100) {
      this.sustained = true;
    }
    else this.sustained = false;
    console.log(this.sustained);
  }

  handlePan(value) {
    this.pan.value = value;
  }

  handleDistortion(value) {
    this.distortion.distortion = value;
  }

  handleMeter(meter, bar) {
    let level = this.meter.getLevel();
    level = Tone.dbToGain(level);
    meter.clearRect(0,0,100,150);
    meter.fillStyle = bar;
    meter.fillRect(0,0,100,150);
    meter.fillStyle = "#C9C8C8";
    meter.fillRect(0,150 * level, 100,150);
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

const panKnobs = [panOne, panTwo, panThree];
const distortionKnobs = [distortionOne, distortionTwo, distortionThree];
const meterContexts = [meterOneContext, meterTwoContext, meterThreeContext];
const bars = [barOne, barTwo, barThree];

const oscSelectors = document.getElementsByClassName('osc-wavetype');

const gain = new Tone.Gain();
gain.gain.value = 1;
const filter = new Tone.Filter();
const reverb = new Tone.Reverb();
const chorus = new Tone.Chorus();
const eq = new Tone.EQ3();

for (let i = 0; i < oscSelectors.length; i++) {
  oscSelectors[i].addEventListener('change', function(event) {
    if (oscillators[i]) {
      oscillators[i].bool = false;
      oscillators[i].instrument.volume.mute = true;
    }

    const waveType = event.target.value.toLowerCase();
    oscillators.splice(i, 1, createOscillator(waveType));

    reverb.generate()
    .then(() => {

      panKnobs[i].on('change', event => {
        oscillators[i].instrument.handlePen(event.value);
      })

      distortionKnobs[i].on('change', event => {
        oscillators[i].instrument.handleDistortion(event);
      })

      const loop = () => {
        requestAnimationFrame(loop);
        oscillators[i].instrument.handleMeter(meterContexts[i], bars[i]);
      }

      loop();

      oscillators[i].instrument.meter.connect(filter);
      oscillators[i].bool = true;
      filter.connect(gain);
      gain.connect(reverb);
      reverb.connect(chorus);
      chorus.connect(eq);
      eq.toMaster();
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

handleEqLow = value => {
  const val = (value - 100) / 1.95;
  eq.low.value = val;
}

handleEqMid = value => {
  const val = (value - 100) / 1.95;
  eq.mid.value = val;
}

handleEqHigh = value => {
  const val = (value - 100) / 1.95;
  console.log('higheq', eq);
  eq.high.value = val;
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

      if(inst) {
        switch(input) {
          case 21:
            handleReverbDecay(value);
            reverbDecay.value = value / 127;
            break;
          case 22:
            handleReverbWetDry(value);
            reverbWetDry.value = value / 127;
            break;
          case 23:
            handleChorusDepth(value);
            chorusDepth.value = value / 127;
            break;
          case 24:
            handleChorusFrequency(value);
            chorusFrequency.value = value / 127;
            break;
          case 25:
            handleFrequency(value);
            filterFrequency.value = value / 127;
            break;
          case 28:
            handleChorusWet(value);
            chorusWetDry.value = value / 127;
            break;
          case 41:
            oscillators[0].instrument.handleVolume(value);
            volumeOne.value = value / 127;
            break;
          case 42:
            oscillators[1].instrument.handleVolume(value);
            volumeTwo.value = value / 127;
            break;
          case 43:
            oscillators[2].instrument.handleVolume(value);
            volumeThree.value = value / 127;
            break;
          case 46:
            handleEqLow(value);
            eqSlider.setSlider(0, value / 127)
            break;
          case 47:
            handleEqMid(value);
            eqSlider.setSlider(1, value / 127)
            break;
          case 48:
            handleEqHigh(value);
            eqSlider.setSlider(2, value / 127)
            break;
          case 51:
            if (value === 127) {
              oscillators[0].instrument.volume.mute = false;
              document.getElementById('osc-1-title').style.color = "#E8E00C";
              document.getElementById('osc-1').style.border= "1px solid #E8E00C";
              volumeOne.colorize("accent", "#E8E00C");
              panOne.colorize("accent", "#E8E00C");
              distortionOne.colorize("accent", "#E8E00C");
              let labels = document.getElementsByClassName('osc-label-1');
              for (let i = 0; i < labels.length; i++) {
                const label = labels[i];
                label.style.color = "#E8E00C"
              }
            }
            else {
              oscillators[0].instrument.volume.mute = true;
              document.getElementById('osc-1-title').style.color = "#ABABAA";
              document.getElementById('osc-1').style.border= "none";
              volumeOne.colorize("accent", "#ABABAA");
              panOne.colorize("accent", "#ABABAA");
              distortionOne.colorize("accent", "#ABABAA");
              let labels = document.getElementsByClassName('osc-label-1');
              for (let i = 0; i < labels.length; i++) {
                const label = labels[i];
                label.style.color = "#ABABAA"
              }
            }
            break;
          case 52:
            if (value === 127) {
              oscillators[1].instrument.volume.mute = false;
              document.getElementById('osc-2-title').style.color = "#03C0E8";
              document.getElementById('osc-2').style.border= "1px solid #03C0E8";
              volumeTwo.colorize("accent", "#03C0E8");
              panTwo.colorize("accent", "#03C0E8");
              distortionTwo.colorize("accent", "#03C0E8");
              let labels = document.getElementsByClassName('osc-label-2');
              for (let i = 0; i < labels.length; i++) {
                const label = labels[i];
                label.style.color = "#03C0E8"
              }
            }
            else {
              oscillators[1].instrument.volume.mute = true;
              document.getElementById('osc-2-title').style.color = "#ABABAA";
              document.getElementById('osc-2').style.border= "none";
              volumeTwo.colorize("accent", "#ABABAA");
              panTwo.colorize("accent", "#ABABAA");
              distortionTwo.colorize("accent", "#ABABAA");
              let labels = document.getElementsByClassName('osc-label-2');
              for (let i = 0; i < labels.length; i++) {
                const label = labels[i];
                label.style.color = "#ABABAA"
              }
            }
            break;
          case 53:
            if (value === 127) {
              oscillators[2].instrument.volume.mute = false;
              document.getElementById('osc-3-title').style.color = "#FF7200";
              document.getElementById('osc-3').style.border= "1px solid #FF7200";
              volumeThree.colorize("accent", "#FF7200");
              panThree.colorize("accent", "#FF7200");
              distortionThree.colorize("accent", "#FF7200");
              let labels = document.getElementsByClassName('osc-label-3');
              for (let i = 0; i < labels.length; i++) {
                const label = labels[i];
                label.style.color = "#FF7200"
              }
            }
            else {
              oscillators[2].instrument.volume.mute = true;
              document.getElementById('osc-3-title').style.color = "#ABABAA";
              document.getElementById('osc-3').style.border= "none";
              volumeThree.colorize("accent", "#ABABAA");
              panThree.colorize("accent", "#ABABAA");
              distortionThree.colorize("accent", "#ABABAA");
              let labels = document.getElementsByClassName('osc-label-3');
              for (let i = 0; i < labels.length; i++) {
                const label = labels[i];
                label.style.color = "#ABABAA"
              }
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


