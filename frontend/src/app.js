import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { Container, Col, Row, Spinner, Table, Card } from 'react-bootstrap';

import {
  Topbar,
  BodyContainer,
  Overlay,
  CandleStickChartWithMA
} from './components';

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
          console.log(
            'useCallback setting client width to',
            node.clientWidth,
            'from :'
          );
          setStateRef(node);
        }
      }
    },
    [isLoading, overlayOpen, data]
  );

  function handleResize() {
    let w = 600;
    if (stateRef) {
      const o = w;
      w = stateRef.clientWidth;
      console.log('ref found, changing default width to :', w, 'from :', o);
    }
    console.log('handling resize : setting chartWidth to :', w);
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

  // useEffect(() => {
  //   console.log('data changed');
  //   if (data && data.length) {
  //     console.log('data changed and about to handle resize');
  //     handleResize();
  //   }
  // }, [data]);

  const handleOnSubmit = async (event) => {
    // Defaults to one years worth (typically) of earnings (referring to count=4)
    const url = `${BASE_API_URL}/api/vibe_check?symbol=${event.target.value}&count=4`;
    const resp = await fetch(url);
    const json = await resp.json();
    setData(json);
  };

  const handleOnKeyPress = async (event) => {
    if (event.key === 'Enter') {
      setIsLoading(true);
      event.preventDefault();
      await handleOnSubmit(event);
      console.log('setting overlayopen to false');
      setOverlayOpen(false);
      console.log('setting isLoading to false');
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
      {!overlayOpen && data.length && (
        <Fragment>
          <Topbar
            brand="earningsvibe.com"
            expand="sm"
            searchPlaceholderText="Ticker"
            onSearchClick={(e) => setOverlayOpen(true)}
          />
          <BodyContainer className="mt-2" fluid>
            <Row className="justify-content-center center-me">
              <Col sm={12} md={8} ref={ref}>
                {data.map((vibe) => {
                  return (
                    <Row>
                      <Col>
                        <Card className="mt-5 mb-5">
                          <Card.Header>
                            <Table striped bordered hover responsive>
                              <thead>
                                <tr>
                                  <th>Symbol</th>
                                  <th>Date</th>
                                  <th>EPS Estimate</th>
                                  <th>EPS Actual</th>
                                  <th>Revenue Estimate</th>
                                  <th>Revenue Actual</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{vibe.earning.symbol}</td>
                                  <td>{vibe.earning.date}</td>
                                  <td>{vibe.earning.epsEstimated}</td>
                                  <td>{vibe.earning.eps}</td>
                                  <td>{vibe.earning.revenueEstimated}</td>
                                  <td>{vibe.earning.revenue}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </Card.Header>
                          <Card.Body className="p-0">
                            <CandleStickChartWithMA
                              type="svg"
                              height={600}
                              width={chartWidth}
                              data={vibe.stock.sort(
                                (a, b) =>
                                  new Date(a.date).getTime() -
                                  new Date(b.date).getTime()
                              )}
                            />
                          </Card.Body>
                        </Card>
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
