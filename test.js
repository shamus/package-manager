const assert = require('assert');

const BufferedInput = require('./test/buffered_input');
const BufferedOutput = require('./test/buffered_output');
const processManifest = require('./index');

function testUnknownCommands() {
  const commands = [ 'FOO', 'BAR' ];
  const manifest = BufferedInput.from(commands);
  const report = new BufferedOutput();

  console.log('Testing unknown commands:');
  processManifest(manifest, report).then(() => {
    assert.deepEqual(report.toLines(), ['FOO', '   Unknown command', 'BAR', '   Unknown command']);
    console.log('...passed');
  });
}

function testEndCommand() {
  const commands = [ 'FOO', 'END', 'BAR' ];
  const manifest = BufferedInput.from(commands);
  const report = new BufferedOutput();

  console.log('Testing end command:');
  processManifest(manifest, report).then(() => {
    assert.deepEqual(report.toLines(), ['FOO', '   Unknown command', 'END']);
    console.log('...passed');
  });
}

function testDependCommand() {
  const commands = [ 'DEPEND a b', 'END' ];
  const manifest = BufferedInput.from(commands);
  const report = new BufferedOutput();

  console.log('Testing depend command:');
  processManifest(manifest, report).then(() => {
    assert.deepEqual(report.toLines(), ['DEPEND a b', 'END']);
    console.log('...passed');
  });
}

function testInstallCommand() {
  const commands = [ 'INSTALL a', 'END' ];
  const manifest = BufferedInput.from(commands);
  const report = new BufferedOutput();

  console.log('Testing install command:');
  processManifest(manifest, report).then(() => {
    assert.deepEqual(report.toLines(), ['INSTALL a', '   Installing a', 'END']);
    console.log('...passed');
  });
}

function testInstallCommandWithDependencies() {
  const commands = [ 'DEPEND a b', 'INSTALL a', 'END' ];
  const manifest = BufferedInput.from(commands);
  const report = new BufferedOutput();

  console.log('Testing install command with dependencies:');
  processManifest(manifest, report).then(() => {
    assert.deepEqual(report.toLines(), ['DEPEND a b', 'INSTALL a', '   Installing b', '   Installing a', 'END']);
    console.log('...passed');
  });
}

function testInstallCommandWithAlreadyInstalled() {
  const commands = [ 'INSTALL a', 'INSTALL a', 'END' ];
  const manifest = BufferedInput.from(commands);
  const report = new BufferedOutput();

  console.log('Testing install command with already installed:');
  processManifest(manifest, report).then(() => {
    assert.deepEqual(report.toLines(), ['INSTALL a', '   Installing a', 'INSTALL a', '   a is already installed', 'END']);
    console.log('...passed');
  });
}

function testRemoveCommand() {
  const commands = [ 'INSTALL a', 'REMOVE a', 'END' ];
  const manifest = BufferedInput.from(commands);
  const report = new BufferedOutput();

  console.log('Testing remove command:');
  processManifest(manifest, report).then(() => {
    assert.deepEqual(report.toLines(), ['INSTALL a', '   Installing a', 'REMOVE a', '   Removing a', 'END']);
    console.log('...passed');
  });
}

function testRemoveCommandWithDependencies() {
  const commands = [ 'DEPEND a b', 'INSTALL a', 'REMOVE a', 'END' ];
  const manifest = BufferedInput.from(commands);
  const report = new BufferedOutput();

  console.log('Testing remove command with dependencies:');
  processManifest(manifest, report).then(() => {
    assert.deepEqual(report.toLines(), ['DEPEND a b', 'INSTALL a', '   Installing b', '   Installing a', 'REMOVE a', '   Removing a', '   Removing b', 'END']);
    console.log('...passed');
  });
}

function testRemoveCommandWithRemainingDependencies() {
  const commands = [ 'DEPEND a b', 'DEPEND c b', 'INSTALL a', 'INSTALL c', 'REMOVE a', 'END' ];
  const manifest = BufferedInput.from(commands);
  const report = new BufferedOutput();

  console.log('Testing remove command with dependencies:');
  processManifest(manifest, report).then(() => {
    console.log(report.toLines());
    assert.deepEqual(report.toLines(), ['DEPEND a b', 'DEPEND c b', 'INSTALL a', '   Installing b', '   Installing a', 'INSTALL c', '   Installing c', 'REMOVE a', '   Removing a', 'END']);
    console.log('...passed');
  });
}

function testRemoveCommandWithConflicts() {
  const commands = [ 'DEPEND a b', 'INSTALL a', 'REMOVE b', 'END' ];
  const manifest = BufferedInput.from(commands);
  const report = new BufferedOutput();

  console.log('Testing remove command with conflicts:');
  processManifest(manifest, report).then(() => {
    assert.deepEqual(report.toLines(), ['DEPEND a b', 'INSTALL a', '   Installing b', '   Installing a', 'REMOVE b', '   b is still needed', 'END']);
    console.log('...passed');
  });
}

function testRemoveCommandWithUninstalled() {
  const commands = [ 'REMOVE a', 'END' ];
  const manifest = BufferedInput.from(commands);
  const report = new BufferedOutput();

  console.log('Testing remove command with uninstalled:');
  processManifest(manifest, report).then(() => {
    assert.deepEqual(report.toLines(), ['REMOVE a', '   a is not installed', 'END']);
    console.log('...passed');
  });
}


testUnknownCommands();
testEndCommand();
testDependCommand();
testInstallCommand();
testInstallCommandWithDependencies();
testInstallCommandWithAlreadyInstalled();
testRemoveCommand();
testRemoveCommandWithDependencies();
testRemoveCommandWithRemainingDependencies();
testRemoveCommandWithConflicts();
testRemoveCommandWithUninstalled();
