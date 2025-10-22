import type { ChangeEvent, JSX } from "react";
import { Badge, Form, FormGroup } from "react-bootstrap";
import type { Question } from "~/models/question";

const ShortAnswer = ({ question, answers, answerCallback }: { question: Question, answers: Record<string, any>[], answerCallback(data: Record<string, any>): void }): JSX.Element => {
  const onInputChange = (event: ChangeEvent) => {
    const data = {
      question_id: question.id,
      answer: (event.target as HTMLFormElement).value as string,
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
      <Form.Control type="text" value={answers?.[0]?.answer} onChange={onInputChange} className="mb-3" />
    </FormGroup>
  )
}

export default ShortAnswer