import { useEffect, useState } from "react";
import QuizStyle from "./Quizstyle";
import ShowError from "./ShowError";
import Loading from "./Loading";
import { nanoid } from "nanoid";

export default function Quizfetch(props) {
  //console.log(props.url)
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(props.url)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.results)
        setData(data.results);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setIsLoaded(true);
      });
  }, []);

  // This fuction takes the fetched data and
  // convert it into some reuseable data because
  // fetched data has more information and have
  // 3 rong and 1 correct answer
  function newData() {
    var newAns = [];
    for (let i = 0; i < data.length; i++) {
      let que = data.map((q) => q.question);
      let ans = data.map((q) => q.incorrect_answers.map((a) => a));
      let cor = data.map((c) => c.correct_answer);
      var RandNum = Math.floor(Math.random() * 4);
      ans[i].splice(RandNum, 0, cor[i]);

      newAns.push({ id: nanoid(), que: que[i], cor: cor[i], ans: ans[i] });
      //ans[i].push(cor[i])
      //console.log(ans[i])
      //console.log(cor[i], RandNum)
    }
    return newAns;
  }
  //console.log(newData())

  if (error) {
    return <ShowError err={error} />;
  } else if (!isLoaded) {
    return <Loading loading={isLoaded} />;
  } else {
    return <QuizStyle data={newData()} total={props.totalScore} />;
  }
}
