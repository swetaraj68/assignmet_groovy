import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from "./Component/Home/Home"
import Login from "./Component/Login/Login"
import SignUp from "./Component/SignUp/SignUp"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>

    </div>
  );
}

export default App;
