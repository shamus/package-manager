const readline = require('readline');
const CommandFactory = require('./src/command_factory');
const Reporter = require('./src/reporter');
const Registry = require('./src/registry');

function parseLine(line) {
  return line.split(' ')
    .map(item => item.trim())
    .filter(item => item.length > 0);
}


module.exports = function(input, output) {
  const reporter = new Reporter(output);
  const registry = new Registry();
  const commandFactory = new CommandFactory(reporter);

  return new Promise(function(resolve, reject) {
    readline.createInterface({ input: input, terminal: false})
      .on('line', (line) => {
        if (commandFactory.disabled) {
          return;
        }

        const [name, ...args] = parseLine(line);
        const command = commandFactory.build(name, args);
        reporter.echo(line);
        command.invoke(registry);
      })
      .on('close', () => {
        resolve();
      });
  });
}
