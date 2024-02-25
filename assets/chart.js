 // HighCharts
 const charTextStyle = {
  color: '#ffffff'
};
const chartOptions = {
  chart: {
    type: 'line',
    backgroundColor: "transparent"
  },
  title: {
    style: {
      ...charTextStyle
    },
    text: ``
  },
  xAxis: {
    categories: ['0.1', '1.0', '10.0', '100'],
    labels: {
      style: {
        ...charTextStyle
      }
    }
  },
  yAxis: {
    title: {
      style: {
        ...charTextStyle
      },
      text: 'THD+N',
    },
    labels: {
      style: {
        ...charTextStyle
      }
    },
    gridLineColor: '#334155'
  },
  legend: {
    itemStyle: {
      ...charTextStyle
    }
  },
  series: [
    {
      color: '#dc2626',
      name: 'Black Hole Audio - M87',
      data: [0.010, 0.003, 0.002]
    }
  ]
};
Highcharts.chart('chart-container', chartOptions);