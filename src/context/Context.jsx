import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import runChat from '../config/gemini';
import { ThemeProvider } from './ThemeContext';
import { SpeechRecognitionProvider } from './SpeechRecognitionContext';

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');

    const onSent = async (prompt) => {
        setResultData('');
        setLoading(true);
        setShowResult(true);
        let response;

        if (prompt !== undefined) {
            setPrevPrompts(prev => [...prev, prompt]);
            setRecentPrompt(prompt);
            response = await runChat(prompt);
        } else {
            if (input.trim() !== '') {
                setRecentPrompt(input);
                response = await runChat(input);
                setPrevPrompts(prev => [...prev, input]);
            }
        }

        let responseArray = response.split('**');
        let newArray = '';
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newArray += responseArray[i];
            } else {
                newArray += '<b>' + responseArray[i] + '</b>';
            }
        }
        responseArray = newArray.split('*').join('</br>').split(' ');
        for (let i = 0; i < responseArray.length; i++) {
            const nextWord = responseArray[i];
            delayPara(i, nextWord + ' ');
        }
        setLoading(false);
        setInput('');
    };

    const newChat = async () => {
        setLoading(false);
        setShowResult(false);
    };

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
    };

    return (
        <ThemeProvider>
            <SpeechRecognitionProvider>
                <Context.Provider value={contextValue}>
                    {children}
                </Context.Provider>
            </SpeechRecognitionProvider>
        </ThemeProvider>
    );
};

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ContextProvider;
