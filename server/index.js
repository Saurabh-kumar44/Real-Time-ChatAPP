import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js'
import messagesRout from './routes/messagesRout.js'
import { socket } from 'socket.io';

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api/auth', userRoute);
app.use('/api/messages', messagesRout);

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

// instance of the Socket.IO server
const io = socket(server,{
  cors: {
    origin: 'http://localhost:3000',
    Credentials: true
  },
})

global.onlineUsers = new Map(); //it stores all the online users inside the map

//whenver there is a connection store that chatSockets inside the global chatSockets
io.on('connection', (socket)=>{
  global.chatSocket = socket;
  socket.on("add-user", (userId)=>{
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg",(data)=>{
    const sendUserSocket = onlineUsers.get(data.io);
    if(sendUserSocket){
      socket.to(sendUserSocket).emit("msg-receive",data.msg);
    }
  })
})