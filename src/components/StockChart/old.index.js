import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';

import { ChartCanvas, Chart } from 'react-stockcharts';
import {
  CandlestickSeries,
  LineSeries,
  MACDSeries
} from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import {
  CrossHairCursor,
  EdgeIndicator,
  CurrentCoordinate,
  MouseCoordinateX,
  MouseCoordinateY
} from 'react-stockcharts/lib/coordinates';

import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import {
  OHLCTooltip,
  MovingAverageTooltip,
  MACDTooltip
} from 'react-stockcharts/lib/tooltip';
import { macd, sma } from 'react-stockcharts/lib/indicator';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { timeIntervalBarWidth } from 'react-stockcharts/lib/utils';

const macdAppearance = {
  stroke: {
    macd: 'black',
    signal: 'red'
  },
  fill: {
    divergence: '#82CAFA'
  }
};

const mouseEdgeAppearance = {
  textFill: '#542605',
  stroke: '#05233B',
  strokeOpacity: 0.25,
  strokeWidth: 1,
  arrowWidth: 1,
  fill: '#BCDEFA'
};

class CandleStickChartWithMACDIndicator extends React.Component {
  render() {
    const { type, stockData = [], width, ratio } = this.props;

    const macdCalculator = macd()
      .options({
        fast: 12,
        slow: 26,
        signal: 9
      })
      .merge((d, c) => {
        d.macd = c;
      })
      .accessor((d) => d.macd);

    const sma50 = sma()
      .id(1)
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.sma50 = c;
      })
      .accessor((d) => d.sma50);

    const sma200 = sma()
      .id(2)
      .options({ windowSize: 200 })
      .merge((d, c) => {
        d.sma200 = c;
      })
      .accessor((d) => d.sma200);

    const calculatedData =
      stockData && macdCalculator(sma200(sma50(stockData)));

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      (d) => {
        console.log({ d });
        return d.date;
      }
    );

    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      calculatedData
    );

    console.log(data);

    return (
      <ChartCanvas
        height={600}
        width={width}
        ratio={ratio}
        margin={{ left: 50, right: 70, top: 20, bottom: 30 }}
        type={type}
        // seriesName="MSFT"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
      >
        <Chart
          id={1}
          height={400}
          yExtents={(d) => [d.high, d.low]}
          padding={{ top: 10, bottom: 10 }}
        >
          <XAxis
            axisAt="bottom"
            orient="bottom"
            showTicks={false}
            outerTickSize={0}
          />
          <YAxis axisAt="right" orient="right" ticks={5} />

          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format('.2f')}
            {...mouseEdgeAppearance}
          />

          <CandlestickSeries />

          <LineSeries yAccessor={sma50.accessor()} stroke={sma50.stroke()} />
          <LineSeries yAccessor={sma200.accessor()} stroke={sma200.stroke()} />

          <CurrentCoordinate
            yAccessor={sma50.accessor()}
            fill={sma50.stroke()}
          />
          <CurrentCoordinate
            yAccessor={sma200.accessor()}
            fill={sma200.stroke()}
          />

          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={(d) => d.close}
            fill={(d) => (d.close > d.open ? '#A2F5BF' : '#F9ACAA')}
            stroke={(d) => (d.close > d.open ? '#0B4228' : '#6A1B19')}
            textFill={(d) => (d.close > d.open ? '#0B4228' : '#420806')}
            strokeOpacity={1}
            strokeWidth={3}
            arrowWidth={2}
          />

          <OHLCTooltip origin={[0, 0]} />
          <MovingAverageTooltip
            onClick={(e) => console.log(e)}
            origin={[0, 15]}
            options={[
              {
                yAccessor: sma50.accessor(),
                type: 'SMA',
                stroke: sma50.stroke(),
                windowSize: sma50.options().windowSize
              },
              {
                yAccessor: sma200.accessor(),
                type: 'SMA',
                stroke: sma200.stroke(),
                windowSize: sma200.options().windowSize
              }
            ]}
          />
        </Chart>

        <Chart
          id={3}
          height={100}
          yExtents={macdCalculator.accessor()}
          origin={(w, h) => [0, h - 150]}
          padding={{ top: 5, bottom: 5 }}
          margin={{ top: 1 }}
        >
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis axisAt="right" orient="right" ticks={5} />

          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat('%Y-%m-%d')}
            rectRadius={5}
            {...mouseEdgeAppearance}
          />

          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format('.2f')}
            {...mouseEdgeAppearance}
          />

          <MACDSeries yAccessor={(d) => d.macd} {...macdAppearance} />
          <MACDTooltip
            origin={[0, 15]}
            yAccessor={(d) => d.macd}
            options={macdCalculator.options()}
            appearance={macdAppearance}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}

CandleStickChartWithMACDIndicator.propTypes = {
  //stockData: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['svg', 'hybrid']).isRequired
};

CandleStickChartWithMACDIndicator.defaultProps = {
  type: 'svg'
};

// CandleStickChartWithMACDIndicator
export default fitWidth(CandleStickChartWithMACDIndicator);
