const watermarkText = '@PeruvianBull';
const watermarkFontSize = 48;
const watermarkFontColor = 'rgba(0, 0, 0, 0.1)';
const RRPDATAFILE = './RRP.json';

const main = async()=>{
	const data = await fetch(RRPDATAFILE).then( d => d.json() );
	
	const newData = data.map(entry => {
		const quarter = convertToQuarter(entry.DATE);
		return {
			...entry,
			QUARTER: quarter
		};
	});
	
	// const dates = data.map(d => d.DATE);
	const dates = newData.map(d => d.QUARTER);
	const rrpointsyaward = newData.map(d => d.RRPONTSYAWARD);
	const rrpointsyd = newData.map(d => d.RRPONTSYD);
	
	const watermarkPlugin = {
			id: 'watermark',
			beforeDraw: function (chart, args, options) {
					const ctx = chart.ctx;
					const width = chart.width;
					const height = chart.height;
					ctx.save();
					ctx.font = watermarkFontSize + 'px Arial';
					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';
					ctx.fillStyle = watermarkFontColor;
					ctx.fillText(watermarkText, width / 2, height / 2);
					ctx.restore();
			}
	};
	
	Chart.register(watermarkPlugin);
	
	function convertToQuarter(dateString) {
		const date = new Date(dateString);
		const month = date.getMonth();
		const year = date.getFullYear().toString().slice(-2);
		let quarter;
	
		if (month < 3) {
			quarter = `${year} Q1`;
		} else if (month < 6) {
			quarter = `${year} Q2`;
		} else if (month < 9) {
			quarter = `${year} Q3`;
		} else {
			quarter = `${year} Q4`;
		}
	
		return quarter;
	}
	
	
	const datasets = [];
	datasets.push({
	 label: 'RRP Awards',
	 data: rrpointsyaward,
	 borderColor: 'rgba(75, 192, 192, 1)',
	 borderWidth: 2,
	 pointRadius: 0,
	 backgroundColor: 'rgba(75, 192, 192, 0.2)',
	 fill: false,
	 yAxisID: 'y1',
	});
	datasets.push({
	 label: 'RRP',
	 data: rrpointsyd,
	 borderColor: 'rgba(255, 99, 132, 1)',
	 borderWidth: 2,
	 pointRadius: 0,
	 backgroundColor: 'rgba(255, 99, 132, 0.2)',
	 fill: false,
	 yAxisID: 'y2',
	});
	const config = {
			type: 'line',
			data: {
			 labels: dates,
			 datasets,
			},
			options: {
					scales: {
							y1: {
									type: 'linear',
									position: 'right',
									beginAtZero: true,
									grid: { drawOnChartArea: false },
									ticks: {
											callback: function(value, index, values) {
													return value.toFixed(1) + '%';
											}
									}
							},
							y2: {
									type: 'linear',
									position: 'left',
									beginAtZero: true,
									ticks: {
											callback: function(value, index, values) {
													if (value >= 1000000) {
															value = '$' + (value / 1000000).toFixed(1) + 'b';
													} else if (value >= 1000) {
															value = '$' + (value / 1000).toFixed(1) + 'm';
													} else {
															value = '$' + value + 'k';
													}
													return value;
											}
									}
							},
					},
					plugins:[
						watermarkPlugin,
						{ id:"zoom",
						zoom: {
							 zoom: {
								 wheel: {
									 enabled: true,
								 },
								 pinch: {
									 enabled: true
								 },
								 mode: 'x',
							 }
						 }
						}
				 ]
			},
	};
	
	const ctx = document.getElementById('myChart').getContext('2d');
	const myChart = new Chart(ctx, config);
};

main();