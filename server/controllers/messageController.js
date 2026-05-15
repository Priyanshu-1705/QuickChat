import Message from '../models/Message.js';
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { io, userSocketMap } from '../server.js';

// Get all users except the logged in user
export const getUsersForSidebar = async (req, res) => {
    try {
        const userId = req.user._id;
        const filterdUsers = await User.find({ _id: { $ne: userId } }).select("-password");

        // Count nummber of messages not seen
        const unseenMessages = {}
        const promises = filterdUsers.map(async (user) => {
            const messages = await Message.find({ senderId: userId, receiverId: user._id, seen: false})
            if(messages.length > 0){
                unseenMessages[user._id] = messages.length;
            }
        })    

        await Promise.all(promises);
        res.json({ Success: true, users: filterdUsers, unseenMessages });
       
    } catch (error) {
        console.log(error.message);
        res.json({ Success: false, message: error.message });
    }
}


// Get all messages for selected user
export const getMessages = async (req, res) => {
    try {
        const {id: selectedUserId} = req.params;
        const myId = req.user._id;
        
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: selectedUserId },
                { senderId: selectedUserId, receiverId: myId },
            ],
        });
        await Message.updateMany({
            senderId: myId,
            receiverId: selectedUserId,
        }, { seen: true });

        res.json({ Success: true, messages });
    } catch (error) {
        console.log(error.message);
        res.json({ Success: false, message: error.message });
    }
}


// api to mark message as seen using message id
export const markMessageAsSeen = async (req, res) => {
    try {
        const { id } = req.params;
        await Message.findByIdAndUpdate(id, { seen: true });
        res.json({ Success: true});
    } catch (error) {
        console.log(error.message);
        res.json({ Success: false, message: error.message });
    }
}

// Send message to selected user
export const sendMessage = async (req, res) => {
    try {
        const { text, image} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;
        let imageUrl;
        if(image){
            const upload = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })

        // Emit the new message to the receivers socket
        const receiverSocketId = userSocketMap[receiverId];
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        req.json({ Success: true, newMessage});
    } catch (error) {
        console.log(error.message);
        res.json({ Success: false, message: error.message });
    }
}