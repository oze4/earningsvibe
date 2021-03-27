import React, { Fragment, useState, useEffect } from 'react';
import { Container, Col, Row, Spinner } from 'react-bootstrap';

import { Topbar, BodyContainer, Overlay, Input } from './components';

function App() {
  const [data, setData] = useState(undefined);
  const [overlayOpen, setOverlayOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  const handleOnSubmit = async (event) => {
    // Defaults to one years worth (typically) of earnings (referring to count=4)
    const url = `/api/vibe_check?symbol=${event.target.value}&count=4`;
    const resp = await fetch(url);
    const json = await resp.json();
    setData(json);
  };

  const handleOnKeyPress = async (event) => {
    if (event.key === 'Enter') {
      setIsLoading(true);
      event.preventDefault();
      await handleOnSubmit(event);
      setIsLoading(false);
      setOverlayOpen(false);
    }
  };

  return (
    <Container fluid className="pl-0 pr-0 bg-gray">
      {/* If the overlay is open, don't show anything behind it */}
      {!overlayOpen && data.length && (
        <Fragment>
          <Topbar
            brand="earningsvibe.com"
            expand="sm"
            searchPlaceholderText="Ticker"
            onSearchClick={(e) => setOverlayOpen(true)}
          />
          <BodyContainer className="mt-2">
            <pre>{JSON.stringify(data, null, 2)}</pre>
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
            {isLoading && (
              <Spinner style={{ color: 'white' }} className="justify-content-end" animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}
          </Col>
        </Row>
      </Overlay>
    </Container>
  );
}

export default App;
