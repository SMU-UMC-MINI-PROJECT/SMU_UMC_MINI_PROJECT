import socketChatController from '../srcs/controllers/socketChat.controller.js';
import socketUserController from '../srcs/controllers/socketUser.controller.js';

const setupSocketIO = (io) => {
    // 소켓 연결 설정
    io.on("connection", async (socket) => {
        console.log("Client connected:", socket.id);

        // 로그인 이벤트 처리
        socket.on("login", async (data, cb) => {
            try {
                const user = await socketUserController.saveUser(data[0], data[1], socket.id);
                const welcomeMessage = {
                    chat: `${user.socketUserName} has joined the room.`,
                    user: { id: null, name: "system" },
                };
                io.emit("message", welcomeMessage);
                cb({ ok: true, data: user });
            } catch (err) {
                cb({ ok: false, error: err.message });
            }
        });

        // 메시지 전송 이벤트 처리
        socket.on("sendMessage", async (message, cb) => {
            try {
                const user = await socketUserController.checkUser(socket.id);
                console.log('1111',user)
                const newMessage = await socketChatController.saveChat(message, user);
                io.emit("message", newMessage);
                cb({ ok: true });
            } catch (err) {
                cb({ ok: false, error: err.message });
            }
        });

        // 연결 해제 이벤트 처리
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

export default setupSocketIO;
