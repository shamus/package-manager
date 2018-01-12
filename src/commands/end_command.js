const Command = require('../command');

class EndCommand extends Command {
  constructor(commandFactory, reporter) {
    super(reporter);
    this.commandFactory = commandFactory;
  }

  invoke() {
    this.commandFactory.disable();
  }
}

module.exports = EndCommand;
