import quizimg from "../../images/quiz.png";
import tenziesimg from "../../images/tenzies.png";
import notesimg from "../../images/notes.png";
import { Link } from "react-router-dom";
import "./Home.css";
import "./HomeAnim.css";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [yscroll, setYscroll] = useState();
  const [ymov, setYmov] = useState();
  const [projects, setProjects] = useState({
    proj1: 0,
    proj2: 0,
    proj3: 0,
    end: 0,
  });
  const project1 = useRef();
  const project2 = useRef();
  const project3 = useRef();
  const end = useRef();
  useEffect(() => {
    const handleScroll = (event) => {
      setYscroll(window.scrollY);
      setProjects({
        proj1: project1.current.offsetTop,
        proj2: project2.current.offsetTop,
        proj3: project3.current.offsetTop,
        end: end.current.offsetTop,
      });
      //console.log("window.scrollY", window.scrollY);
      //console.log("ref", project1.current.offsetTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const mov = (n, t) => {
    return (n / t) * 100;
  };
  console.log(mov(yscroll, projects.proj2));
  console.log(ymov);

  return (
    <div className="home">
      <div className="bar">
        <div
          style={{
            backgroundColor: "gray",
            height: "100%",
            transform: `translate(${mov(yscroll, projects.end)}%)`,
          }}
        ></div>
      </div>

      <div ref={project1} className="heading">
        <div className="text">
          <h2>Quizzical App</h2>
          <p>
            I created the Quizzical App because I wanted to have a way to show
            off my portfolio in a fun and interactive way. The app features a
            quiz that tests your knowledge. I think it's a great way for
            potential employers to see what I know and what I can do. Plus, it's
            just really fun!
          </p>
          <h3>Features:</h3>
          <ol>
            <li>
              On the landing page you can <strong>select</strong>
              <ol type="a">
                <li>Category</li>
                <li>Total number of questions</li>
                <li>Difficulty level</li>
              </ol>
            </li>
            <li>The start quiz button will take you to the quiz page.</li>
            <li>
              After selecting the choices you think are correct click submit.
            </li>
            <li>
              After submit you can see correct(green) and wrong(red) answers.
            </li>
            <li>
              After submitting on the bottom right corner of the app, your score
              will be displayed.
            </li>
            <li>
              Submit button changed to try again button. Click try agian button
              to go back to landing page.
            </li>
          </ol>
          <h3>Technical features:</h3>
          <h4>Landing Page</h4>
          <ol>
            <li>
              Created a useState hook with 3 variables. Category, Number of
              Questions and Difficulty
            </li>
            <li>
              Input of these variables is taken from the HTML selected tag input
              value.
            </li>
            <li>
              Put these variables values into the url(open trivia db) to fetch
              the questions.
            </li>
            <li>The Start Quiz button takes the app to fetch components.</li>
          </ol>
          <h4>Fetch data component</h4>
          <ol>
            <li>It fetches the data from the api.</li>
            <li>It converts the fetched data into a useable format.</li>
            <li>Converted data is pushed into a new array for easy to use.</li>
            <li>
              It passes props to the next component. 1. data, 2. loading, 3,
              error
            </li>
          </ol>
          <h4>Final page</h4>
          <ol>
            <li>This page receives the props from the fetch component.</li>
            <li>If the loading is false and there is no error.</li>
            <li>It is to iterate over the data for questions and answers.</li>
            <li>
              This page is responsible for showing the questions and choice
              answers.
            </li>
            <li>
              On this page you can select the choices which are created with
              radio input tag.
            </li>
            <li>
              Input tag value data is submitted to handle the Submit function
              where it evaluates the correct answers and score.
            </li>
            <li>
              After evaluating the correct answers and scoring, it passes them
              into use state variables.
            </li>
            <li>
              From there, I am able to get the values of variables and show the
              score on the page.
            </li>
            <li>
              Finally, submit button, convert to the Try again button, which
              will use Navigate hook to take you back to the landing page.
            </li>
          </ol>
          <Link className="main-btns" to="/quiz">
            Quizzical
          </Link>
        </div>
        <div className="image-div">
          <Link to="/quiz">
            <img className="main-img" src={quizimg} alt={quizimg} />
          </Link>
        </div>
      </div>
      <div ref={project2} className="heading">
        <div className="text">
          <h2>Tenzies Game</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            delectus aliquid obcaecati, libero optio, placeat repellat inventore
            corporis et eaque quis, sit eligendi facere. Delectus nulla illo
            quaerat ab ipsa!
          </p>
          <Link to="/tenzies">Tenzies</Link>
        </div>
        <div className="image-div">
          <Link to="/tenzies">
            <img className="main-img" src={tenziesimg} alt={tenziesimg} />
          </Link>
        </div>
      </div>
      <div ref={project3} className="heading">
        <div className="text">
          <h2>Notes App</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            delectus aliquid obcaecati, libero optio, placeat repellat inventore
            corporis et eaque quis, sit eligendi facere. Delectus nulla illo
            quaerat ab ipsa!
          </p>
          <Link to="/notes">Notes</Link>
        </div>
        <Link to="/notes">
          <img className="main-img" src={notesimg} alt={notesimg} />
        </Link>
        <div ref={end}></div>
      </div>
    </div>
  );
}
