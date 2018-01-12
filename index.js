const readline = require('readline');
const CommandFactory = require('./src/command_factory');
const PackageManager = require('./src/package_manager');
const Reporter = require('./src/reporter');
const Registry = require('./src/registry');

function parseLine(line) {
  return line.split(' ')
    .map(item => item.trim())
    .filter(item => item.length > 0);
}


module.exports = function(input, output) {
  const reporter = new Reporter(output);
  const commandFactory = new CommandFactory(reporter);
  const registry = new Registry();
  const packageManager = new PackageManager(registry, reporter);

  return new Promise(function(resolve, reject) {
    readline.createInterface({ input: input, terminal: false})
      .on('line', (line) => {
        if (commandFactory.disabled) {
          return;
        }

        const [name, ...args] = parseLine(line);
        const command = commandFactory.build(name, args);
        reporter.echo(line);
        command.invoke(registry, packageManager);
      })
      .on('close', () => {
        resolve();
      });
  });
}
