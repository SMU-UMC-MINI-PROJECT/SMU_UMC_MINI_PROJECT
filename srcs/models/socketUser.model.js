import mongoose from 'mongoose';

const SocketUserSchema = mongoose.Schema(
  {
    // 유저 나중에 연결해줄 것
    // author: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'user',
    //   require: true,
    // },

    name: {
      type: String,
      required: [true, '성함을 입력해주세요'],
    },
    socketUserPhone: {
      type: String,
      required: [true, '전화번호를 입력해주세요'],
    },
    socketIsAdmin:{
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

SocketUserSchema.set('toObject', { virtuals: true });
SocketUserSchema.set('toJSON', { virtuals: true });


export default mongoose.model('SocketUser', SocketUserSchema);
