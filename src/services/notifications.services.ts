import BaseService from "../common/base.services";
import Notification from "../entities/Notification.entity";

export default class NotificationsService extends BaseService<Notification> {

    public constructor() { super(Notification) }
}