import type { JSX } from "react";
import type { Question } from "~/models/question";

const LongAnswer = ({ question }: { question: Question }): JSX.Element => {
  return (
    <div>
      <p>Hey, {question.title}.</p>
      <p>LongAnswer</p>
    </div>
  )
}

export default LongAnswer