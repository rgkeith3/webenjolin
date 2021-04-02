class Comparator extends AudioWorkletProcessor {
  process (inputs, outputs, _parameters) {
    const output = outputs[0];
    output.forEach(channel => {
      for (let i = 0; i < channel.length; i++) {
        channel[i] = (inputs[0][0][i] >= inputs[1][0][i]) * 2 - 1
      }
    })
    return true
  }
}

registerProcessor('comparator', Comparator)