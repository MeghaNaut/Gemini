import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import { ThemeContext } from '../../context/ThemeContext';
import { SpeechRecognitionContext } from '../../context/SpeechRecognitionContext';

const Main = () => {
    const {
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        input
    } = useContext(Context);

    const { theme } = useContext(ThemeContext);
    const { listening, setListening, transcript, isSpeechRecognitionAvailable } = useContext(SpeechRecognitionContext);

    useEffect(() => {
        if (transcript) {
            setInput(transcript);
        }
    }, [transcript, setInput]);

    return (
        <div className={`main ${theme === 'dark' ? 'dark-theme' : ''}`}>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {showResult ? (
                    <div className="result">
                        <div className='result-title'>
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? (
                                <div className="loader">
                                    <hr className="animated-bg" />
                                    <hr className="animated-bg" />
                                    <hr className="animated-bg" />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="greet">
                            <p><span>Hello, Friends.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards" >
                            <div className="card" onClick={() => onSent('Suggest beautiful places to see on an upcoming road trip')}>
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => onSent('Briefly summarize this concept: urban planning')}>
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => onSent('Brainstorm team bonding activities for our work retreat')}>
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => onSent('Teach React js to us')}>
                                <p>Teach React js to us</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder='Enter a prompt here'
                        />
                        <div>
                            {isSpeechRecognitionAvailable && (
                                <img
                                    src={assets.mic_icon}
                                    width={30}
                                    alt=""
                                    onClick={() => setListening(!listening)}
                                    style={{ cursor: 'pointer', color: listening ? 'red' : 'black' }}
                                />
                            )}
                            {input && <img onClick={() => onSent()} src={assets.send_icon} width={30} alt="" />}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    );
};

Main.propTypes = {
    onSent: PropTypes.func,
    recentPrompt: PropTypes.string,
    showResult: PropTypes.bool,
    loading: PropTypes.bool,
    resultData: PropTypes.string,
    setInput: PropTypes.func,
    input: PropTypes.string
};

export default Main;
