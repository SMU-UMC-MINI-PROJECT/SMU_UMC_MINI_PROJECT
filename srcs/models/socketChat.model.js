import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const SocketChatSchema = new Schema(
    {
        chat: String,
        user: {
            id: {
                type: Schema.ObjectId,
                ref: "socketUser",
            },
            name: String,
        },
    },
    { timestamps: true }  // corrected from "timestamp" to "timestamps"
);

export default model("SocketChat", SocketChatSchema);
