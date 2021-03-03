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

  useEffect(() => {
    if (isSubmitting) {
    }
  }, [isSubmitting]);

  const handleOnSubmit = async (event, formdata) => {
    setIsSubmitting(true);
    if (!formdata.ticker || !formdata.yearsAgo) {
      setError('All fields are required!');
    }
    const resp = await fetch(
      `/api/vibe_check/${formdata.ticker}/${formdata.yearsAgo}`
    );
    const json = await resp.json();
    setStockData(json);
    setIsSubmitting(false);
  };

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
        {isSubmitting && !stockData ? (
          <Row>
            <Col>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        ) : (
          !isSubmitting &&
          stockData &&
          stockData.map((sd) => <CandleStickChartWithMA data={sd.stockData} />)
        )}
      </BodyContainer>
    </Container>
  );
}

export default App;
