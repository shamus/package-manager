const readline = require('readline');
const CommandFactory = require('./src/command_factory');
const Reporter = require('./src/reporter');

function parseLine(line) {
  return line.split(' ')
    .map(item => item.trim())
    .filter(item => item.length > 0);
}


module.exports = function(input, output) {
  const reporter = new Reporter(output);
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
        command.invoke();
      })
      .on('close', () => {
        resolve();
      });
  });
}
