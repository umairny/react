import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Quiz from './components/Quiz/Quiz'
import Tenzies from './components/tenzies/Tenzies'
import Notes from './components/notes/Notes';
import { Routes, HashRouter, Route } from "react-router-dom";

function App() {
  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/quiz' element={<Quiz />} />
          <Route exact path='/tenzies' element={<Tenzies />} />
          <Route exact path='/notes' element={<Notes />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
