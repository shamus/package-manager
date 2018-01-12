const PackageDefinition = require('./package_definition');

class Registry {
  constructor() {
    this.definitions = new Map();
  }

  definePackage(name, dependencies) {
    const definition = new PackageDefinition(name, dependencies);
    this.definitions.set(definition.name, definition);

    return definition;
  }

  findPackage(name) {
    let definition = this.definitions.get(name);
    if (definition === undefined) {
      definition = this.definePackage(name);
    }

    return definition;
  }
}

module.exports = Registry;
