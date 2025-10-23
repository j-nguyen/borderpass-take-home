import { FormGroup, Form, Badge } from "react-bootstrap";
import { useState, type ChangeEvent, type JSX } from "react";
import type { Question } from "~/models/question";

const Checkbox = ({ question, answers, answerCallback }: { question: Question, answers: Record<string, any>[], answerCallback(data: Record<string, any>, isCheckbox: boolean): void }): JSX.Element => {
  // pre-initialize the arrays 
  const [checkedAnswers, setCheckedAnswers] = useState<boolean[]>(new Array(question.question_selections!.length).fill(false))

  function isChecked(questionSelectionId: number): boolean {
    return answers?.some(ans => ans.question_selection_id === questionSelectionId) ?? false
  }

  const checkboxes = question.question_selections!.map((questionSelection, index) => {
    return (
      <div key={`checkbox-${questionSelection.id}`} className="mt-3">
        <Form.Check 
          type="checkbox"
          label={questionSelection.question_text}
          id={`id-${questionSelection.id}`} 
          checked={isChecked(questionSelection.id)}
          value={questionSelection.id}
          onChange={() => updateCheckboxes(index)} />
      </div>
    )
  })

  function updateCheckboxes(index: number) {
    const updatedCheckState = checkedAnswers.map((item, i) => {
      if (i === index) {
        return !item
      }
      return item
    })

    const data = updatedCheckState.map((item, index) => {
      if (!item) return null

      return {
        question_id: question.id,
        question_selection_id: question.question_selections![index].id
      }
    }).filter(d => d !== null)

    setCheckedAnswers(updatedCheckState)
    answerCallback(data, true)
  }

  return (
    <FormGroup className="mb-3">
      <Form.Label>{question.title}</Form.Label>
      { question.required && <Badge pill className="ml-3" bg="danger">
        Required
      </Badge>
      }
      {checkboxes}
    </FormGroup>
  )
}

export default Checkbox