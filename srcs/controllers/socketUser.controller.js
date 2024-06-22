import SocketUser from '../models/socketUser.model.js';

const socketUserController = {};

socketUserController.saveUser = async (userName, phoneNumber, sid) => {
    let user = await SocketUser.findOne({ socketUserName: userName });

    if (!user) {
        user = new SocketUser({
            socketUserName: userName,
            socketUserPhone: phoneNumber,
            token: sid,
            socketIsAdmin: false,
        });
    }

    await SocketUser.create(user);
    return user;
};
socketUserController.checkUser=async(sid)=>{
    const user = await SocketUser.findOne({token:sid})
    if(!user) throw new Error('User not found');
    return user;
}
socketUserController.isUser = async (userName, phoneNumber)=>{
    let socketUser = await SocketUser.findOne({socketUserName: userName, socketUserPhone: phoneNumber})
    if(socketUser){
        return socketUser;
    }
    else{
        return false;
    }
}
socketUserController.getMessages = async (userName, phoneNumber)=>{
    let socketUser = await SocketUser.findOne({socketUserName: userName, socketUserPhone: phoneNumber})
    if(socketUser){
        let userId = socketUser._id
        const chats = await SocketChat.find({ user: {id: userId }});
        let messages = []
        for (const i in chats){
            console.log('!!!!!!!!!', chats[i].chat)
            messages.push(chats[i].chat);
        }
        return messages;
    }
    return false;
}
export default socketUserController;
