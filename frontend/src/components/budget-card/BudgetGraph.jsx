import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { categoryColor, CHART_INK } from '../../theme/chartColors.js';
import { categoryLabel } from '../../constants.js';

// Doughnut of expense share by category (fractions of total income).
// Colors come from the fixed, validated category palette; the white 2px
// border is the spacer between segments, and identity is never
// color-alone: the legend and tooltips carry visible text labels.
const BudgetGraph = ({ data }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const types = Object.keys(data);
        const values = types.map(type => Math.max(Number(data[type]) * 100, 0));

        const chart = new Chart(canvasRef.current.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: types.map(categoryLabel),
                datasets: [{
                    data: values,
                    backgroundColor: types.map(categoryColor),
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    hoverOffset: 8,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '68%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            boxHeight: 12,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            color: CHART_INK.secondary,
                            font: { family: 'Inter, system-ui, sans-serif', size: 12 },
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: context => ` ${context.label}: ${context.parsed.toFixed(1)}% of income`,
                        },
                    },
                },
            },
        });

        return () => chart.destroy();
    }, [data]);

    return (
        <div className="budget-graph">
            <canvas ref={canvasRef} role="img" aria-label="Breakdown of spending by category as a share of income" />
        </div>
    );
};

export default BudgetGraph;
