import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { Container, Col, Row, Spinner } from 'react-bootstrap';

import { Topbar, BodyContainer, Overlay, EarningsVibeCard } from './components';

const BASE_API_URL = 'https://earningsvibe.herokuapp.com';

function App() {
  const [data, setData] = useState(undefined);
  const [overlayOpen, setOverlayOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [chartWidth, setChartWidth] = useState();
  const [stateRef, setStateRef] = useState();

  const ref = useCallback(
    (node) => {
      if (!isLoading && !overlayOpen && data) {
        if (node) {
          setStateRef(node);
        }
      }
    },
    [isLoading, overlayOpen, data]
  );

  function handleResize() {
    let w = 600;
    if (stateRef) {
      w = stateRef.clientWidth;
    }
    setChartWidth(w);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  useEffect(() => {
    if (stateRef) {
      setChartWidth(stateRef.clientWidth);
    }
  }, [stateRef]);

  const handleOnSubmit = async (event) => {
    // Defaults to one years worth (typically) of earnings (referring to count=4)
    const url = `${BASE_API_URL}/api/vibe_check?symbol=${event.target.value}&count=4`;
    const resp = await fetch(url);
    const json = await resp.json();
    console.log({ vibeData: json });
    setData(json);
  };

  const handleOnKeyPress = async (event) => {
    if (event.key === 'Enter') {
      setIsLoading(true);
      event.preventDefault();
      await handleOnSubmit(event);
      setOverlayOpen(false);
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="pl-0 pr-0 bg-gray">
      <Overlay isOpen={overlayOpen} hasCloseButton={false}>
        <Row className="justify-content-center center-me">
          <Col xs className="ml-5 mr-5">
            {!isLoading && overlayOpen ? (
              <input
                spellCheck={false}
                placeholder="ticker"
                type="text"
                className="input--fullscreen"
                onKeyPress={async (e) => await handleOnKeyPress(e)}
              />
            ) : (
              <Spinner
                variant="light"
                className="justify-content-end"
                animation="border"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}
          </Col>
        </Row>
      </Overlay>
      {/* If the overlay is open, don't show anything behind it */}
      {!overlayOpen && !isLoading && (
        <Fragment>
          <Topbar
            fixed="top"
            brand="earningsvibe.com"
            expand="sm"
            bg="light"
            variant="light"
            searchPlaceholderText="Ticker"
            onSearchClick={(e) => setOverlayOpen(true)}
          />
          <BodyContainer style={{ marginTop: '6rem' }} fluid>
            <Row className="justify-content-center center-me">
              <Col sm={12} md={10} ref={ref}>
                {data && data.length > 0 && <h1>{data[0].earnings.symbol}</h1>}
                {data.map((vibe) => {
                  return (
                    <Row>
                      <Col>
                        <EarningsVibeCard vibe={vibe} chartWidth={chartWidth} />
                      </Col>
                    </Row>
                  );
                })}
              </Col>
            </Row>
          </BodyContainer>
        </Fragment>
      )}
    </Container>
  );
}

export default App;
