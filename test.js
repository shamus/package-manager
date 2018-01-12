const assert = require('assert');

const BufferedInput = require('./test/buffered_input');
const BufferedOutput = require('./test/buffered_output');
const processManifest = require('./index');

function testEcho() {
  const commands = [ 'INSTALL', 'LIST', 'END' ];
  const manifest = BufferedInput.from(commands);
  const report = new BufferedOutput();

  processManifest(manifest, report).then(() => {
    console.log('Testing echo:');
    assert.deepEqual(report.toLines(), commands);
    console.log('...passed');
  });
}

testEcho();
