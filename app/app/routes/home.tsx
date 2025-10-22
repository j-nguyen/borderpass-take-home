import React, { useState, useEffect, type ChangeEvent } from "react";
import { Col, Row, Container, Button, Card, Form, Alert } from "react-bootstrap";
// Models
import type { Route } from "./+types/home";
import type { Question } from "~/models/question";
import type { User } from "~/models/user";
// Custom Components
import Dropdown from "~/components/dropdown.tsx";
import ShortAnswer from "~/components/short-answer";
import LongAnswer from "~/components/long-answer";
import Checkbox from "~/components/checkbox";
import MultipleChoice from "~/components/multiple-choice";

// Meta header tags
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Questionnaire App" },
  ];
}

interface QuestionProps {
  questions: Question[]
  answers: Record<string, any>[]
  activeIndex: number
  submitButtonDisabled: boolean
  submitAnswer(data: Record<string, any>): void
  prevButtonClick(): void
  nextButtonClick(): void
  submitClick(event: React.FormEvent<HTMLFormElement>): Promise<void>
}

interface LoginProps {
  email: string
  onEmailChange(event: ChangeEvent): void
  submitClick(event: React.FormEvent<HTMLFormElement>): Promise<void>
}

// Function Components

function QuestionForm({ questions, answers, submitAnswer, activeIndex, submitButtonDisabled, prevButtonClick, nextButtonClick, submitClick }: QuestionProps) {
  return (
    <div>
      <h4>Question {activeIndex + 1}</h4>

      <Form onSubmit={submitClick}>
        <CurrentQuestion question={questions[activeIndex]} answers={answers[activeIndex]?.answers} submitAnswer={submitAnswer} />
        
        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={prevButtonClick} type="button">Previous</Button>
          <div className="d-flex gap-2">
            <Button variant="primary" onClick={nextButtonClick} type="button">Next</Button>
            <Button variant="primary" type="submit" disabled={submitButtonDisabled}>Submit</Button>
          </div>
        </div>
      </Form>
    </div>
  )
}

function CurrentQuestion({ question, answers, submitAnswer }: { question: Question, answers: Record<string, any>[], submitAnswer(data: Record<string, any>): void }) {
  if (!question) return null

  if (question.question_type === 'dropdown') {
    return (<Dropdown question={question} answers={answers} answerCallback={submitAnswer} />)
  } else if (question.question_type === 'short_answer') {
    return (<ShortAnswer question={question} answers={answers} answerCallback={submitAnswer} />)
  } else if (question.question_type === 'long_answer') {
    return (<LongAnswer question={question} answers={answers} answerCallback={submitAnswer} />)
  } else if (question.question_type === 'checkbox') {
    return (<Checkbox question={question} answers={answers} answerCallback={submitAnswer} />)
  } else if (question.question_type === 'multiple_choice') {
    return (<MultipleChoice question={question} answers={answers} answerCallback={submitAnswer} />)
  }
}

function Login({ submitClick, email, onEmailChange }: LoginProps) {
  return (
    <Form onSubmit={submitClick}>
      <Form.Label>
        Enter Your Email To Get Started
      </Form.Label>
      <Form.Control type="email" value={email} onChange={onEmailChange} placeholder="name@example.com" required />

      <Button variant="primary" type="submit" className="mt-3">
        Submit
      </Button>
    </Form>
  )
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <Alert variant="danger">
      <Alert.Heading>Error Occurred:</Alert.Heading>
      <p>{message}</p>
    </Alert>
  )
}

function SuccessBanner({ message }: { message: string }) {
  return (
    <Alert variant="success">
      <Alert.Heading>Success:</Alert.Heading>
      <p>{message}</p>
    </Alert>
  )
}

// Export Rendering
export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  // Forms
  const [questionAnswers, setQuestionAnswers] = useState<Record<string, any>[]>([])
  const [email, setEmail] = useState<string>('')
  const [user, setUser] = useState<User | null>(null)

  // Methods
  const fetchQuestions = async() => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/questions`)
      const json = await response.json()
      setQuestions(json)
      setQuestionAnswers(new Array(json.length).fill(null))
    } catch(e) {
      console.error(e)
      setQuestions([])
    }
  }

  const decrementCurrentQuestion = () => {
    if (activeIndex === 0) return 
    setActiveIndex(activeIndex - 1)
  }
    
  const incrementCurrentQuestion = () => {
    if (activeIndex === (questions.length - 1)) return

    // Let's validate here to determine if the question is required or not
    if (questions[activeIndex].required) {
      if (!questionAnswers[activeIndex]) {
        setError('Question is required')
        return
      } else {
        setError('')
      }
    }

    // Move to the next question
    setActiveIndex(activeIndex + 1)
  }

  // answer key map example
  // index-based are question-styled index
  // [{ answers: [{ user_id:, question_id:, map_id:}] }]
  const submitAnswer = (data: Record<string, any> | Record<string, any>[], isCheckbox: boolean = false): void => {

    // create a separate array to help set this up
    const tmpQuestionAnswers = [...questionAnswers]

    if (isCheckbox) {
      const multipleAnswers = [...(data as Record<string,any>[])].map(d => ({ ...d, user_id: user!.id }))
      tmpQuestionAnswers[activeIndex] = { answers: multipleAnswers }
    } else {
      tmpQuestionAnswers[activeIndex] = { answers: [ {...data, user_id: user!.id} ] }
    }

    setQuestionAnswers(tmpQuestionAnswers)
  }

  const submitLogin = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    // Create user
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    })

    const json = await response.json()

    if (response.ok) {
      setUser(json[0])
      setEmail('')
      setError('')
      setSuccess('')
    } else {
      setError(json.message)
    }
  }

  const submitQuestions = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    // Let's setup the data, and promises
    try {
      
      // Map the data and then promise create them all
      const dataAnswers = questionAnswers
        .flatMap(qAnswer => qAnswer.answers)
        .map(async (answer) => {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/user_question_answers`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(answer),
          })
          const json = await response.json()
          if (response.ok) return json
          throw new Error(json.message)
        })

      await Promise.all(dataAnswers)
      setSuccess('Thank you for submitting your questionnaire.')
      setError('')
      // reset value for the next user.
      setUser(null) 
      setQuestionAnswers(new Array(questions.length).fill(null))
      setActiveIndex(0)
    } catch (e) {
      console.error(e)
      setError(`Something happened: ${e}`)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  return (
    <Container fluid>
      <Row className="mt-3">
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title>
                Questionnaire
              </Card.Title>

              { error && <ErrorBanner message={error} /> }
              { success && <SuccessBanner message={success} /> }

              {
                !user ? 
                <Login 
                  submitClick={submitLogin}
                  email={email}
                  onEmailChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                /> 
                : 
                <QuestionForm
                  questions={questions}
                  answers={questionAnswers}
                  submitAnswer={submitAnswer}
                  submitButtonDisabled={!(activeIndex === (questions.length - 1))}
                  activeIndex={activeIndex}
                  prevButtonClick={decrementCurrentQuestion}
                  nextButtonClick={incrementCurrentQuestion}
                  submitClick={submitQuestions}
                />
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
