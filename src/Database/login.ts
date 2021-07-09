import mongoose from "mongoose"
import { config } from "../config"

export default mongoose.connect(config.auth.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})