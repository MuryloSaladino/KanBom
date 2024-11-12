import BaseService from "../common/base.services";
import CardList from "../entities/CardList.entity";

export default class CardListsService extends BaseService<CardList> {

    public constructor() { super(CardList) }
}