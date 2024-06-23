import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const SocketChatSchema = new Schema(
    {
        chat: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'socketUser',
        },
    },
    { timestamps: true }  // corrected from "timestamp" to "timestamps"
);

export default model("SocketChat", SocketChatSchema);
