import React, {} from 'react';
import { Card, Table } from 'react-bootstrap';
import { CandleStickChartWithMA } from '../'

export default function EarningsVibeCard(props) {
  const { vibe, chartWidth } = props;

  return (
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
              <td>
                {vibe.earnings.date} [
                {vibe.earnings.time === 'amc'
                  ? 'after market close'
                  : 'before market open'}
                ]
              </td>
              <td>
                {!vibe.earnings.epsEstimated || vibe.earnings.epsEstimated <= 0
                  ? 'N/A'
                  : vibe.earnings.epsEstimated}
              </td>
              <td
                style={{
                  backgroundColor:
                    vibe.earnings.eps > vibe.earnings.epsEstimated
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
                    vibe.earnings.revenue > vibe.earnings.revenueEstimated
                      ? 'rgb(0, 128, 0, 0.1)' // green with 10% opacity
                      : 'rgb(255, 0, 0, 0.1)' // red with 10% opacity
                }}
              >
                {!vibe.earnings.revenue || vibe.earnings.revenue <= 0
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
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              )}
            />
          </div>
        ) : (
          <h3>Can't seem to find that. Please try again soon.</h3>
        )}
      </Card.Body>
    </Card>
  );
}
