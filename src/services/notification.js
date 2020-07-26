import Notification from "../models/notification.js";



export const addNotification = async (content, userId) => {
    const notification = new Notification({content, userId})
    try{
        notification.save()
    } catch (e) {
        console.log(e);
    }
}



export const getNotifications = async (userId) => {
    return await Notification.find({userId});
}
