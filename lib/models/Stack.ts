import StackMeta from '../interfaces/StackMeta';
import Card from '../models/Card';
export default class Stack {
    meta: StackMeta;
    cards?: Array<Card>;

    constructor(_name: string, _author?: string, _cards?: Array<Card>) {
        const date = new Date();
        this.meta = {
            name: _name,
            createdTime: date,
            author: _author
        }
        if(_cards) this.cards = _cards
    }

    getCards(): Array<Card> {
        if(this.cards) return this.cards
    }

    setCards(_cards: Array<Card>) {
        this.cards = _cards
    }

    getName(): string {
        return this.meta.name
    }

    getCount(): string {
        const amount = this.cards ? this.cards.length.toString() : 'No card exist';
        return amount
    }

    setMeta(_name: string, _author?: string) {
        this.meta.name = _name
        if(_author) this.meta.author = _author
    }

    getCard(id: string): Card {
        const existingCards = this.getCards();
        return existingCards.filter(card => card._id === id)[0];
    }

    addCard(_card: Card) {
        const existingCards = this.getCards();
        return existingCards.push(_card);
    }

    removeCard(id: string) {
        this.cards = this.getCards().filter( card => card._id !== id);
    }
}