import messages from '../data/Messages.js';
import OpenAI from 'openai';

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
const addMessage = async (req, res) => {
    const { user, text, imageUrl } = req.body;

    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Message text is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OPENAI_API_KEY not configured on server' });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    try {
        const moderation = await openai.moderations.create({
            model: 'omni-moderation-latest',
            input: text,
        });

        const result = moderation?.results?.[0];
        console.log('Moderation response:', JSON.stringify(moderation));
        if (result?.flagged) {
            // Try to generate a safe alternative phrasing to suggest to the user
            try {
                const suggestionResp = await openai.responses.create({
                    model: 'gpt-4o-mini',
                    input: `Please rewrite the following message to remove offensive or inappropriate content while preserving intent and tone. Respond with only the rewritten message.\n\nOriginal message: "${text}"\n\nConcise, non-offensive alternative:`,
                    max_output_tokens: 150,
                });

                // Try common response shapes
                let suggestion = undefined;
                if (suggestionResp.output && suggestionResp.output.length && suggestionResp.output[0].content) {
                    // flatten content parts
                    suggestion = suggestionResp.output[0].content.map(c => c.text || c?.markdown || '').join(' ').trim();
                }
                if (!suggestion && suggestionResp.output_text) suggestion = suggestionResp.output_text.trim();
                return res.status(400).json({ error: 'Message violates content policy', suggestion, details: result });
            } catch (err) {
                console.error('Suggestion generation failed:', err);
                return res.status(400).json({ error: 'Message violates content policy', details: err?.message || err });
            }
        }
    } catch (err) {
        console.error('Moderation check error:', err);
        return res.status(500).json({ error: 'Moderation check failed', details: err?.message || err });
    }

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
