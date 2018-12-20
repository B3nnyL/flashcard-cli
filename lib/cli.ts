#!/usr/bin/env node

import * as meow from 'meow';
import { addCard, createStack, showStackMeta,removeCard, removeStack, editCard, editStackMeta, study, studyMode } from './controller/api';
import Storage from './models/Storage';
import { failedRes , successRes} from './helpers/render'


const cli = meow(
  `
  Usage
      fcard - v | --version
  Show help
      fcard - h | --help
  Show info about stacks
      fcard - a | --all
  Show stack info
      fcard --show --stack [stackName]
  Add new stack
      fcard --add --stack [stackName]
  Edit stack's meta
    fcard --edit --stack [stackName]
  Add new card to a stack
      fcard --add --card [stackName]
  Remove stack
      fcard --remove --stack [stackName]
  Remove card from a stack
      fcard --remove --card [stackName]
  Edit a particular card from a stack
      fcard --edit --card [stackName]
  study a stack
      fcard --study [stackName] --mode [suffle | order(default) | familarity]
`,
  {
    flags: {
      help: {
        type: "boolean",
        alias: "h"
      },
      version: {
        type: "boolean",
        alias: "v"
      },
      show: {
        type: "boolean"
      },
      add: {
        type: "boolean"
      },
      remove: {
        type: "boolean"
      },
      edit: {
        type: "boolean",
      },
      stack: {
        type: "string",
        alias: "s"
      },
      card: {
        type: "string",
        alias: "c"
      },
      study: {
        type: "string"
      },
      mode: {
        type: "string",
        alias: "m"
      }
    }
  }
);


console.log(cli.input, cli.flags);

const {input, flags} = cli;
const storage = new Storage();

if(flags.show){
  if(flags.stack){
    try{
      showStackMeta(storage, flags.stack)
    }catch(e){
      const error = failedRes(`No stack ${flags.stack} is found`);
      console.log(error)
    }
  }
}

if(flags.add){
  if(flags.stack){
    try{
      createStack(storage);
    }catch(e){
      console.log(failedRes('error with storage'))
    }
  }
  if(flags.card){
    try{
      addCard(input[0],storage);
    }catch(e){
      const error = failedRes(`No stack ${flags.stack} is found`);
      console.log(error)
    }
  }
}

if(flags.edit) {
  if(flags.stack) {
    try {
      editStackMeta(storage, flags.stack);
    } catch(e){
      const error = failedRes(`Not able to edit stack`);
      console.log(error);
    }
  }
  if(flags.card) {
    try{
      editCard(storage, input[0]);
    }catch(e) {
      const error = failedRes(`Not able to edit card ${input[0]}`);
      console.log(error)
    }
  }
}

if(flags.remove){
  if(flags.stack) {
    try {
      removeStack(flags.stack,storage)
    } catch(e) {
      const error = failedRes(`error with storage`);
      console.log(error);
    }
  }
  if(flags.card) {
    try {
      removeCard(input[0], storage)
    } catch(e) {
      const error = failedRes(`Can't remove card ${input[0]}`);
      console.log(error);
    }
  }
}