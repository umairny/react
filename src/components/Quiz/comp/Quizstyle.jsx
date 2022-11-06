import topImg from '../images/topblobs.png'
import botImg from '../images/bottomblobs.png'
import { useState } from 'react'

export default function QuizStyle (props) {
    //console.log(props)
    const [formData, setFormData] = useState([])
    const [count, setCount] = useState(0)
    const [results, setResults] = useState(false)
    const [selecArr, setSelecArr] =useState([])
    //console.log(selecArr)

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    //Submit and view the results
    function handleSubmit(event) {
        event.preventDefault()
        //console.log(formData)
        // correct answers array
        var correct = props.data.map(c => c.cor)
        //coming form input array
        var newArr = []
        for (const key in formData) {
            const value = formData[key]
            newArr.push(value)
        }
        //console.log(newArr)
        //console.log(correct)
        //Compare array
        var inter = newArr.filter(function(e) {
            return correct.indexOf(e) > -1;
        });
        //console.log(inter);
        setSelecArr(inter)
        setCount(inter.length)
        setResults(true)
    }

    function tryagain (event){
        event.preventDefault()
        setResults(false)
        setFormData([])
        {props.start === false}
    }

    return(
        <div className="quiz">
            <img className='topRectQuiz' src={topImg} alt={topImg} />
            <img className='botRectQuiz' src={botImg} alt={botImg} />

            <form className='qBox' onSubmit={results ? tryagain : handleSubmit}>
                {props.data.map((item) => (
                    <div key={item.id}>
                        <div className='question'>
                            <h4 dangerouslySetInnerHTML={{__html: item.que }}></h4>
                            <div className="radio-toolbar">
                                {item.ans.map((ans) => (
                                    <div className='rad-input' key={ans}>
                                        <input 
                                            type="radio"
                                            id={ans}
                                            name={item.id}
                                            value={ans}
                                            onChange={handleChange}
                                            disabled={results && true}
                                        />
                                        <label className='rad-label' htmlFor={ans} dangerouslySetInnerHTML={{__html: ans }}></label>
                                    </div>
                                ))}

                                {results && <div className='correct'>
                                    { 
                                        selecArr.includes(`${item.cor}`)
                                        ? 
                                        (<div className="good">&#x2714; <span dangerouslySetInnerHTML={{__html: item.cor }}></span></div>)
                                        :
                                        (<div className="bad">&#x2716; <span dangerouslySetInnerHTML={{__html: item.cor }}></span></div>)
                                    }
                                </div>
                                }
                            </div>
                        </div>
                        <hr />
                    </div>
                ))}
                {results ? <button className='subBut'>Try again</button> : <button className='subBut'>Submit</button>}
            </form>

            {results && <div className='score'>Score is {count}/{props.total} and {(count/props.total)*100}%</div>}
        </div>

    )
}