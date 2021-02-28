import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import './index.css';

const { Group, Control } = Form;

const oneYearAgo = () =>
  new Date(new Date().setFullYear(new Date().getFullYear() - 1));

const now = () => new Date(Date.now());

export default function SearchForm(props) {
  const [formData, setFormData] = useState({ ticker: '', start: '', end: '' });

  const handleSetFormData = (key, value) => {
    const c = { ...formData };
    c[key] = value;
    setFormData(c);
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Group as={Row} className="justify-content-md-center text-center">
        <Col md="4" className="mt-1 mb-1">
          <Control
            onChange={(e) => handleSetFormData('ticker', e.target.value)}
            placeholder="Ticker"
          />
        </Col>
        <Col xs="6" md="4" className="mt-1 mb-1">
          <div className="date--range--select">
            <DatePicker
              selectsStart
              showYearDropdown
              selected={formData.start}
              startDate={formData.start}
              endDate={formData.end}
              openToDate={oneYearAgo()}
              onChange={(e) => handleSetFormData('start', e)}
              placeholderText="Start Date"
              minDate={new Date('1/1/2015')}
              customInput={<Control />}
            />
          </div>
        </Col>
        <Col xs="6" md="4" className="mt-1 mb-1">
          <div className="date--range--select">
            <DatePicker
              selectsEnd
              selected={formData.end}
              startDate={formData.start}
              endDate={formData.end}
              openToDate={now()}
              onChange={(e) => handleSetFormData('end', e)}
              placeholderText="End Date"
              minDate={formData.start}
              customInput={<Control />}
            />
          </div>
        </Col>
      </Group>
      <Group>
        <Row className="justify-content-md-center text-center">
          <Col sm>
            <Button onClick={(e) => props.onSubmit(e, formData)}>
              Vibe Check
            </Button>
          </Col>
        </Row>
      </Group>
    </Form>
  );
}
