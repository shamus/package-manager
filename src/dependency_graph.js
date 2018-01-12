const CycleDetector = require('./graph/cycle_detector');
const DependencyDetector = require('./graph/dependency_detector');
const Graph = require('./graph');

class DependencyGraph {
  constructor(registry) {
    this.registry = registry;
    this.packages = new Graph();
  }

  findPackage(name) {
    return this.packages.findNodes(node => node.name == name)[0];
  }

  addPackage(name) {
    const pkg = this.registry.findPackage(name);
    if(this.containsCycle(pkg)) {
      throw `cycle detected: ${pkg.name}`;
    }

    this.packages.addNode(pkg);
    pkg.dependencies.forEach(dependencyName => {
      const dependency = this.registry.findPackage(dependencyName);
      this.packages.addEdge(pkg, dependency);

      this.addPackage(dependencyName);
    });

    return pkg;
  }

  containsCycle(starting) {
    const cycleDetector = new CycleDetector();
    this.packages.traverse(starting, cycleDetector);

    return cycleDetector.containsCycle;
  }

  removePackage(name) {
    const pkg = this.registry.findPackage(name);
    if (this.canRemovePackage(pkg)) {
      this.packages.removeNode(pkg);
    }
  }

  canRemovePackage(pkg) {
    const nodes = this.packages.findNodes(node => node !== pkg);
    const dependencyDetector = new DependencyDetector(pkg);
    return nodes.every(node => {
      this.packages.traverse(node, dependencyDetector);
      return !dependencyDetector.isRequired;
    });
  }
}

module.exports = DependencyGraph;
