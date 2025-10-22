import type { JSX } from "react";
import type { Question } from "~/models/question";

const MultipleChoice = ({ question }: { question: Question }): JSX.Element => {
  return (
    <div>
      <p>Hey, {question.title}.</p>
      <p>MultipleChoice</p>
    </div>
  )
}

export default MultipleChoice