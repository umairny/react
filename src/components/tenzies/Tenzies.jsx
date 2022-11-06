import './Tenzies.css'
import React from "react"
import Die from "./comp/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function Tenzies() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [count, setCount] = React.useState(0)
    
    //Timer stop watch state
    const [timer, setTimer] = React.useState(0)
    const increment = React.useRef(null)
    
    //best  score state
    //get the store values
    var clicks = JSON.parse(localStorage.getItem("clicks"))
    var duration = JSON.parse(localStorage.getItem("time"))
    var bestUser = JSON.parse(localStorage.getItem("user"))
    const[best, setBest] = React.useState({
        clicks: clicks,
        totalTime: duration,
        user: ""
    })
    //console.log(clicks)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
        if (count === 0){
            setBest(pre =>({
                ...pre,
                user: ""
            }))
        }
        //Set the best score
        if (tenzies === true) {
            if(clicks === null){
                localStorage.setItem("clicks", JSON.stringify(count))
                localStorage.setItem("time", JSON.stringify(timer))
                localStorage.setItem("user", JSON.stringify(best.user))
                setBest({
                    clicks: count,
                    totalTime: timer,
                })

            }else if (clicks > count && duration > timer){
                localStorage.setItem("clicks", JSON.stringify(count))
                localStorage.setItem("time", JSON.stringify(timer))
                localStorage.setItem("user", JSON.stringify(best.user))
                setBest({
                    clicks: count,
                    totalTime: timer,
                })
            }
        }
    }, [dice, tenzies])
    //console.log(dice)
    //New die 
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    //all dice
    function allNewDice() {
        const newDice = []
            for (let i = 0; i < 10; i++) {
                newDice.push(generateNewDie())
            }
        return newDice
    }
    //Roll dice all
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            
            //Total number button clicked
            setCount(oldcount => oldcount + 1)
            
            //Start Timer
            if(count === 0){
                increment.current = setInterval(() => {
                setTimer((timer) => timer + 1)
                }, 1000)
            }
        } else {
            setTenzies(false)
            setDice(allNewDice())
            
            //num of click reset
            setCount(0)
            
            //timer reset
            clearInterval(increment.current)
            setTimer(0)
        }
    }

    //Hold dice position
    function holdDice(id) {
            setDice(oldDice => oldDice.map(die => {
                return die.id === id ? 
                    {...die, isHeld: !die.isHeld} :
                    die
            }))
    }
    
    //Dice Elements props
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))

    //format time H : M : S
    const formatTime = (x) => {
        const getSeconds = `0${(x % 60)}`.slice(-2)
        const minutes = `${Math.floor(x / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(x / 3600)}`.slice(-2)
    
        //Full Houre min sec return `${getHours} : ${getMinutes} : ${getSeconds}`
        //min and sec only
        return `min ${getMinutes} : ${getSeconds} sec`
    }

    //input change handle
    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setBest(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    //setting input 
    function handleSubmit(event) {
        event.preventDefault()
        //console.log(best.user)
        if(best.user === ""){
            alert("Enter your name")
        }else {
            rollDice()
        }
    }
    //Handle Clear Reset
    function clear() {
        setBest({
            clicks: 0,
            totalTime: 0,
            user: ""
        })
        localStorage.clear()
    }


    let btnText
    if (tenzies) {
        btnText = "New Game"
    } else if(count === 0) {
        btnText = "Start"
    }else {
        btnText = "Roll"
    }

    return (
        <main className="tenzies">
            {tenzies && <Confetti />}
            <h1 className="tenTitle">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            
            <p>Best score by :  <strong style={{color:'red'}}>{bestUser ? bestUser : ""}</strong>  <br />
            {clicks ? best.clicks : "0"} clicks in {duration ? (formatTime(best.totalTime)) : "0"}</p>
            
            <h4>Total clicks {count}
                <span style={{backgroundColor:'#5035FF',
                color:'white', borderRadius:'5px', padding:'5px', margin:'5px'}}>
                    in {tenzies && clearInterval(increment.current)}{formatTime(timer)}</span>
            </h4>
            
            <h4>Good Luck! <span style={{color:'red'}}> <em> {best.user && best.user} </em> </span></h4>
            
            <div className="dice-container">
                {(count > 0 && !tenzies) && diceElements}
            </div>
            
            {(count === 0) ? 
            <div className='form-input'>
                <label htmlFor="user">Enter Name</label>
                <input 
                    type="text"
                    name="user"
                    placeholder="Enter your name"
                    value={best.user ? best.user : ""}
                    onChange={handleChange}
                    required
                />
            <button className="roll-dice" onClick={handleSubmit}>
                    {btnText}
            </button>
            <button className="roll-dice" style={{backgroundColor: 'red', margin: '10px'}} onClick={clear}>Reset</button>
            </div>
            :
            <div>
            <button className="roll-dice" onClick={rollDice}>
                    {btnText}
            </button>
            </div>
            }


        </main>
    )
}