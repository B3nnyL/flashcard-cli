# fcard-cli
A flashcard app lives in the terminal.

## Todos
- [x] Setup
- [x] CRUD cards
- [ ] Learn with card (order, familarity, random)
- [ ] Study summary
- [ ] Format outputs
- [ ] Travis
- [ ] Docs

## Command
- show help
  `fcard -h`
- show info about stacks
  `fcard -a`
- show stack info
  `facrd -stack [stackName]`
- remove stack
  `fcard -rf --stack [stackName]`
- remove card in stack
  `fcard -rf --card [stackName] [card-id]`
- edit stack's meta
  `fcard -edit [stackName]`
- edit card from a stack
  `fcard -stack [stackName] --edit [card-id]`
- study a stack
  `fcard study [stackName] --mode [suffle|order|familarity]`

