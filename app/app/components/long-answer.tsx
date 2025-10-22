import type { ChangeEvent, JSX } from "react";
import { Badge, Form, FormGroup } from "react-bootstrap";
import type { Question } from "~/models/question";

const LongAnswer = ({ question, answers, answerCallback }: { question: Question, answers: Record<string, any>, answerCallback(data: Record<string, any>): void }): JSX.Element => {
  const onInputChange = (event: ChangeEvent) => {
    const data = {
      question_id: question.id,
      answer: (event.target as HTMLFormElement).value
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
      <Form.Control as="textarea" value={answers?.[0]?.answer} rows={3} onChange={onInputChange} className="mb-3" />
    </FormGroup>
  )
}

export default LongAnswer