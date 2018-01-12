class LocalPackage {
  constructor(definition) {
    this.definition = definition;
    this.installed = false;
  }

  get name() {
    return this.definition.name;
  }

  get dependencies() {
    return this.definition.dependencies;
  }

  setInstalled(value) {
    this.installed = value;
  }
}

module.exports = LocalPackage;
