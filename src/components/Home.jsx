import quizimg from '../../images/quiz.png'
import tenziesimg from '../../images/tenzies.png'
import notesimg from '../../images/notes.png'
import { Link } from 'react-router-dom'

export default function Home () {
    return(
        <div className="home">
            <div className="heading">
                <Link to="/mypf/quiz">
                    <img className='main-img' src={quizimg} alt={quizimg} />
                </Link>
                <Link to="/mypf/tenzies">
                    <img className='main-img' src={tenziesimg} alt={tenziesimg} />
                </Link>
                <Link to="/mypf/notes">
                    <img className='main-img' src={notesimg} alt={notesimg} />
                </Link>
            </div>
            <div className="heading">
                react JS
            </div>
        </div>
    )
}