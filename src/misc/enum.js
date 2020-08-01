export const TypeEnum = Object.freeze({Direct: "DIRECT", Group: "GROUP"});

export const ErrorEnum = Object.freeze({DBSync: "Failed to fetch data from data base", RedisSync: "Failed to sync Database with cache server", DBSave: "Failed to save data in database", InvalidEmail: "Entered email is not a valid email address", EmailNotFound: "Could'nt find the entered email address", UserNotFound: "Could'nt find the user", BoardNotFound: "Could'nt find the board"});

export const NotificationEnum = Object.freeze({NewMessage: "New Messages"});

export const RedisEnum = Object.freeze({Notification: "NOTIFICATION"});