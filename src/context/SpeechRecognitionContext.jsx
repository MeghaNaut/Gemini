import  { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const SpeechRecognitionContext = createContext();

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const isSpeechRecognitionAvailable = !!SpeechRecognition;

export const SpeechRecognitionProvider = ({ children }) => {
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState('');

    useEffect(() => {
        if (!isSpeechRecognitionAvailable) {
            console.warn('Speech recognition is not available in this browser.');
        
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
            const lastResult = event.results[event.results.length - 1];
            if (lastResult.isFinal) {
                setTranscript(lastResult[0].transcript);
                setListening(false);
            }
        };

        recognition.onerror = () => {
            setListening(false);
        
        };

        if (listening) {
            recognition.start();
        } else {
            recognition.stop();
        }

        return () => {
            recognition.stop();
        };
    }, [listening]);

    return (
        <SpeechRecognitionContext.Provider value={{ listening, setListening, transcript, isSpeechRecognitionAvailable }}>
            {children}
        </SpeechRecognitionContext.Provider>
    );
};

SpeechRecognitionProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
