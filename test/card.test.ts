import * as jest from "ts-jest";
import Card from '../lib/models/Card';
import Stack from '../lib/models/Stack';

import { card_1, card_2, card_3, stack_1} from './mock';

describe('Card can', () => {
  const card = new Card(card_1.content);
  test('create card', () => {
    expect(card.getContentFront()).toBe(card_1.content.content__front);
    expect(card.getContentBack()).toBe(card_1.content.content__back);
    expect(card.familarity).toBe(1);
  });
  test('set familarity', () => {
    card.setFamilarity(3);
    expect(card.getFamilarity()).toBe("3");
  });

  test('update content', () => {
    const newContent = {
      content__front: 'front',
      content__back: 'back'
    }
    card.setContent(newContent)
    expect(card.getContentFront()).toBe(newContent.content__front);
    expect(card.getContentBack()).toBe(newContent.content__back);
  });

})

describe('Stack can ', () => {
  const card1 = new Card(card_1.content);
  const card2 = new Card(card_2.content);
  const card3 = new Card(card_3.content, card_3.familarity)
  const stack = new Stack(stack_1.meta.name,stack_1.meta.author,[card1, card2]);

  test('create new', () => {
    expect(stack.meta.name).toBe(stack_1.meta.name);
    const expectecCard = stack.getCards()[0];
    expect(stack.getCard(expectecCard._id).getContentFront()).toBe(card1.getContentFront());
  });

  test('update stacks name', () => {
    const newMeta = {
      name: 'Ipsum'
    }
    stack.setMeta(newMeta.name)
    expect(stack.getName()).toBe(newMeta.name);
  });

  const updatedStack = stack.addCard(card3);
  test('add new card_3 to stack', () => {
    expect(stack.getCards().length).toBe(updatedStack);
  })

  test('can get total card count', () => {
    expect(stack.getCount()).toBe('3');
  })

  test('remove card1', () => {
    const expectecCard = stack.getCards()[0];
    stack.removeCard(expectecCard._id);
    expect(stack.getCards().length).toBe(2);
  });

});