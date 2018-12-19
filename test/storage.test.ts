import * as jest from "ts-jest";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";
const { join } = path;
import Storage from '../lib/models/Storage';
import Stack from '../lib/models/Stack';
import Card from '../lib/models/Card';
import { card_1, card_2, stack_1 } from './mock';

describe("Storage can", () => {
  const storage = new Storage();
  const card1 = new Card(card_1.content);
  const card2 = new Card(card_2.content);
  const stack = new Stack(stack_1.meta.name, stack_1.meta.author, [card1, card2]);

  test("create storage directory", () => {
    expect(storage.isStorageDirExisted()).toBe(false);
    expect(storage.isStorageDirExisted()).toBe(true);
  });

  test("save file", () => {
    expect(storage.saveFile(stack)).toBe(true);
  });

  test("get stack", () => {
    const returnedStack = storage.getStack(stack_1.meta.name).getCards();
    const expectedStack = stack.getCards();
    expect(JSON.stringify(returnedStack)).toEqual(JSON.stringify(expectedStack));
  });

  test("get all stacks", () => {
    const allStock = storage.getAll();
    expect(allStock.length).toBe(2);
  });

  test("remove file", () => {
    expect(storage.removeFile(stack_1.meta.name)).toBe(true);
  });

  afterAll(() => {
    const dir = join(os.homedir(), ".fcards");
    fs.rmdirSync(dir);
  })

});