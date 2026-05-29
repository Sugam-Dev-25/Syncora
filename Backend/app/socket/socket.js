const onlineUsers = new Map();

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    // JOIN

    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);

      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });

    // SEND MESSAGE

    socket.on("sendMessage", (data) => {
      try {
        const { receiverId } = data;

        // RECEIVER SOCKET

        const receiverSocketId = onlineUsers.get(receiverId);

        // SEND TO RECEIVER

        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receiveMessage", data);
        }
      } catch (error) {
        console.log("Socket Error:", error.message);
      }
    });

    // TYPING

    socket.on("typing", (data) => {
      const receiverSocketId = onlineUsers.get(data.receiver);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("typing", {
          sender: data.sender,
        });
      }
    });

    // STOP TYPING

    socket.on("stopTyping", (data) => {
      const receiverSocketId = onlineUsers.get(data.receiver);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("stopTyping", {
          sender: data.sender,
        });
      }
    });

    // DISCONNECT

    socket.on("disconnect", () => {
      console.log("User disconnected");

      for (const [userId, socketId] of onlineUsers) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);

          break;
        }
      }

      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });
  });
};

module.exports = socketHandler;
