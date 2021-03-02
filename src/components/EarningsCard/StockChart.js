import React from 'react';
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

const macdAppearance = {
  stroke: {
    macd: '#FF0000',
    signal: '#00F300'
  },
  fill: {
    divergence: '#4682B4'
  }
};

const mouseEdgeAppearance = {
  textFill: '#542605',
  stroke: '#05233B',
  strokeOpacity: 1,
  strokeWidth: 3,
  arrowWidth: 5,
  fill: '#BCDEFA'
};

function CandleStickChartWithMACDIndicator(props) {
  const { type, data: initialData, width, ratio } = props;

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

  const sma10 = sma()
    .id(1)
    .options({ windowSize: 10 })
    .merge((d, c) => {
      d.sma10 = c;
    })
    .accessor((d) => d.sma10);

  const sma20 = sma()
    .id(1)
    .options({ windowSize: 20 })
    .merge((d, c) => {
      d.sma20 = c;
    })
    .accessor((d) => d.sma20);

  const sma30 = sma()
    .id(2)
    .options({ windowSize: 30 })
    .merge((d, c) => {
      d.sma30 = c;
    })
    .accessor((d) => d.sma30);

  const sma60 = sma()
    .id(2)
    .options({ windowSize: 60 })
    .merge((d, c) => {
      d.sma60 = c;
    })
    .accessor((d) => d.sma60);

  const sma90 = sma()
    .id(2)
    .options({ windowSize: 90 })
    .merge((d, c) => {
      d.sma90 = c;
    })
    .accessor((d) => d.sma90);

  const calculatedData = macdCalculator(
    sma10(sma20(sma30(sma60(sma90(initialData)))))
  );

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    (d) => d.date
  );

  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
    calculatedData
  );

  return (
    <ChartCanvas
      height={600}
      width={width}
      ratio={ratio}
      margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
      type={type}
      seriesName="MSFT"
      data={data}
      xScale={xScale}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
    >
      <Chart
        id={1}
        height={400}
        yExtents={[(d) => [d.high, d.low], sma10.accessor(), sma90.accessor()]}
        padding={{ top: 10, bottom: 20 }}
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

        <LineSeries yAccessor={sma10.accessor()} stroke={sma10.stroke()} />
        <LineSeries yAccessor={sma20.accessor()} stroke={sma20.stroke()} />
        <LineSeries yAccessor={sma30.accessor()} stroke={sma30.stroke()} />
        <LineSeries yAccessor={sma60.accessor()} stroke={sma60.stroke()} />
        <LineSeries yAccessor={sma90.accessor()} stroke={sma90.stroke()} />

        <CurrentCoordinate yAccessor={sma10.accessor()} fill={sma10.stroke()} />
        <CurrentCoordinate yAccessor={sma20.accessor()} fill={sma20.stroke()} />
        <CurrentCoordinate yAccessor={sma30.accessor()} fill={sma30.stroke()} />
        <CurrentCoordinate yAccessor={sma60.accessor()} fill={sma60.stroke()} />
        <CurrentCoordinate yAccessor={sma90.accessor()} fill={sma90.stroke()} />

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

        <OHLCTooltip origin={[-40, 0]} />
        <MovingAverageTooltip
          onClick={(e) => console.log(e)}
          origin={[-38, 15]}
          options={[
            {
              yAccessor: sma10.accessor(),
              type: 'SMA',
              stroke: sma10.stroke(),
              windowSize: sma10.options().windowSize
            },
            {
              yAccessor: sma20.accessor(),
              type: 'SMA',
              stroke: sma20.stroke(),
              windowSize: sma20.options().windowSize
            },
            {
              yAccessor: sma30.accessor(),
              type: 'SMA',
              stroke: sma30.stroke(),
              windowSize: sma30.options().windowSize
            },
            {
              yAccessor: sma60.accessor(),
              type: 'SMA',
              stroke: sma60.stroke(),
              windowSize: sma60.options().windowSize
            },
            {
              yAccessor: sma90.accessor(),
              type: 'SMA',
              stroke: sma90.stroke(),
              windowSize: sma90.options().windowSize
            }
          ]}
        />
      </Chart>

      <Chart
        id={2}
        height={150}
        yExtents={[(d) => d.volume, sma20.accessor()]}
        origin={(w, h) => [0, h - 300]}
      >
        <YAxis
          axisAt="left"
          orient="left"
          ticks={5}
          tickFormat={format('.2s')}
        />

        <MouseCoordinateY
          at="left"
          orient="left"
          displayFormat={format('.4s')}
          {...mouseEdgeAppearance}
        />
      </Chart>

      <Chart
        id={3}
        height={150}
        yExtents={macdCalculator.accessor()}
        origin={(w, h) => [0, h - 150]}
        padding={{ top: 5, bottom: 5 }}
        margin={{ top: 10 }}
      >
        <XAxis axisAt="bottom" orient="bottom" />
        <YAxis axisAt="right" orient="right" ticks={2} />

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
          origin={[-38, 15]}
          yAccessor={(d) => d.macd}
          options={macdCalculator.options()}
          appearance={macdAppearance}
        />
      </Chart>
      <CrossHairCursor />
    </ChartCanvas>
  );
}

CandleStickChartWithMACDIndicator.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['svg', 'hybrid']).isRequired
};

CandleStickChartWithMACDIndicator.defaultProps = {
  type: 'svg'
};

// CandleStickChartWithMACDIndicator
export default fitWidth(CandleStickChartWithMACDIndicator);
