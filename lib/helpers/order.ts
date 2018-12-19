import Card from '../models/Card'
export function shuffle(_cards: Array<Card>): Array<Card> {
  for (let i = _cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [_cards[i], _cards[j]] = [_cards[j], _cards[i]];
  }
  return _cards;
}

export function orderByFamilarity(_cards: Array<Card>): Array<Card> {
  _cards.sort((a:Card, b:Card) => a.familarity - b.familarity)
  return _cards
}