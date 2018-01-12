const assert = require('assert');

const BufferedInput = require('./test/buffered_input');
const BufferedOutput = require('./test/buffered_output');
const processManifest = require('./index');

function testUnknownCommands() {
  const commands = [ 'FOO', 'BAR' ];
  const manifest = BufferedInput.from(commands);
  const report = new BufferedOutput();

  processManifest(manifest, report).then(() => {
    console.log('Testing unknown commands:');
    assert.deepEqual(report.toLines(), ['FOO', '   Unknown command', 'BAR', '   Unknown command']);
    console.log('...passed');
  });
}

function testEndCommand() {
  const commands = [ 'FOO', 'END', 'BAR' ];
  const manifest = BufferedInput.from(commands);
  const report = new BufferedOutput();

  processManifest(manifest, report).then(() => {
    console.log('Testing end command:');
    assert.deepEqual(report.toLines(), ['FOO', '   Unknown command', 'END']);
    console.log('...passed');
  });
}

testUnknownCommands();
testEndCommand();
