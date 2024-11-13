import Card from "../entities/Card.entity";
import BaseService from "../common/base.services";
import AppDataSource from "../data-source";
import CardParticipation from "../entities/CardParticipation.entity";

export default class CardsService extends BaseService<Card> {

    private participantsRepo = AppDataSource.getRepository(CardParticipation);

    public constructor() { super(Card) }

    public async addParticipant(cardId:string, userId:string) {
        await this.participantsRepo.save({ cardId, userId });
    }

    public async removeParticipant(cardId:string, userId:string) {
        await this.participantsRepo.remove({ cardId, userId });
    }
}