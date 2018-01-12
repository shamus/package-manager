# Package Manager

Run tests
`npm test`

## Assumptions

This implementation assumes input will come from a file.
Let's call it a `manfiest file`.

## Features

1. Echo manifest file
   * Scenario: default

2. Process unknown commands
   * Scenario: default

3. Process END command
   * Scenario: default
   * Scenario: input after END command
   * Scenario: malformed command?

4. Process DEPEND command
   * Scenario: default
   * Scenario: malformed command?

5. Process INSTALL command
   * Scenario: default
   * Scenario: with dependencies
   * Scenario: already installed
   * Scenario: malformed command?

6. Process LIST command
   * Scenario: default
   * Scenario: malformed command?

7. Process REMOVE command
   * Scenario: default
   * Scenario: all dependencies unused
   * Scenario: some dependencies required by other packages
   * Scenario: not installed
   * Scenario: malformed command?
