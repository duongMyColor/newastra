import { ChartItem, ChartDataset, ChartTypeRegistry } from 'chart.js';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';

const generateBarChart = (
  ctx: HTMLElement | null,
  labels: string[],
  datasets: ChartDataset<'bar', (number | [number, number] | null)[]>[]
) =>
  new Chart(ctx as ChartItem, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          enabled: true,
        },
      },
      responsive: true,
      aspectRatio: 2,
    },
  });

const generateChart = (
  ctx: HTMLElement | null,
  labels: string[],
  datasets: ChartDataset<'bar', (number | [number, number] | null)[]>[],
  type: keyof ChartTypeRegistry
) =>
  new Chart(ctx as ChartItem, {
    type: type,
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          enabled: true,
        },
      },
      responsive: true,
      aspectRatio: 2,
    },
  });

export { generateBarChart, generateChart };
