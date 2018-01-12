const Command = require('../command');

class DependCommand extends Command {
  constructor(packageName, dependencies, reporter) {
    super(reporter);
    this.packageName = packageName;
    this.dependencies = dependencies;
  }

  invoke(registry) {
    registry.definePackage(this.packageName, this.dependencies);
  }
}

module.exports = DependCommand;
