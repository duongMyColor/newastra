import { useEffect, useRef } from 'react';
import 'chartjs-adapter-luxon';
import ChartStreaming from 'chartjs-plugin-streaming';
import { Chart, ChartItem } from 'chart.js';
import ChartObj from 'chart.js/auto';
import { SocketClient } from '@repo/lib/socket';
import { Socket } from 'socket.io-client';

Chart.register(ChartStreaming);

const ROOM_NAME = 'mycolor';
const SOCKET_SERVER_URL = 'http://localhost:5000';

const ChartComponent = () => {
  const dataStub = useRef<{ x: number; y: number } | undefined>(undefined);

  useEffect(() => {
    const socketClient = new SocketClient(SOCKET_SERVER_URL);

    const handleConnect = (reason: Socket) => {
      console.log({ socketEvent: 'Connected! ', reason });
      socketClient.send('join', ROOM_NAME);
    };

    const handleDisconnect = (reason: Socket) => {
      console.log({ socketEvent: 'Disconnected! ', reason });
    };

    const handleDataDelivery = (data: { x: number; y: number }) => {
      dataStub.current = data;
    };

    const handleRefresh = (chart: Chart) => {
      chart.data.datasets.forEach(function (dataset) {
        // Assuming chartData is an array of arrays, where each sub-array corresponds to a dataset
        if (dataStub.current) {
          dataset.data.push(dataStub.current);
        }
      });
    };

    socketClient.listen('connected', handleConnect);
    socketClient.listen('disconnect', handleDisconnect);
    socketClient.listen('data-delivery', handleDataDelivery);

    const generateChart = () => {
      const ctx = document.getElementById('myChart');

      new ChartObj(ctx as ChartItem, {
        type: 'line', // 'line', 'bar', 'bubble' and 'scatter' types are supported
        data: {
          datasets: [
            {
              label: 'Simulation Data',
              data: [], // empty at the beginning
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'realtime', // x axis will auto-scroll from right to left
              realtime: {
                // per-axis options
                duration: 20000, // data in the past 20000 ms will be displayed
                refresh: 1000, // onRefresh callback will be called every 1000 ms
                delay: 1000, // delay of 1000 ms, so upcoming values are known before plotting a line
                pause: false, // chart is not paused
                ttl: undefined, // data will be automatically deleted as it disappears off the chart
                frameRate: 60, // data points are drawn 30 times every second

                // a callback to update datasets
                onRefresh: handleRefresh,
              },
            },
            y: {
              max: 1,
              min: 0,
            },
          },
          responsive: false,
        },
      });
    };

    generateChart();

    return () => {
      socketClient.removeListener('connected', handleConnect);
      socketClient.removeListener('disconnect', handleDisconnect);
      socketClient.removeListener('data-delivery', handleDataDelivery);
    };
  }, []);

  return (
    <div
      style={{
        width: '100%',
        borderRadius: '10px',
        boxShadow: '1px 1px 5px 2px rgba(0, 0, 0, 0.1)',
        padding: '20px',
      }}
    >
      <canvas id="myChart" style={{ width: '100%' }}></canvas>
      <h3 style={{ textAlign: 'center' }}>Realtime Chart</h3>
      <h5>
        Run web socket server to see graph: see{' '}
        <code>websocket-server/README.md</code>
      </h5>
    </div>
  );
};

export default ChartComponent;
