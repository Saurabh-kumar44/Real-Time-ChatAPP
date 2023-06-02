import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send("jelskj")
})

mongoose.connect(process.env.MONGO_URL,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });




// Start the server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
