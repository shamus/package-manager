const LocalPackage = require('./local_package');
const DependencyGraph = require('./dependency_graph');

class PackageManager {
  constructor(registry, reporter) {
    this.dependencyGraph = new DependencyGraph(registry);
    this.reporter = reporter;
    this.installed = new Map();
  }

  findOrCreateLocalPackage(definition) {
    let metadata = this.installed.get(definition);
    if (metadata === undefined) {
      metadata = new LocalPackage(definition);
      this.installed.set(definition, metadata);
    }

    return metadata;
  }

  installPackage(name) {
    const definition = this.dependencyGraph.findPackage(name) || this.dependencyGraph.addPackage(name);
    const localPackage = this.findOrCreateLocalPackage(definition);

    const install = (pkg, complain) => {
      if (pkg.installed) {
        if (complain) {
          this.reporter.message(`${pkg.name} is already installed`);
        }
        return;
      }

      pkg.definition.dependencies.forEach(dependencyName => {
        const dependency = this.dependencyGraph.findPackage(dependencyName);
        const dependencyMetadata = this.findOrCreateLocalPackage(dependency);
        install(dependencyMetadata);
      });

      pkg.setInstalled(true);
      this.reporter.message(`Installing ${pkg.name}`);
    }

    install(localPackage, true);
  }
}

module.exports = PackageManager;
