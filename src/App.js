import React, { useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';

import {
  Topbar,
  BodyContainer,
  SearchForm,
  AlertToast,
  StockChart
} from './components';

import { getData } from '../src/components/StockChart/utils';

function App() {
  const [stockData, setStockData] = useState(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleOnSubmit = async (event, formdata) => {
    setIsSubmitting(true);
    if (!formdata.ticker || !formdata.yearsAgo) {
      setError('All fields are required!');
    }

    // getData()
    //   .then((datas) => {
    //     console.log(datas);
    //     setStockData(datas);
    //   })
    //   .catch((err) => console.log(err));

    const resp = await fetch(`/api/vibe_check/${formdata.ticker}/${formdata.yearsAgo}`);
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
        <pre>{JSON.stringify(stockData, null, 2)}</pre>
      </BodyContainer>
    </Container>
  );
}

export default App;
