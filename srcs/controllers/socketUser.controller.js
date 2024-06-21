import SocketUser from '../models/socketUser.model.js';

const socketUserController = {};

socketUserController.saveUser = async (userName, phoneNumber, sid) => {
    let user = await SocketUser.findOne({ socketUserName: userName });

    if (!user) {
        user = new SocketUser({
            socketUserName: userName,
            socketUserPhone: phoneNumber,
            token: sid,
            socketIsAdmin: true,
        });
    }

    await SocketUser.create(user);
    return user;
};
socketUserController.checkUser=async(sid)=>{
    const user = await SocketUser.findOne({token:sid})
    console.log('1111111', user);
    if(!user) throw new Error('User not found');
    return user;
}
export default socketUserController;
