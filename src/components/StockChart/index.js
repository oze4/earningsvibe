import React, { Component } from 'react';
import Chart from './CandleStickChartWithMA';

import { TypeChooser } from 'react-stockcharts/lib/helper';

export { default as CandleStickChartWithMA } from './CandleStickChartWithMA';

/**
 * Gets data from a url and puts it in a chart
 */
export default class StockChart extends Component {
  componentDidMount() {
    const { data } = this.props;
    this.setState(data);
  }
  render() {
    return (
      <TypeChooser>
        {(type) => <Chart type={type} data={this.state.data || []} />}
      </TypeChooser>
    );
  }
}
