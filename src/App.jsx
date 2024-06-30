import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import ContextProvider from './context/Context'; // Default import
import { SpeechRecognitionProvider } from './context/SpeechRecognitionContext'; // Named import

const App = () => {
  return (
    <ContextProvider>
      <SpeechRecognitionProvider>
        <Sidebar />
        <Main />
      </SpeechRecognitionProvider>
    </ContextProvider>
  );
};

export default App;
