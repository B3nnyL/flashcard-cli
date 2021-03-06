# fcard-cli [in-progress]
[![Build Status](https://travis-ci.com/B3nnyL/flashcard-cli.svg?token=RUf6HBtiz9iZAUZjDB8Q&branch=master)](https://travis-ci.com/B3nnyL/flashcard-cli)

A flashcard app lives in the terminal.

## Todos
- [x] Setup
- [x] CRUD cards
- [x] Learn with card (order, familarity, random)
- [ ] Study summary
- [x] Format outputs
- [x] Travis
- [ ] Docs

## Commands
- show version
  `fcard -v|--version`
- show help
  `fcard -h|--help`
- show info about stacks
  `fcard -a|--all`
- show stack info
  `fcard --show --stack [stackName]`
- new stack
  `fcard --add --stack [stackName]`
- new card
  `fcard --add --card [stackName]`
- remove stack
  `fcard --remove --stack [stackName]`
- remove card in stack
  `fcard --remove --card [stackName]`
- edit stack's meta
  `fcard --edit --stack [stackName]`
- edit particular card for a stack
  `fcard --edit --card [stackName]`
- study a stack
  `fcard --study [stackName] --mode [suffle|order (default)|familarity]`

