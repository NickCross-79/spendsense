import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { categoryColor, CHART_INK } from '../../theme/chartColors.js';
import { categoryLabel, formatMoney } from '../../constants.js';

// Draws the headline number in the doughnut hole so the chart reads as a
// stat, not decoration.
const centerLabelPlugin = {
    id: 'centerLabel',
    afterDraw(chart, args, options) {
        const meta = chart.getDatasetMeta(0);
        if (!meta.data[0]) return;
        const { x, y } = meta.data[0];
        const { ctx } = chart;
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `700 26px ${options.fontFamily}`;
        ctx.fillStyle = options.primaryColor;
        ctx.fillText(options.line1, x, y - 10);
        ctx.font = `600 12px ${options.fontFamily}`;
        ctx.fillStyle = options.secondaryColor;
        ctx.fillText(options.line2, x, y + 14);
        ctx.restore();
    },
};

// Doughnut of expense share by category (fractions of total income).
// Colors come from the fixed, validated category palette; the white 2px
// border is the spacer between segments, and identity is never
// color-alone: the legend and tooltips carry visible text labels.
const BudgetGraph = ({ data, spent, incomeTotal }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const types = Object.keys(data);
        const values = types.map(type => Math.max(Number(data[type]) * 100, 0));

        const hasIncome = incomeTotal > 0;
        const centerLine1 = hasIncome ? `${Math.round((spent / incomeTotal) * 100)}%` : formatMoney(spent);
        const centerLine2 = hasIncome ? 'of income spent' : 'spent';

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
                    centerLabel: {
                        line1: centerLine1,
                        line2: centerLine2,
                        primaryColor: CHART_INK.primary,
                        secondaryColor: CHART_INK.secondary,
                        fontFamily: 'Inter, system-ui, sans-serif',
                    },
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
            plugins: [centerLabelPlugin],
        });

        return () => chart.destroy();
    }, [data, spent, incomeTotal]);

    return (
        <div className="budget-graph">
            <canvas ref={canvasRef} role="img" aria-label="Breakdown of spending by category as a share of income" />
        </div>
    );
};

export default BudgetGraph;
