// src/pages/HomePage.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const HomePage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Total Products</Card.Title>
              <Card.Text>150</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Total Customers</Card.Title>
              <Card.Text>230</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Total Sales</Card.Title>
              <Card.Text>520</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
