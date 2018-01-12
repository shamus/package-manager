const readline = require('readline');
const Reporter = require('./src/reporter');

module.exports = function(input, output) {
  const reporter = new Reporter(output);

  return new Promise(function(resolve, reject) {
    readline.createInterface({ input: input, terminal: false})
      .on('line', (line) => {
        reporter.echo(line);
      })
      .on('close', () => {
        resolve();
      });
  });
}
