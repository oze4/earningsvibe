import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Spinner } from 'react-bootstrap';

import {
  Topbar,
  BodyContainer,
  SearchForm,
  AlertToast,
  CandleStickChartWithMA
} from './components';

function App() {
  const [stockData, setStockData] = useState(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleOnSubmit = async (event, formdata) => {
    if (!formdata.ticker || !formdata.yearsAgo) {
      setError('All fields are required!');
    }
    const resp = await fetch(
      `/api/vibe_check/${formdata.ticker}/${formdata.yearsAgo}`
    );
    const json = await resp.json();

    console.log({ json });

    setStockData(json);
  };

  const stockDataExists = () => stockData !== undefined && stockData.length > 0;

  let toRender = <div></div>;

  if (isSubmitting && stockDataExists()) {
    toRender = (
      <Row>
        <Col
          style={{
            width: '100%',
            border: '1px solid black',
            marginBottom: '10px'
          }}
        >
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Col>
      </Row>
    );
  }

  if (!isSubmitting && stockDataExists()) {
    toRender = <pre>{JSON.stringify(stockData, null, 2)}</pre>;
    /*
    toRender = stockData.map((sd) => (
      <div>
        <h1>{sd.date}</h1>
        <CandleStickChartWithMA
          type="svg"
          data={sd.stockData.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )}
        />
        <pre>{JSON.stringify(sd, null, 2)}</pre>
      </div>
    ));
    */
  }

  return (
    <Container fluid className="pl-0 pr-0 bg-gray">
      <AlertToast
        show={error !== ''}
        message={error}
        variant="error"
        onClose={() => setError('')}
      />
      <Topbar brand="earningsvibe.com" expand="lg" />
      <BodyContainer className="mt-2">
        <SearchForm
          onSubmit={(event, formdata) => handleOnSubmit(event, formdata)}
        />
        {toRender}
      </BodyContainer>
    </Container>
  );
}

export default App;
