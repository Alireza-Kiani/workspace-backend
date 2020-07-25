import Notification from "../models/notification.js";



export const addNotification = async (content, userId) => {
    const notification = new Notification({content, userId})
    console.log(notification);
}