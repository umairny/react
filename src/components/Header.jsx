import { Link } from 'react-router-dom'

export default function Header () {
    return(
    <header>
		<nav>
			<ul>
				<li>
					<Link to="/mypf/">Home</Link>
				</li>
				<li>
					<Link to="/mypf/quiz">Quizlet</Link>
				</li>
				<li>
					<Link to="/mypf/tenzies">Tenzies</Link>
				</li>
				<li>
					<Link to="/mypf/notes">Notes</Link>
				</li>
			</ul>
		</nav>
	</header>


    )
}

