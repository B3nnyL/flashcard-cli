import Content from '../interfaces/Content'
import { v4 as uuid } from "uuid";
export default class Card {
    _id: string;
    createdTime: Date;
    content: Content;
    familarity: number;

    constructor(_content:Content, _familarity = 1) {
        this._id = uuid();
        this.createdTime = new Date();
        this.content = _content;
        this.familarity = _familarity;
    }

    getContentFront(): string {
        return this.content.content__front;
    }

    getContentBack(): string {
        return this.content.content__back;
    }

    getFamilarity(): string {
        return this.familarity.toString();
    }

    setFamilarity(newFamilarity) {
        this.familarity = newFamilarity;
    }

    setContent(newContent:Content) {
        this.content.content__front = newContent.content__front;
        this.content.content__back = newContent.content__back;
    }
}