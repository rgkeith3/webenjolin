class Rungler extends AudioWorkletProcessor {
  static get parameterDescriptors () {
    return [{
      name: 'rungle',
      defaultValue: 0,
      minValue: 0,
      maxValue: 1,
      automationRate: 'k-rate'
    }];
  }

  register = "0000000";

  process (inputs, outputs, parameters) {
    const output = outputs[0][0];
    const clock = inputs[1][0];
    const noise = inputs[0][0];
    const rungle = parameters['rungle'][0];

    let sign = this.register.slice(0,1) == "0" ? -1 : 1;
    let value = (parseInt(this.register.slice(1), 2) / 127) * sign;
    let wasLow, isHigh = false;
    let sample;
    wasLow = clock[0] < 0;
    for (let i = 0; i < output.length; i++) {
      isHigh = clock[i] > 0;
      if (wasLow && isHigh) {
        if (Math.random() < rungle) {
          sample = noise[i] < 0 ? "0" : "1";
        } else {
          sample = this.register.slice(0,1);
        }
        this.register = this.register.slice(1) + sample;

        sign = this.register.slice(0,1) == "0" ? -1 : 1;
        value = (parseInt(this.register.slice(1), 2) / 127) * sign;
      }

      output[i] = value;
      wasLow = !isHigh;
    }
    return true
  }
}

registerProcessor('rungler', Rungler)