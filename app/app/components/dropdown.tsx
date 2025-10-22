import type { ChangeEvent, JSX } from "react";
import { Badge, Form, FormGroup } from "react-bootstrap";
import type { Question } from "~/models/question";

const Dropdown = ({ question, answers, answerCallback }: { question: Question, answers: Record<string, any>[], answerCallback(data: Record<string, any>): void }): JSX.Element => {
  const selectionList = question.question_selections.map((questionSelection) => {
    return (<option key={questionSelection.id} value={questionSelection.id}>{questionSelection.question_text}</option>)
  })

  const onInputChange = (event: ChangeEvent) => {
    const data = {
      question_id: question.id,
      question_selection_id: Number((event.target as HTMLFormElement).value)
    }

    answerCallback(data)
  }

  return (
    <FormGroup>
      <Form.Label>{question.title}</Form.Label>
      { question.required && <Badge pill className="ml-3" bg="danger">
        Required
      </Badge>
      }
      <Form.Select className="mb-3" onChange={onInputChange} value={answers?.[0]?.question_selection_id}>
        <option disabled>Select an option</option>
        {selectionList}
      </Form.Select>
    </FormGroup>
  )
}

export default Dropdown