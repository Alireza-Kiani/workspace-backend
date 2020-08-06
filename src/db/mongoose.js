import mongoose from "mongoose";


mongoose.connect('mongodb://185.211.59.101:27017/work-space', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
