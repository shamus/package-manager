const Command = require('./command');

class CommandFactory {
  constructor(reporter) {
    this.reporter = reporter;
  }

  build(name, args) {
    return new Command(this.reporter);
  }
}

module.exports = CommandFactory;
