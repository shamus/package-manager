const Command = require('./command');
const DependCommand = require('./commands/depend_command');
const EndCommand = require('./commands/end_command');
const InstallCommand = require('./commands/install_command');
const ListCommand = require('./commands/list_command');
const RemoveCommand = require('./commands/remove_command');
const UnknownCommand = require('./commands/unknown_command');

const DEPEND = 'DEPEND';
const END = 'END';
const INSTALL = 'INSTALL';
const LIST = 'LIST';
const REMOVE = 'REMOVE';

class CommandFactory {
  constructor(reporter) {
    this.reporter = reporter;
  }

  build(name, args) {
    if (this.disabled) {
      return new Command(this.reporter);
    }

    let command;

    switch(name) {
      case DEPEND:
        command = new DependCommand(args.shift(), args, this.reporter);
        break;
      case INSTALL:
        command = new InstallCommand(args, this.reporter);
        break;
      case LIST:
        command = new ListCommand(this.reporter);
        break;
      case REMOVE:
        command = new RemoveCommand(args, this.reporter);
        break;
      case END:
        command = new EndCommand(this, this.reporter);
        break;
      default:
        command = new UnknownCommand(this.reporter);
    }

    return command;
  }

  disable() {
    this.disabled = true;
  }
}

module.exports = CommandFactory;
