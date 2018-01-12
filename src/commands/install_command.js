const Command = require('../command');

class InstallCommand extends Command {
  constructor(packages, reporter) {
    super(reporter);
    this.packages = packages;
  }

  invoke(registry, packageManager) {
    this.packages.forEach(name => packageManager.installPackage(name));
  }
}

module.exports = InstallCommand;
