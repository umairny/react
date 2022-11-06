import { Link } from 'react-router-dom'

export default function Header () {
    return(
    <header>
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/quiz">Quizlet</Link>
				</li>
				<li>
					<Link to="/tenzies">Tenzies</Link>
				</li>
				<li>
					<Link to="/notes">Notes</Link>
				</li>
			</ul>
		</nav>
	</header>


    )
}

