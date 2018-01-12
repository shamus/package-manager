class CycleDetector {
  constructor() {
    this.containsCycle = false;
    this.edges = new Map();
  }

  processEdge(from, to) {
    let adjacent = this.edges.get(from);
    if (adjacent === undefined) {
      adjacent = [];
      this.edges.set(from, adjacent);
    }

    this.containsCycle = adjacent.includes(to);
    if (this.containsCycle) {
      return true;
    }

    adjacent.push(to);
  }
}

module.exports = CycleDetector;
