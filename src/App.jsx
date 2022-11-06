import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Quiz from './components/Quiz/Quiz'
import Tenzies from './components/tenzies/Tenzies'
import Notes from './components/notes/Notes';
import { Routes, BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/mypf/' element={<Home />} />
          <Route exact path='/mypf/quiz' element={<Quiz />} />
          <Route exact path='/mypf/tenzies' element={<Tenzies />} />
          <Route exact path='/mypf/notes' element={<Notes />} />
        </Routes>
          
      </BrowserRouter>
    </div>
  )
}

export default App
