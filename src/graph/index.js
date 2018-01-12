class Graph {
  constructor() {
    this.edges = new Map();
  }

  addNode(node) {
    if (!this.edges.has(node)) {
      this.edges.set(node, []);
    }
  }

  removeNode(node) {
    this.edges.delete(node);
  }

  addEdge(from, to) {
    this.addNode(to);
    this.addNode(from);

    if (!this.adjacentNodes(from).includes(to)) {
      this.adjacentNodes(from).push(to);
    }
  }

  findNodes(predicate) {
    if (predicate == undefined) {
      predicate = () => true;
    }

    return Array.from(this.edges.keys()).filter(predicate);
  }

  adjacentNodes(node) {
    return this.edges.get(node) || [];
  }

  traverse(starting, processor) {
    this.adjacentNodes(starting).every(node => {
      const shouldStop = processor.processEdge(starting, node);
      if (!shouldStop) {
        this.traverse(node, processor);
      }

      return shouldStop;
    });
  }
}

module.exports = Graph;
