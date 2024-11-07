import Card from "../entities/Card.entity";
import BaseService from "../common/base.services";

export default class CardsService extends BaseService<Card> {

    public constructor() { super(Card) }
}