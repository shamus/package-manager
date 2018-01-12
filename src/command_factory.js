const Command = require('./command');
const EndCommand = require('./commands/end_command');
const UnknownCommand = require('./commands/unknown_command');

const END = 'END';

class CommandFactory {
  constructor(reporter) {
    this.reporter = reporter;
  }

  build(name, args) {
    if (this.disabled) {
      return new Command(this.reporter);
    }

    let command;

    switch(name) {
      case END:
        command = new EndCommand(this, this.reporter);
        break;
      default:
        command = new UnknownCommand(this.reporter);
    }

    return command;
  }

  disable() {
    this.disabled = true;
  }
}

module.exports = CommandFactory;
