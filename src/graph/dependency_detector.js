class DependencyDetector {
  constructor(pkg) {
    this.pkg = pkg;
    this.isRequired = false;
    this.seen = new Set();
  }

  processEdge(from, to) {
    const seenEdge = this.seen.has(from) && this.seen.has(to);
    if (this.isRequired || seenEdge) {
      return true;
    }

    this.seen.add(from);
    this.seen.add(to);
    this.isRequired = from === this.pkg || to === this.pkg;
  }
}

module.exports = DependencyDetector;
