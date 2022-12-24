import "./quiz.css";
import topImg from "./images/topblobs.png";
import botImg from "./images/bottomblobs.png";
import Quizfetch from "./comp/Quizfetch";
import { useState } from "react";

export default function Quiz() {
  const [formData, setFormData] = useState({
    cate: 9,
    ques: 5,
    diffi: "easy",
  });
  const [start, setStart] = useState(false);
  const url = `https://opentdb.com/api.php?amount=${formData.ques}&category=${formData.cate}&difficulty=${formData.diffi}&type=multiple`;

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    //console.log(formData)
    setStart(true);
  }

  return (
    <div className="quiz-project">
      {!start ? (
        <div className="start">
          <img className="topRect" src={topImg} alt={topImg} />
          <img className="botRect" src={botImg} alt={botImg} />
          <div className="content">
            <h1>Quizzical</h1>
            <p>Test your knowledge</p>
            <form onSubmit={handleSubmit}>
              <label className="main-label">Category</label>
              <select
                id="cate"
                value={formData.cate}
                onChange={handleChange}
                name="cate"
              >
                <option value="9">General Knowladge</option>
                <option value="10">Entertainment: Book</option>
                <option value="11">Entertainment: Film</option>
                <option value="12">Entertainment: Music</option>
                <option value="17">Nature and science</option>
                <option value="18">Science: Computer</option>
                <option value="21">Sports</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="27">Animals</option>
              </select>
              <label className="main-label">Number of questions</label>
              <select
                id="ques"
                value={formData.ques}
                onChange={handleChange}
                name="ques"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
              <label className="main-label">Difficulty</label>
              <select
                id="diffi"
                value={formData.diffi}
                onChange={handleChange}
                name="diffi"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              <button className="but">Start quiz</button>
            </form>
          </div>
        </div>
      ) : (
        <Quizfetch url={url} start={start} totalScore={formData.ques} />
      )}
      <div className="power-by">
        Special thanks for data by:
        <a href="https://opentdb.com/"> Open Trivia DB</a>
      </div>
    </div>
  );
}
