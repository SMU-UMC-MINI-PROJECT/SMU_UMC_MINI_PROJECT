import SocketChat from '../Models/socketChat.js'
const socketChatController = {}
socketChatController.saveChat = async(message, user)=>{
    const newMessage = new SocketChat({
        chat:message,
        user:{
            id:user._id,
            name:user.name,
            socketUserPhone:user.socketUserPhone
        }
    })
    await newMessage.save();
    return newMessage;

}
export default socketChatController;
