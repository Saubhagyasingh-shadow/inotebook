
import './App.css';
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from './context/notes/NoteState'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alert from './components/Alert';

function App() {
  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert message="this is amazing"/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/About" element={<About/>}></Route>
        </Routes>
        </div>
      </BrowserRouter>
      </NoteState>
    </>
  );
}



export default App;
