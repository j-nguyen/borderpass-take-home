import { useState, useEffect, type MouseEventHandler } from "react";
import { Col, Row, Container, Button, Card } from "react-bootstrap";
import type { Route } from "./+types/home";
import type { Question } from "~/models/question";
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

// Function Components
function CurrentQuestion({ question }: { question: Question }) {
  if (question) {
    if (question.question_type === 'dropdown') {
      return (<Dropdown question={question} />)
    } else if (question.question_type === 'short_answer') {
      return (<ShortAnswer question={question} />)
    } else if (question.question_type === 'long_answer') {
      return (<LongAnswer question={question} />)
    } else if (question.question_type === 'checkbox') {
      return (<Checkbox question={question} />)
    } else if (question.question_type === 'multiple_choice') {
      return (<MultipleChoice question={question} />)
    }
  }
}

// Export Rendering
export default function Home() {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  
  const fetchQuestions = async() => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/questions`)
      const json = await response.json()
      setQuestions(json)
    } catch(e) {
      console.error(e)
      setQuestions([])
    }
  }

  const decrementCurrentQuestion = () => {
    if (currentQuestionIndex === 0) return 
    setCurrentQuestionIndex(currentQuestionIndex - 1)
  }
    
  const incrementCurrentQuestion = () => {
    if (currentQuestionIndex === (questions.length - 1)) return
    setCurrentQuestionIndex(currentQuestionIndex + 1)
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

              <h4>Question {currentQuestionIndex + 1}</h4>

              <CurrentQuestion question={questions[currentQuestionIndex]} />
              
              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={decrementCurrentQuestion}>Previous</Button>
                <div className="d-flex gap-2">
                  <Button variant="primary" onClick={incrementCurrentQuestion}>Next</Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
