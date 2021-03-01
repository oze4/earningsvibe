import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Topbar, BodyContainer, SearchForm, AlertToast } from './components';

function App() {
  const [formData, setFormData] = useState(undefined);
  const [error, setError] = useState('');

  const handleOnSubmit = (event, formdata) => {
    if (formdata.ticker === '' || formdata.yearsAgo === '') {
      setError('All fields are required!');
    } else {
      setFormData(formdata);
    }
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
      </BodyContainer>
    </Container>
  );
}

export default App;
