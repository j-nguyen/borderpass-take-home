import type { JSX } from "react";
import type { Question } from "~/models/question";

const Checkbox = ({ question }: { question: Question }): JSX.Element => {
  return (
    <div>
      <p>Hey, {question.title}.</p>
      <p>Checkbox</p>
    </div>
  )
}

export default Checkbox