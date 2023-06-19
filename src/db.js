import mongoose from "mongoose"
import { config } from "dotenv"

config()

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("connected todo bien")
  } catch (error) {
    console.log(error)
  }
}
