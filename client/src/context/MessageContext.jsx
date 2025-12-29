import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState(null);

    const getRandomMessage = async () => {
        try {
            const response = await api.get('/messages/random');
            // server returns the message object directly
            setMessage(response.data);
        } catch (error) {
            console.error('Error fetching the random message:', error);
        }
    };

    useEffect(() => {
        queueMicrotask(() => {
            getRandomMessage();
        });
    }, []);

    return (
        <MessageContext.Provider value={{ message, getRandomMessage }}>
            {children}
        </MessageContext.Provider>
    );
};
MessageProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { MessageContext, MessageProvider };
