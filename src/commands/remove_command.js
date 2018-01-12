const Command = require('../command');

class RemoveCommand extends Command{
  constructor(packages, reporter) {
    super(reporter);
    this.packages = packages;
  }

  invoke(registry, packageManager) {
    this.packages.forEach(name => packageManager.removePackage(name));
  }
}

module.exports = RemoveCommand;
