import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

const expenseTypeColors = {
    housing: 'rgba(93, 165, 218, 1)',
    transportation: 'rgba(125, 206, 160, 1)',
    food: 'rgba(255, 165, 0, 1)',
    healthcare: 'rgba(225, 67, 67, 1)',
    personal_care: 'rgba(128, 0, 128, 1)',
    entertainment: 'rgba(255, 173, 214, 1)',
    debt_repayment: 'rgba(169, 169, 169, 1)',
    savings: 'rgba(162, 116, 255, 1)',
    taxes: 'rgba(0, 0, 139, 1)',
    unspentIncome: 'rgba(138, 79, 255, 1)'
}

const BudgetGraph = (props) => {
    
    const chartRef = useRef(null);

    const backgroundColor = (expenseTypes) => {
        return expenseTypes.map(expenseType => expenseTypeColors[expenseType] || 'rgba(0, 0, 0, 1)');
    }

    useEffect(() => {

        const chartConfig = {
            type: 'doughnut',
            data:{
                labels: Object.keys(props.data),
                datasets: [
                    {
                        label: 'Budget',
                        data: Object.values(props.data),
                        backgroundColor: backgroundColor(props.expenseTypes),
                        borderColor: 'rgba(0, 0, 0, 0)',
                        hoverOffset: 20
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 15,
                            boxHeight: 15
                        }
                    }
                },
                layout: {
                    autoPadding: true
                }
            }
        }

        const myChartRef = chartRef.current.getContext('2d');

        var budgetChart = new Chart(myChartRef, chartConfig)

        return () => {budgetChart.destroy()}
    }, [props]);

    return (
        <div style={{width: 397}}>
            <canvas ref={chartRef} />
        </div> 
    );
}
 
export default BudgetGraph;