import type { Route } from "./+types/home";
import { Col, Row, Container, Button, Card } from "react-bootstrap";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Questionnaire App" },
  ];
}

// Function
function CardLayout() {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

// Export Rendering
export default function Home() {
  return (
    <Container fluid>
      <Row className="mt-3">
        <Col md={{ span: 6, offset: 3 }}>
          <CardLayout></CardLayout>
        </Col>
      </Row>
    </Container>
  )
}
