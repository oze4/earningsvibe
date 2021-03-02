import React, { useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import {
  Topbar,
  BodyContainer,
  SearchForm,
  AlertToast,
  EarningsCard
} from './components';

function App() {
  const [formData, setFormData] = useState(undefined);
  const [stockData, setStockData] = useState(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleOnSubmit = (event, formdata) => {
    setIsSubmitting(true);
    if (formdata.ticker === '' || formdata.yearsAgo === '') {
      setError('All fields are required!');
    } else {
      setFormData(formdata);
    }
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
        {stockData !== undefined && isSubmitting ? (
          <div style={{ textAlign: 'center' }}>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <EarningsCard data={stockData} />
        )}
      </BodyContainer>
    </Container>
  );
}

export default App;
