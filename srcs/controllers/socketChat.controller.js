import SocketChat from '../models/socketChat.model.js'
const socketChatController = {}
socketChatController.saveChat = async(message, user)=>{
    const newMessage = new SocketChat({
        chat:message,
        user:{
            id:user._id,
            name:user.name
        }
    })
    await newMessage.save();
    return newMessage;

}
export default socketChatController;
