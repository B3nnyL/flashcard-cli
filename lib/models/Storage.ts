import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import Stack from './Stack';
import Card from './Card';

const { join, parse } = path;

export default class Storage {
  storageDir: string;
  storageFileName: string;

  constructor() {
    this.storageDir = join(os.homedir(), ".fcards");
  }

  isStorageDirExisted():boolean {
    if (!fs.existsSync(this.storageDir)) {
      fs.mkdirSync(this.storageDir);
      return false;
    } else {
      return true;
    }
  }

  getStack(fileName: string): Array<Card> {
    if(this.isStorageDirExisted()){
      const tempFileName = join(this.storageDir, fileName + ".json");
      if (fs.existsSync(tempFileName)) {
        const content = fs.readFileSync(tempFileName, "utf8");
        const jsonfiedContent = JSON.parse(content);
        const _stack = new Stack(fileName);
        // if (jsonfiedContent.meta) _stack.setMeta(jsonfiedContent.meta);
        if (jsonfiedContent.cards) _stack.setCards(jsonfiedContent.cards);
        return _stack.getCards();
      } else {
        console.error("cant get stack");
      }
    }
  }

  getAll(): Array<Card> {
    let data: Array<Card> = [];
    if (fs.existsSync(this.storageDir)) {
      fs.readdirSync(this.storageDir).forEach(file => {
        const fileName = parse(file).name;
        const content = this.getStack(fileName);
        data = [...content];
      });
    }
    return data;
  }

  saveFile(data: Stack):boolean {
    if(this.storageDir){
      if (data) {
        const fileName = join(this.storageDir, data.meta.name + '.json');
        fs.writeFileSync(fileName, JSON.stringify(data), 'utf8');
        return true
      }
    } else {
      return false
    }
  }

  removeFile(fileName: string):boolean {
    const link = join(this.storageDir, fileName + ".json");
    fs.unlinkSync(link);
    return true;
  }

}