import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import {
  Topbar,
  BodyContainer,
  Overlay
} from './components';

import './app.css';

function App() {
  const [stockData, setStockData] = useState(undefined);
  const [overlayOpen, setOverlayOpen] = useState(true);

  const handleOnSubmit = async (event, formdata) => {
    if (!formdata.ticker || !formdata.yearsAgo) {
      console.error('All fields are required!');
    }
    const resp = await fetch(
      `/api/vibe_check/${formdata.ticker}/${formdata.yearsAgo}`
    );
    const json = await resp.json();
    setStockData(json);
  };

  return (
    <Container fluid className="pl-0 pr-0 bg-gray">
      <Topbar
        brand="earningsvibe.com"
        expand="sm"
        searchButtonText="Vibe Check"
        searchPlaceholderText="Ticker"
      />
      <BodyContainer className="mt-2">
        <Overlay isOpen={overlayOpen} hasCloseButton={false}>
            <Row className="justify-content-center center-me">
              <Col xs className="ml-5 mr-5">
                  <input placeholder="ticker" type="text" className="input--fullscreen" />
              </Col>
            </Row>
        </Overlay>
      </BodyContainer>
    </Container>
  );
}

export default App;
