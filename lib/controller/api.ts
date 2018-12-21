import { prompt } from "enquirer";
import Card from '../models/Card';
import {shuffle, orderByFamilarity} from '../helpers/order';
import Storage from '../models/Storage';
import Stack from "../models/Stack";
import { frontRes, inBox, backRes } from "../helpers/render";

export async function addCard(_stackName:string, _storage: Storage) {
  const { front, back, familarity } = await prompt([
    {
      type: 'input',
      name: 'front',
      message: 'Enter content of front cover for the new card'
    },
    {
      type: 'input',
      name: 'back',
      message: 'Enter content of back cover for the new card'
    },
    {
      type: 'select',
      name: 'familarity',
      message: 'How familar are you with the card?',
      choices: [1, 2, 3, 4, 5]
    }
  ]);
  const _card = new Card({content__front: front, content__back: back}, familarity);
  const _stack = _storage.getStack(_stackName);
  _stack.addCard(_card);
  _storage.saveFile(_stack);
}

export async function setFamilarity(_stackName:string, _storage: Storage) {
  const { familarity,id } = await prompt([{
    type: "input",
    name: "id",
    message: "Input id of the card"
  },{
    type: 'select',
    name: 'familarity',
    message: 'Rate familarity',
    choices: [1, 2, 3, 4, 5],
  }]);
  const _stack = _storage.getStack(_stackName);
  _stack.getCard(id).setFamilarity(familarity);
  _storage.saveFile(_stack);
}

export async function editCard( _storage:Storage ,_stackName:string) {
  let { front, back, familarity, id } = await prompt([
    {
      type: "input",
      name: "id",
      message: "Id of card"
    },
    {
      type: "input",
      name: "front",
      message: "Edit front cover"
    },
    {
      type: "input",
      name: "back",
      message: "Edit back cover"
    },
    {
      type: "select",
      name: "familarity",
      message: "How familar are you with this card?",
      choices: [1, 2, 3, 4, 5]
    }
  ]);

  const _stack = _storage.getStack(_stackName);
  console.log({ front, back, familarity, id });

  if(front || back || familarity){
    if(front.length === 0) front = _stack.getCard(id).getContentFront();
    if (back.length === 0) back = _stack.getCard(id).getContentBack();
    _stack.getCard(id).setContent({content__front: front, content__back: back});
    _stack.getCard(id).setFamilarity(familarity);
    _storage.saveFile(_stack);
  }
}

export async function removeCard(_stackName:string, _storage: Storage) {
  const { id } = await prompt({
    type: "input",
    name: "id",
    message: "id of card"
  });

  const _stack = _storage.getStack(_stackName);
  _stack.removeCard(id);
  _storage.saveFile(_stack);
}

export async function createStack(_storage: Storage) {
  const { stackName, author } = await prompt([{
    type: 'input',
    name: 'stackName',
    message: 'Give new stack a name'
  },{
      type: 'input',
      name: 'author',
      message: 'Leave author\'s name'
  }]);
  const stack = new Stack(stackName, author)
  _storage.saveFile(stack);
}

export function showStackMeta(_storage: Storage, _stackName: string){
  console.log( _storage.getStack(_stackName).getName())
}

export async function editStackMeta(_storage: Storage, _stackName: string){
  const { stackName, author } = await prompt([{
    type: 'input',
    name: 'stackName',
    message: 'Stack\'s name'
  }, {
    type: 'input',
    name: 'author',
    message: 'author\'s name'
  }]);
  let _stack = _storage.getStack(_stackName);
  _stack.setMeta(stackName,author);
  _storage.saveFile(_stack);
}

export function removeStack(_stackName:string, _storage: Storage) {
  _storage.removeFile(_stackName);
}

export function studyMode(_stackName: string, _mode: string, _storage: Storage): Array<Card> {
  let cards = _storage.getStack(_stackName).getCards();
  let cardArray: Array<Card>;
  switch(_mode){
    case 'order':
      cardArray = cards;
      break;
    case 'shuffle':
      cardArray = shuffle(cards);
      break;
    case 'familarity':
      cardArray = orderByFamilarity(cards);
      break;
    default:
      cardArray = cards;
      break;
  }
  return cardArray;
}

export async function study(_studyMode: Array<Card>) {
  for(let _c of _studyMode){
    const front = _c.getContentFront();
    const back = _c.getContentBack();
    inBox(frontRes(front), 150);
    const { next } = await prompt(
      {
        type: 'select',
        name: 'next',
        message: 'Flip it',
        choices: ["yes", "no"]
      }
    );
    inBox(backRes(back), 150);
    const { isKnown } = await prompt({
      type: "select",
      name: "familarity",
      message: "Rate familiarity",
      choices: [1, 2, 3, 4, 5]
    });
  }
}