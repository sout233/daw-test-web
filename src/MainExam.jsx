import { useEffect, useState } from "react";
import Question from "./Question";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useRef } from "react";
import QuestionList from "./ConstData";

function MainExam() {
  const [questions, setQuestions] = useState(null);

  let history = useHistory();

  function changeRating({ index, value }) {
    // questions[index]["value"] = value;
    // console.log(questions[index])
  }

  const questionListRef = useRef(null);

  useEffect(() => {
    // fetch('/questions.json')
    //     .then(res => res.json())
    //     .then(data => console.log(data[questions]))
    //     .then(() => console.log(questions))
    //     .catch(err => console.log(err));

    setQuestions(QuestionList["questions"]);
  }, []);

  function submitButtonClick() {
    let qs = questionListRef.current.childNodes;
    let result = {};

    for (let i = 0; i < qs.length; i++) {
      let qValue =
        qs[i].getElementsByClassName("range")[0].attributes["data"].value;
      qValue = (qValue * 2 - 100) / 50;
      questions[i]["influence"].forEach((inf) => {
        let key = Object.keys(inf)[0];
        let value = Object.values(inf)[0];
        value *= qValue;

        if (result[key] === undefined) {
          result[key] = 0;
        }

        result[key] += value;
      });
    }

    console.log(result);

    let values = Object.values(result);
    if (allZeros(values)) {
      history.push("/damn/null");
    } else {
      history.push("/result/" + encodeURI(window.btoa(JSON.stringify(result))));
    }

    result = {};
  }
  let values = Object.values(result);

  let [canSubmit, setCanSubmit] = useState(false);

  setCanSubmit(allZeros(values));


  function allZeros(array) {
    return array.every(function (value) {
      return value === 0;
    });
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center h-28 bg-primary">
        <h1 className="text-2xl text-primary-content font-bold">测试环节</h1>
        <h1 className="text-primary-content mt-2">
          共20道题，请根据实际情况作答
        </h1>
      </div>
      <div className="h-4"></div>
      <div className="flex flex-col justify-center items-center">
        <div className="m-4 space-y-14 max-w-xl items-center p-4 bg-base-200 rounded-lg shadow-lg">
          <div ref={questionListRef}>
            {questions &&
              questions.map((question, index) => (
                <Question
                  key={question.question}
                  title={question.question}
                  index={index}
                  changeRating={changeRating}
                ></Question>
              ))}
          </div>
          <button
            className="btn w-full px-10 btn-primary"
            onClick={submitButtonClick}
            disabled={canSubmit}
          >
            OK! 我好了
          </button>
        </div>
        <div className="h-4"></div>
      </div>
    </>
  );
}

export default MainExam;
