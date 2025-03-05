
import './App.css';
import Login from './components/Login';
import { UserProvider } from './context/UserContext'; // Import UserProvider

function App() {

  return (
    <UserProvider> {/* Wrap the application with UserProvider */}
      <div className="App">
        <Login /> 
      </div>
    </UserProvider>
  );
}

export default App;
