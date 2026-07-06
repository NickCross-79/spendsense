import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { CHART_INK } from '../../theme/chartColors.js';

// Single-series line of spending per day of the month — brand purple,
// 2px line, recessive grid; no legend box (the heading names the series).
const TransactionsChart = ({ totalsByDay }) => {
    const days = Object.keys(totalsByDay);
    if (days.length === 0) return null;

    const data = {
        labels: days,
        datasets: [{
            label: 'Spent',
            data: Object.values(totalsByDay),
            borderColor: '#8a4fff',
            backgroundColor: '#8a4fff',
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointHitRadius: 12,
            tension: 0.3,
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    title: items => `Day ${items[0].label}`,
                },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: CHART_INK.secondary, font: { size: 11 } },
            },
            y: {
                grid: { color: CHART_INK.grid },
                border: { display: false },
                ticks: { color: CHART_INK.secondary, font: { size: 11 } },
            },
        },
    };

    return (
        <div className="transactions-chart">
            <h3>Spending this month</h3>
            <div className="transactions-chart_canvas">
                <Line data={data} options={options} aria-label="Line chart of spending per day this month" />
            </div>
        </div>
    );
};

export default TransactionsChart;
