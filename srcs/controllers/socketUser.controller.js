import SocketUser from '../models/socketUser.model.js';

const socketUserController = {};

socketUserController.saveUser = async (userName, phoneNumber, sid) => {
    let user = await SocketUser.findOne({ name: userName });

    if (!user) {
        user = new SocketUser({
            name: userName,
            socketUserPhone: phoneNumber,
            token: sid,
            socketIsAdmin: true,
        });
    }

    await SocketUser.create(user);
    return user;
};
socketUserController.isUser = async(userName, phoneNum)=>{
    let user = await SocketUser.findOne({ name: userName, socketUserPhone:phoneNum });
    if(user){
        return user
    }
    else{
        return false;
    }
}
socketUserController.updateToken = async(userName, phoneNum, sid)=>{
    await SocketUser.updateOne(
        { name: userName, socketUserPhone:phoneNum },
        {$set:{'token':sid}}
    )
    let user = await SocketUser.findOne({ name: userName, socketUserPhone:phoneNum });
    return user;

}
socketUserController.checkUserByToken=async(sid)=>{
    const user = await SocketUser.findOne({token:sid});
    if(!user) throw new Error('User not found');
    return user;
}
export default socketUserController;
