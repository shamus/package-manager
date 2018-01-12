class Command {
  constructor(reporter) {
    this.reporter = reporter;
  }

  invoke() {
    this.reporter.message("Unknown command");
  }
}

module.exports = Command;
