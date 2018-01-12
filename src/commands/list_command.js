const Command = require('../command');

class ListCommand extends Command {
  constructor(reporter) {
    super(reporter);
  }

  invoke(registry, packageManager) {
    packageManager.listPackages();
  }
}

module.exports = ListCommand;
