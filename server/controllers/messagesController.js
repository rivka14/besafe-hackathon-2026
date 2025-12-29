import messages from '../data/Data.js';

// Get all messages
const getAllMessages = (req, res) => {
    res.status(200).json({ messages });
};

// Get a random message
const getRandomMessage = (req, res) => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    res.status(200).json(messages[randomIndex]);
};

// Get a single message
const getSingleMessage = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const message = messages.find(m => m.id === id);

    if (!message) {
        return res.status(404).json({ mssg: "Message not found" });
    }
    res.status(200).json({ message });
};

// Create a new message
const createMessage = (req, res) => {
    const { title, content } = req.body;
    const newMessage = {
        id: messages.length ? messages[messages.length - 1].id + 1 : 1,
        title,
        content,
        fallCount: 0,
    };
    messages.push(newMessage);
    res.status(201).json({ message: newMessage });
};

// Increment fall count when someone clicks the fake link
const incrementFallCount = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const idx = messages.findIndex(m => m.id === id);

    if (idx === -1) {
        return res.status(404).json({ mssg: 'Message not found' });
    }

    messages[idx].fallCount = (messages[idx].fallCount || 0) + 1;
    res.status(200).json({ message: messages[idx] });
};

export {
    getAllMessages,
    getRandomMessage,
    getSingleMessage,
    createMessage,
    incrementFallCount,
};
