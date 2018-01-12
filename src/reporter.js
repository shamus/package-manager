class Reporter {
  constructor(output) {
    this.output = output;
  }

  echo(msg) {
    this.output.write(`${msg}\n`);
  }

  message(msg) {
    this.output.write(`   ${msg}\n`);
  }
}

module.exports = Reporter;
