import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

export default function Header () {
	const [toggle, setToggle] = useState(false)
	//console.log(toggle)
	const location = useLocation()
	//console.log(location.pathname)
	function animate(x){
		x.classList.toggle("animate")
	}
    return(
		<nav className='navbar'>
			<div className='nav-cont'>
				<div onClick={() => setToggle(false)} className='nav-logo'>
					<Link className={location.pathname === "/" ? "active" : ""} to="/">Projects</Link>
				</div>
				<div className={toggle === true ? 'menu show' : 'menu hide'}>
					<Link onClick={() => setToggle(false)} className={location.pathname === "/quiz" ? "active" : ""} to="/quiz">Quizlet</Link>
					<Link onClick={() => setToggle(false)} className={location.pathname === "/tenzies" ? "active" : ""} to="/tenzies">Tenzies</Link>
					<Link onClick={() => setToggle(false)} className={location.pathname === "/notes" ? "active" : ""} to="/notes">Notes</Link>
				</div>
				<div onClick={() => setToggle(!toggle)} className={toggle === true ? 'toggle-btn animate' : 'toggle-btn'}>
					<div className='bar1'></div>
					<div className='bar2'></div>
					<div className='bar3'></div>
				</div>


			</div>
		</nav>
    )
}

