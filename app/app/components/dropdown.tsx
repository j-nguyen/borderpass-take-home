import type { JSX } from "react";
import type { Question } from "~/models/question";

const Dropdown = ({ question }: { question: Question }): JSX.Element => {
  return (
    <div>
      <p>Hey, {question.title}.</p>
      <p>Dropdown</p>
    </div>
  )
}

export default Dropdown