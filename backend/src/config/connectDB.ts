import { connect } from "mongoose";

const connectDB = async () => {
  try {
  const username= process.env.MONGODB_USERNAME
  const password= process.env.MONGODB_PASSWORD
  const databaseName=process.env.MONGODB_DATABASE_NAME

    const mongoURI: string = `mongodb+srv://${username}:${password}@${databaseName}.mongodb.net/?retryWrites=true&w=majority`;
    await connect(mongoURI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(JSON.stringify(err));
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;