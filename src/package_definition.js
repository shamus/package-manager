class PackageDefinition {
  constructor(name, dependencies) {
    this.name = name;
    this.dependencies = dependencies || [];
  }
}

module.exports = PackageDefinition;
