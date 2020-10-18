import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyLineChart from './MyLineChart';

afterEach(cleanup);

const data = [
    {_id: '5f8c89665d349c63142cd484', created_at: '2020-10-18T18:28:56.281Z', value: '5', __v: 0},
    {_id: '5f8c89665d349c63142cd484', created_at: '2020-10-18T18:28:56.281Z', value: '5', __v: 0},
    {_id: '5f8c89665d349c63142cd484', created_at: '2020-10-18T18:28:56.281Z', value: '5', __v: 0},
    {_id: '5f8c89665d349c63142cd484', created_at: '2020-10-18T18:28:56.281Z', value: '5', __v: 0}
];

describe('MyLineChart component', () => {
  it('should be render with name', () => {
    render(
      <MyLineChart />,
    );
  });

  it('should be render not props to data', () => {
    render(<MyLineChart />);
    const lineChartElement = document.querySelector('.line-chart');

    expect(lineChartElement).toBe(null);
  });

  it('should be render props to data', () => {
    render(<MyLineChart data={data} />);
    const lineChartElement = document.querySelector('.line-chart');

    expect(lineChartElement.className.includes('line-chart')).toBe(true);
  });
});
