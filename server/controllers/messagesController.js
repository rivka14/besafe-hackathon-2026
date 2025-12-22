import messages from '../data/Messages.js';

// Get all messages
const getAllMessages = (req, res) => {
    res.status(200).json({ messages });
};


// // Get a single duck
// const getSingleDuck = (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     const duck = ducks.find(d => d.id === id);

//     if (!duck) {
//         return res.status(404).json({ mssg: "Duck not found" });
//     }
//     res.status(200).json({ duck });
// };

// Add a new message to chat history
const addMessage = (req, res) => {
    const { user, text, imageUrl } = req.body;
    const newMessage = {
        id: messages.length ? messages[messages.length - 1].id + 1 : 1,
        user,
        text,
        imageUrl
    };
    messages.push(newMessage);
    res.status(201).json({ message: newMessage });
};

// // Delete a duck
// const deleteDuck = (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     const duckIndex = ducks.findIndex(d => d.id === id);

//     if (duckIndex === -1) {
//         return res.status(404).json({ mssg: "Duck not found" });
//     }

//     const [deletedDuck] = ducks.splice(duckIndex, 1);
//     res.status(200).json({ duck: deletedDuck });
// };

// // Update a duck
// const updateDuck = (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     const duckIndex = ducks.findIndex(d => d.id === id);

//     if (duckIndex === -1) {
//         return res.status(404).json({ mssg: "Duck not found" });
//     }

//     const updatedDuck = { ...ducks[duckIndex], ...req.body };
//     ducks[duckIndex] = updatedDuck;
//     res.status(200).json({ duck: updatedDuck });
// };

export {
    getAllMessages,
    // getRandomDuck,
    // getSingleDuck,
    addMessage,
    // deleteDuck,
    // updateDuck
};
