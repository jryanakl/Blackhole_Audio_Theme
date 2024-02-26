// Flow
const options = {
  // set the labels option to true to show the labels on the X and Y axis
  xaxis: {
    show: true,
    categories: [
      0.1,
      1.0,
      10.0,
      100.0
    ],
    labels: {
      show: true,
      style: {
        fontFamily: "Oswald, sans-serif",
        cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        formatter: function (value) {
          return value;
        },
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    categories: [
      0.0000,
      0.0001,
      0.0010,
      0.0100,
      0.1000
    ],
    labels: {
      show: true,
      style: {
        fontFamily: "Oswald, sans-serif",
        cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
      },
      formatter: function (value) {
        return value + `%`;
      },
    },
  },
  series: [
    {
      name: "BHA M87",
      data: [
        0.00079,
        0.00035,
        0.00019,
        0.00018,
        0.00019
      ],
      color: "#b91c1c",
    },
    {
      name: "Schiit Audio Tyr",
      data: [
        0.0052,
        0.0027,
        0.004,
        0.0035,
        0.0039
      ],
      color: "#06b6d4",
    },
    {
      name: "Rotel Michi S5",
      data: [
        0.018,
        0.0065,
        0.0035,
        0.003,
        0.0028,
      ],
      color: "#c2410c",
    },
    {
      name: "Accustic Arts AMP V",
      data: [
        0.032,
        0.01,
        0.004,
        0.003,
        0.0032
      ],
      color: "#57534e",
    },
    {
      name: "NAD C 298",
      data: [
        0.0046,
        0.0015,
        0.00048,
        0.00045,
        0.0003
      ],
      color: "#1d4ed8",
    },
  ],
  chart: {
    sparkline: {
      enabled: false,
    },
    height: "700px",
    width: "100%",
    type: "area",
    fontFamily: "Oswald, sans-serif",
    dropShadow: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: true,
    x: {
      show: false,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
      shade: "#1C64F2",
      gradientToColors: ["#1C64F2"],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 2,
  },
  legend: {
    show: true,
  },
  grid: {
    show: true,
  },
};

if (
  document.getElementById("labels-chart") &&
  typeof ApexCharts !== "undefined"
) {
  const chart = new ApexCharts(
    document.getElementById("labels-chart"),
    options
  );
  chart.render();
}

// HighCharts
// const charTextStyle = {
//   color: "#4b5563",
// };
// const chartOptions = {
//   chart: {
//     type: "line",
//     backgroundColor: "transparent",
//   },
//   title: {
//     style: {
//       ...charTextStyle,
//     },
//     text: ``,
//   },
//   xAxis: {
//     categories: ["0.1", "1.0", "10.0", "100"],
//     labels: {
//       style: {
//         ...charTextStyle,
//       },
//     },
//   },
//   yAxis: {
//     title: {
//       style: {
//         ...charTextStyle,
//       },
//       text: "THD+N",
//     },
//     labels: {
//       style: {
//         ...charTextStyle,
//       },
//     },
//     gridLineColor: "#4b5563",
//   },
//   legend: {
//     itemStyle: {
//       ...charTextStyle,
//     },
//   },
//   series: [
//     {
//       color: "#dc2626",
//       name: "Black Hole Audio - M87",
//       data: [0.01, 0.003, 0.002],
//     },
//   ],
// };
// Highcharts.chart("chart-container", chartOptions);
