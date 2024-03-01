// Flow
const options = {
  // set the labels option to true to show the labels on the X and Y axis
  series: [
    {
      name: "BHA M87",
      data: [
        { x: '0.1', y: 0.00794 },
        { x: '1.0', y: 0.00354 },
        { x: '10.0', y: 0.00199 },
        { x: '100.0', y: 0.00019 }
      ],
      color: "#000",
      line: {
        // Customize the appearance of this series
        width: 3, // Make the line thicker
        dashArray: 5, // Make the line dashed
        colors: ['#ff0000'] // Set a custom color for the line
      },
      zIndex: 13
    },
    {
      name: "NAD C 298",
      data: [
        { x: '0.1', y: 0.0046 },
        { x: '1.0', y: 0.0015 },
        { x: '10.0', y: 0.0004 },
        { x: '100.0', y: 0.0003 }
      ],
      color: "#ca8a04",
    },
    {
      name: "Accustic Arts AMP V",
      data: [
        { x: '0.1', y: 0.0320 },
        { x: '1.0', y: 0.0100 },
        { x: '10.0', y: 0.0040 },
        { x: '100.0', y: 0.0032 }
      ],
      color: "#78716c",
    },
    {
      name: "Rotel Michi S5",
      data: [
        { x: '0.1', y: 0.0180 },
        { x: '1.0', y: 0.0065 },
        { x: '10.0', y: 0.0035 },
        { x: '100.0', y: 0.0028 }
      ],
      color: "#f97316",
    },
    {
      name: "Schiit Audio Tyr",
      data: [
        { x: '0.1', y: 0.0052 },
        { x: '1.0', y: 0.0027 },
        { x: '10.0', y: 0.0040 },
        { x: '100.0', y: 0.0039 }
      ],
      color: "#93c5fd",
    },
    {
      name: "Simaudio Moon 860A",
      data: [
        { x: '0.1', y: 0.0097 },
        { x: '1.0', y: 0.0060 },
        { x: '10.0', y: 0.0097 },
        { x: '100.0', y: 0.0290 }
      ],
      color: "#84cc16",
    },
    {
      name: "Mcintosh MAC7200",
      data: [
        { x: '0.1', y: 0.0700 },
        { x: '1.0', y: 0.0240 },
        { x: '10.0', y: 0.0075 },
        { x: '100.0', y: 0.0025 }
      ],
      color: "#facc15",
    },
    {
      name: "Mark Levinson #85",
      data: [
        { x: '0.1', y: 0.0400 },
        { x: '1.0', y: 0.0120 },
        { x: '10.0', y: 0.0047 },
        { x: '100.0', y: 0.0050 }
      ],
      color: "#9ca3af",
    },
  ],
  xaxis: {
    // categories: ['0.1', '1.0', '10.0', '50.0', '100.0'],
    categories: ['0.1', '1.0', '10.0', '100.0'],
   
    show: true,
    labels: {
      show: true,
      style: {
        cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        fontFamily: "Oswald, sans-serif",
        style: {
          fontSize: '12px' // Adjust font size for y-axis labels
        },
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    title: {
      text: 'Power (W)',
      style: {
        fontSize: '14px',
        color: '#6b7280'
      },
      offsetY: 5,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    // categories: ['0.000', '0.0001', '0.0010', '0.0100', '0.1000'],
    // categories: [0.0000, 0.0001, 0.0010, 0.0100, 0.1000],
    tickAmount: 2,
    yaxis: {
      min: 0.000, // Initial y-axis minimum
      max: 0.1000 // Initial y-axis maximum
    },
    show: true,
    labels: {
      show: true,
      style: {
        fontFamily: "Oswald, sans-serif",
        cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
      },
      formatter: function (value) {
        return value.toFixed(4) + `%`;
      },
      decimalsInFloat: 4,
    },
    title: {
      text: 'THD+N',
      style: {
        fontSize: '14px',
        color: '#6b7280'
      },
      offsetX: -5,
    },
    // tickPlacement: 'on'
  },
  chart: {
    sparkline: {
      enabled: false,
    },
    height: "575px",
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
    width: [6, 2, 2, 2, 2, 2, 2],
    dashArray: [6, 0, 0, 0, 0, 0, 0]
  },
  legend: {
    position: "top",
    horizontalAlign: "center",
    offsetX: -10
  },
  grid: {
    show: true,
    padding: {
      top: 2,
      right: 2,
      bottom: 2,
      left: 2,
    }
  },
};

if (document.getElementById("bh-thd-noise__area-chart") && typeof ApexCharts !== 'undefined') {
  const chart = new ApexCharts(document.getElementById("bh-thd-noise__area-chart"), options);
  //chart.zoomX('0.1', '100.0');
  chart.render();
}