require('dotenv').config();

import mongoose from "mongoose";

export async function connect() {
  try {
    if (mongoose.connections[0].readyState) return;
    const uri = process.env.MONGO_URI!;

    if (!uri) {
      throw new Error('URI is not defined in the env variables')
    }

    await mongoose.connect(uri);
    console.log('mongoose connected');
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    })

    connection.on('error', (err) => {
      console.log('MongoDB connection error. Please makesure MongoDB is running.' + err);
      process.exit();
    })

  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
}