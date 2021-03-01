import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const { Group, Control } = Form;

export default function SearchForm(props) {
  const [formData, setFormData] = useState({ ticker: '', yearsAgo: '' }); // past 4 earnings = past year

  const handleSetFormData = (key, value) => {
    const c = { ...formData };
    c[key] = value;
    setFormData(c);
  };

  const handleOnSubmit = (event) => {
    props.onSubmit(event, formData);
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Group as={Row} className="justify-content-md-center text-center">
        <Col xs="6" className="mt-1 mb-1">
          <Control
            onChange={(e) => handleSetFormData('ticker', e.target.value)}
            placeholder="Ticker"
          />
        </Col>
        <Col xs="6" className="mt-1 mb-1">
          <Control
            as="select"
            defaultValue="Years Ago"
            onChange={(e) => handleSetFormData('yearsAgo', e.target.value)}
          >
            <option value="">Years Ago</option>
            {[...Array(10).keys()].map((x, i) => (
              <option key={x + i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Control>
        </Col>
      </Group>
      <Group>
        <Row className="justify-content-md-center text-center">
          <Col sm>
            <Button onClick={(e) => handleOnSubmit(e)}>Vibe Check</Button>
          </Col>
        </Row>
      </Group>
    </Form>
  );
}
