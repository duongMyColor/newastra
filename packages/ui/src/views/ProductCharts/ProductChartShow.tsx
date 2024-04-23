import {
  Show,
  useRecordContext,
  SimpleShowLayout,
  useNotify,
} from 'react-admin';

import { useEffect, useState } from 'react';
import { ProductDetaiResponselIF } from '@repo/types/product';
import { generateChart } from '@repo/lib/chart';
import type { Chart, ChartDataset, ChartTypeRegistry } from 'chart.js';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { BaseComponentProps } from '@repo/types/general';

const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

const ShowContent = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const record = useRecordContext();
  const notify = useNotify();
  const [chart, setChart] = useState<Chart>();
  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<
    ChartDataset<'bar', (number | [number, number] | null)[]>[]
  >([]);
  const [chartType, setChartType] = useState<string>('bar');

  const renderChart = (type: keyof ChartTypeRegistry) => {
    const ctx = document.getElementById('productChart');

    // Check if the canvas element exists
    if (!ctx) {
      return;
    }

    // Check if there is any data to show
    if (record?.ProductDetail?.length === 0) {
      notify('No data found');
      return;
    }

    // Destroy the chart if it already exists
    if (chart) {
      chart.destroy();
    }

    setChart(generateChart(ctx, labels, datasets, type));
  };

  const changeChartType = (type: string) => {
    setChartType(type as keyof ChartTypeRegistry);
    renderChart(type as keyof ChartTypeRegistry);
  };

  useEffect(() => {
    setLabels(
      record?.ProductDetail?.map(
        (row: ProductDetaiResponselIF) => row.detailName
      )
    );

    setDatasets([
      {
        label: 'Product Count',
        data: record?.ProductDetail?.map(
          (row: ProductDetaiResponselIF) => row.count
        ),
        // borderColor: randomHexColorCode(),
        backgroundColor: record?.ProductDetail?.map(() => randomHexColorCode()),
      },
    ]);
  }, [record]);

  useEffect(() => {
    renderChart(chartType as keyof ChartTypeRegistry);
  }, [labels, datasets]);

  return (
    <Show>
      <SimpleShowLayout>
        <div>
          <Button
            type="button"
            variant={chartType == 'bar' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => changeChartType('bar')}
            size="small"
          >
            Bar chart
          </Button>{' '}
          <Button
            type="button"
            variant={chartType == 'line' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => changeChartType('line')}
            size="small"
          >
            Line chart
          </Button>{' '}
          <Button
            type="button"
            variant={chartType == 'pie' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => changeChartType('pie')}
            size="small"
          >
            Pie chart
          </Button>
        </div>
        <div>
          <canvas id="productChart"></canvas>
        </div>
        <Link to={resourcePath}>
          <Button type="button" variant="contained" color="error">
            Cancel
          </Button>
        </Link>
      </SimpleShowLayout>
    </Show>
  );
};

const ProductChartShow = ({ actions, resource }: BaseComponentProps) => {
  return (
    <Show>
      <ShowContent actions={actions} resource={resource} />
    </Show>
  );
};

export default ProductChartShow;
