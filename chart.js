import data from './RRP.json';

const dates = data.map(d => d.DATE);
const rrpointsyaward = data.map(d => d.RRPONTSYAWARD);
const rrpointsyd = data.map(d => d.RRPONTSYD);

const datasets = [];
datasets.push({
 label: 'RRP Awards',
 data: rrpointsyaward,
 borderColor: 'rgba(75, 192, 192, 1)',
 backgroundColor: 'rgba(75, 192, 192, 0.2)',
 fill: false,
});
datasets.push({
 label: 'RRP',
 data: rrpointsyd,
 borderColor: 'rgba(255, 99, 132, 1)',
 backgroundColor: 'rgba(255, 99, 132, 0.2)',
 fill: false,
});
const config = {
    type: 'line',
    data: {
     labels: dates,
     datasets,
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
};

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, config);