import  { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import { ThemeContext } from '../../context/ThemeContext';
import { GiHamburgerMenu } from "react-icons/gi";

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const loadPrompt = async (prompt) => {
        await onSent(prompt);
        setRecentPrompt(prompt);
    };

    return (
        <div className={`sidebar ${theme === 'dark' ? 'dark-theme' : ''}`}>
            <div className="top">
           <div><GiHamburgerMenu className="menu"  onClick={() => setExtended(prev => !prev)}/></div> 
                
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended && (
                    <div className="recent">
                        <p className='recent-title'>Recent</p>
                        {prevPrompts.map((item, index) => (
                            <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                                <img src={assets.message_icon} alt="" />
                                <p>{item.slice(0, 18)} {"..."}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended && (
                        <div className="theme-toggle">
                            <label className="switch">
                                <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
                                <span className="slider round"></span>
                            </label>
                            <span className="theme-label">{theme === 'dark' ? 'Dark Theme' : 'Light Theme'}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
