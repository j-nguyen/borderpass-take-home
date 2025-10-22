import type { ChangeEvent, JSX } from "react";
import { FormGroup, Form, Badge } from "react-bootstrap";
import type { Question } from "~/models/question";

const MultipleChoice = ({ question, answers, answerCallback }: { question: Question, answers: Record<string, any>[], answerCallback(data: Record<string, any>): void }): JSX.Element => {
  const onInputChange = (event: ChangeEvent) => {
    const data = {
      question_id: question.id,
      question_selection_id: Number((event.target as HTMLFormElement).value)
    }
    answerCallback(data)
  }

  const radioes = question.question_selections.map((questionSelection) => {
    return (
      <div key={`checkbox-${questionSelection.id}`} className="mt-3">
        <Form.Check 
          type="radio"
          label={questionSelection.question_text}
          id={`id-${questionSelection.id}`}
          name={`checkbox-${question.id}`}
          value={questionSelection.id}
          checked={ answers?.[0]?.question_selection_id === questionSelection.id }
          onChange={onInputChange} />
      </div>
    )
  })

  return (
    <FormGroup className="mb-3">
      <Form.Label>{question.title}.</Form.Label>
      { question.required && <Badge pill className="ml-3" bg="danger">
        Required
      </Badge>
      }
      {radioes}
    </FormGroup>
  )
}

export default MultipleChoice