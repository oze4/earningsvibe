import React, { useState, useEffect } from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import StockChart from './StockChart';
import { getData } from './utils';

export default function EarningsCard(props) {
  const [datas, setDatas] = useState(null);

  useEffect(() => {
    getData().then((data) => setDatas(data));
  }, []);

  if (datas === null) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <StockChart data={datas} />
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}
