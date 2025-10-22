import { useState, useEffect } from "react";
import { Col, Row, Container, Button, Card } from "react-bootstrap";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Questionnaire App" },
  ];
}

// Export Rendering
export default function Home() {
  const [questions, setQuestions] = useState([])
  
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

  useEffect(() => {
    fetchQuestions()
  }, [])

  return (
    <Container fluid>
      <Row className="mt-3">
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              
              <ul>
                {questions.map((item, index) => (
                  // Each list item needs a unique 'key' prop
                  <li key={index}>{item.title}</li>
                ))}
              </ul>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
