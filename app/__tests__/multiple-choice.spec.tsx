// import react-testing methods
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
// the component to test
import MultipleChoice from '../app/components/multiple-choice';
import type { Question } from '~/models/question';

describe('MultipleChoice', () => {
  // Setup Mock
  const question: Question = {
    id: 1,
    title: 'Test',
    question_type: 'multiple_choice',
    question_selections: [
      {
        id: 1,
        question_id: 1,
        question_text: 'lorem',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ],
    required: true,
    created_at: new Date(),
    updated_at: new Date()
  }

  const answers: Record<string,any>[] = [
    {
      question_id: 1,
      answer: 'blah'
    }
  ]
  
  const submitAnswer = (data: Record<string, any>): void => {}

  it('render component', async () => {  
    // Render a React element into the DOM
    render(<MultipleChoice question={question} answers={answers} answerCallback={submitAnswer} />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})