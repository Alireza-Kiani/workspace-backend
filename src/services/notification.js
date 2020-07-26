import Notification from "../models/notification.js";



export const addNotification = async (content, userId) => {
    const notification = new Notification({content, userId})
    notification.save()
}



export const getNotifications = async (userId) => {
    return await Notification.find({userId});
}
