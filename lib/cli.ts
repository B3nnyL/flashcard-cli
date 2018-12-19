import minimist from 'minimist';
import { addCard, createStack, showStackMeta,removeCard, removeStack, editCard, editStackMeta, study, studyMode } from './controller/api';
import Storage from 'models/Storage';

const args = minimist(process.argv.slice(2), {
  string: ["stack", "card", "mood", "study"], // --lang xml
  boolean: ["version", "help", "all", "show", "add", "remove", "edit"], // --version
  alias: { v: "version", h: "help", a: "all" },
  stopEarly: true
});

const storage = new Storage();

if(args.show && args.stack){
  showStackMeta(storage, args.stack);
} else if(args.version){
  console.log('233');
} else if(args.help){
  console.log('help');
} else if(args.add && args.stack){
  createStack(storage);
} else if(args.add && args.card){
  addCard(args.card, args.stack);
} else if(args.remove && args.card){
  removeCard(args.card, storage);
} else if(args.remove && args.stack){
  removeStack(args.stack, storage);
} else if(args.edit && args.card){
  editCard(storage, args.card)
} else if(args.edit && args.stack){
  editStackMeta(storage, args.stack)
} else if(args.study && args.stack){
  const array = studyMode(args.stack, args._[0], storage);
  study(array);
}