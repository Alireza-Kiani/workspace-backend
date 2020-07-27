import Notification from "../models/notification.js";
import {cacheIt, clearCache} from "./cache.js";
import {RedisEnum, ErrorEnum} from "../misc/enum.js";

export const pushNotificationToCache = async (userId) => {
    try {
        await cacheIt(RedisEnum.Notification, userId, await Notification.find({userId}) || [], true);
    } catch (e) {
        console.log({"Error": ErrorEnum.RedisSync})
    }
}

export const getNotifications = async (userId) => {
    return cacheIt(RedisEnum.Notification, userId, null, false);
}

export const addNotification = async (content, userId) => {
    const notification = new Notification({content, userId});
    let notifications = await getNotifications(userId) || [];

    if(notifications == null) {
        return notification.save();
    }

    notifications.push(notification);

    await cacheIt(RedisEnum.Notification, userId, notifications, true);
}

export const pushUpdateDB = async (userId) => {
    const notifications = await getNotifications(userId) || [];
    for (const item of notifications) {
        const notification = new Notification({content: item.content, userId: item.userId});
        try {
            await notification.save();
            await clearCache(RedisEnum.Notification, userId)
        } catch (e) {
            console.log(ErrorEnum.DBSave);
        }
    }
}
