import topImg from '../images/topblobs.png'
import botImg from '../images/bottomblobs.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function QuizStyle(props) {
    //console.log(props.data)
    const [formData, setFormData] = useState([])
    const [count, setCount] = useState(0)
    const [results, setResults] = useState(false)
    const [selecArr, setSelecArr] = useState([])

    const navigate = useNavigate()
    const refreshPage = () => {
        navigate(0);
    }

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
        //console.log(formData);
    }
    //Submit and view the results
    function handleSubmit(event) {
        event.preventDefault()
        // correct answers array
        var correct = props.data.map(c => c.cor)
        // console.log(formData)
        // console.log(correct)
        //coming form input array
        var newArr = []
        for (const key in formData) {
            const value = formData[key]
            newArr.push(value)
        }
        //console.log(newArr)
        //console.log(correct)
        //Compare array
        var inter = newArr.filter(function (e) {
            return correct.indexOf(e) > -1;
        });
        //console.log(inter);
        setSelecArr(inter)
        setCount(inter.length)
        setResults(true)
    }

    function tryagain(event) {
        event.preventDefault()
        refreshPage()
    }

    return (
        <div className="quiz">
            <img className='topRectQuiz' src={topImg} alt={topImg} />
            <img className='botRectQuiz' src={botImg} alt={botImg} />

            <form className='qBox' onSubmit={results ? tryagain : handleSubmit}>
                {props.data.map((item, index) => (
                    <div key={index}>
                        <div className='question'>
                            <h4 dangerouslySetInnerHTML={{ __html: item.que }}></h4>
                            <div className="radio-toolbar">
                                {item.ans.map((ans, i) => (
                                    <div className='rad-input' key={i}>
                                        <input
                                            type="radio"
                                            id={`${ans}-${item.id}`}
                                            name={item.id}
                                            value={ans}
                                            disabled={results && true}
                                            onChange={handleChange}
                                        />
                                        <label className='rad-label' htmlFor={`${ans}-${item.id}`} dangerouslySetInnerHTML={{ __html: ans }}></label>
                                    </div>
                                ))}

                                {results && <div className='correct'>
                                    {
                                        selecArr.includes(`${item.cor}`)
                                            ?
                                            (<div className="good">&#x2714; <span dangerouslySetInnerHTML={{ __html: item.cor }}></span></div>)
                                            :
                                            (<div className="bad">&#x2716; <span dangerouslySetInnerHTML={{ __html: item.cor }}></span></div>)
                                    }
                                </div>
                                }

                            </div>
                        </div>
                        <hr />
                    </div>
                ))}
                {results ? <>
                    <button className='subBut'>Try again</button>
                </>
                    :
                    <button className='subBut'>Submit</button>
                }
            </form>
            {results && <div className='score'>{count} correct out of {props.total} --- {(count / props.total) * 100}%</div>}
        </div>

    )
}