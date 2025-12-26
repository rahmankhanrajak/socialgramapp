import Message from "../models/Message.js"; 

export default function registerChatHandlers(io, socket) {
  console.log("User connected:", socket.id);

  socket.once("chat:join", async (userInfo) => {
    console.log("User joined chat:", userInfo);

    try {
      const lastMessages = await Message.find()
        .sort({ createdAt: -1 })
        .limit(20)
        .lean();

      lastMessages.reverse();

      socket.emit("chat:history", lastMessages);
    } catch (err) {
      console.error("Error loading chat history:", err.message);
    }
  });

  socket.on("chat:message", async (data) => {
    console.log("Incoming message:", data);

    const { userId, userName, content } = data;
    if (!userId || !userName || !content?.trim()) {
      return; 
    }

    try {
      const saved = await Message.create({
        fromUserId: userId,
        userName,
        content,
      });

      const msgToSend = {
        _id: saved._id,
        fromUserId: saved.fromUserId,
        userName: saved.userName,
        content: saved.content,
        createdAt: saved.createdAt,
      };

      io.emit("chat:message", msgToSend);
    } catch (err) {
      console.error("Error saving/sending message:", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
}


