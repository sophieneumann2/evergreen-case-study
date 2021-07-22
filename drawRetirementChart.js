const canvas = document.getElementById('chart');
const context = canvas.getContext('2d');

const myChart = new Chart(canvas, {
  type: 'bar',
  data: {
    labels: ['Deine Rente'],
    datasets: [
      {
        label: 'Gesetzliche Rente',
        data: [Math.round(retirementBrutto)],
        backgroundColor: '#D6E9C6'
      },
      {
        label: 'Rentenlücke',
        data: [Math.round(retirementGap)],
        backgroundColor: '#EBCCD1'
      }
    ]
  },
  options: {
    scales: {
      xAxes: [{ stacked: true }],
      yAxes: [{ stacked: true }]
    }
  }
});

function updateChart(myChart) {
  myChart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
  });
  myChart.data.datasets[0].data.push(Math.round(retirementBrutto));
  myChart.data.datasets[1].data.push(Math.round(retirementGap));
  myChart.update();
  console.dir(myChart);
}
