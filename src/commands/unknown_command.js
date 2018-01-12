const Command = require('../command');

class UnknownCommand extends Command {
  constructor(reporter) {
    super(reporter);
  }

  invoke() {
    this.reporter.message("Unknown command");
  }
}

module.exports = UnknownCommand;
