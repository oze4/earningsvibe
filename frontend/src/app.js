import React, { Fragment, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import { Topbar, BodyContainer, Overlay, Input } from './components';

function App() {
  const [Stock, setStock] = useState(undefined);
  const [overlayOpen, setOverlayOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async (event) => {
    const resp = await fetch(
      // Defaults to one years worth (typically) of earnings
      `/api/vibe_check?symbol=${event.target.value}&count=4`
    );
    const json = await resp.json();
    console.log({ earningsVibe: json });
    setStock(json);
  };

  const handleOnKeyPress = async (event) => {
    if (event.key === 'Enter') {
      setIsLoading(true);
      event.preventDefault();
      await handleOnSubmit(event);
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="pl-0 pr-0 bg-gray">
      {/* If the overlay is open, don't show anything behind it */}
      {!overlayOpen && (
        <Fragment>
          <Topbar
            brand="earningsvibe.com"
            expand="sm"
            searchButtonText="Vibe Check"
            searchPlaceholderText="Ticker"
          />
          <BodyContainer className="mt-2">
            <div>
              <h1>I am the body</h1>
            </div>
          </BodyContainer>
        </Fragment>
      )}
      <Overlay isOpen={overlayOpen} hasCloseButton={false}>
        <Row className="justify-content-center center-me">
          <Col xs className="ml-5 mr-5">
            <Input
              isLoading={isLoading}
              placeholder="ticker"
              type="text"
              className="input--fullscreen"
              onKeyPress={(e) => handleOnKeyPress(e)}
            />
          </Col>
        </Row>
      </Overlay>
    </Container>
  );
}

export default App;
