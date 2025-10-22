import type { JSX } from "react";
import type { Question } from "~/models/question";

const ShortAnswer = ({ question }: { question: Question }): JSX.Element => {
  return (
    <div>
      <p>Hey, {question.title}.</p>
      <p>ShortAnswer</p>
    </div>
  )
}

export default ShortAnswer