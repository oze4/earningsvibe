import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Topbar, BodyContainer, SearchForm } from './components';

function App() {
  const [formData, setFormData] = useState(undefined);

  const handleOnSubmit = (event, formdata) => {
    setFormData(formdata);
  };

  useEffect(() => {
    if (formData !== undefined) {
      console.log('new query submitted', { formData });
    }
  }, [formData]);

  return (
    <Container fluid className="pl-0 pr-0 bg-gray">
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
