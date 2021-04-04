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
    const url = `${BASE_API_URL}/api/vibe_check?symbol=${event.target.value}&count=10`;
    const resp = await fetch(url);
    const json = await resp.json();
    console.log({ vibeData: json })
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
                        <Card className="mt-4 mb-4">
                          <Card.Header>
                            <Table striped bordered hover responsive>
                              <thead>
                                <tr>
                                  <th>Earning Date</th>
                                  <th>EPS Estimate</th>
                                  <th>EPS Actual</th>
                                  <th>Revenue Estimate</th>
                                  <th>Revenue Actual</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{vibe.earnings.date}</td>
                                  <td>
                                    {!vibe.earnings.epsEstimated ||
                                    vibe.earnings.epsEstimated <= 0
                                      ? 'N/A'
                                      : vibe.earnings.epsEstimated}
                                  </td>
                                  <td
                                    style={{
                                      backgroundColor:
                                        vibe.earnings.eps >
                                        vibe.earnings.epsEstimated
                                          ? 'rgb(0, 128, 0, 0.1)' // green with 10% opacity
                                          : 'rgb(255, 0, 0, 0.1)' // red with 10% opacity
                                    }}
                                  >
                                    {!vibe.earnings.eps || vibe.earnings.eps <= 0
                                      ? 'N/A'
                                      : vibe.earnings.eps}
                                  </td>
                                  <td>
                                    {!vibe.earnings.revenueEstimated ||
                                    vibe.earnings.revenueEstimated <= 0
                                      ? 'N/A'
                                      : vibe.earnings.revenueEstimated}
                                  </td>
                                  <td
                                    style={{
                                      backgroundColor:
                                        vibe.earnings.revenue >
                                        vibe.earnings.revenueEstimated
                                          ? 'rgb(0, 128, 0, 0.1)' // green with 10% opacity
                                          : 'rgb(255, 0, 0, 0.1)' // red with 10% opacity
                                    }}
                                  >
                                    {!vibe.earnings.revenue ||
                                    vibe.earnings.revenue <= 0
                                      ? 'N/A'
                                      : vibe.earnings.revenue}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </Card.Header>
                          <Card.Body className="p-0">
                            {vibe.stock && vibe.stock.length > 0 ? (
                              <div>
                                {console.log(vibe.stock.length)}
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
                              </div>
                            ) : (
                              <h3>Can't seem to find that. Please try again soon.</h3>
                            )}
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
