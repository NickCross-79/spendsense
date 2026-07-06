import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

const expenseTypeColors = {
    housing: 'rgba(93, 165, 218, 0.8)',
    transportation: 'rgba(125, 206, 160, 0.8)',
    food: 'rgba(255, 165, 0, 0.8)',
    healthcare: 'rgba(225, 67, 67, 0.8)',
    personal_care: 'rgba(128, 0, 128, 0.8)',
    entertainment: 'rgba(255, 173, 214, 0.8)',
    debt_repayment: 'rgba(169, 169, 169, 0.8)',
    savings: 'rgba(162, 116, 255, 0.8)',
    taxes: 'rgba(0, 0, 139, 0.8)',
    unspentIncome: 'rgba(138, 79, 255, 0.8)'
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
                        backgroundColor: backgroundColor(Object.keys(props.data)),
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
                    padding: 0
                },
                cutout: 80,
                width: 225,
                height: 225,
                radius: 100
            }
        }

        const myChartRef = chartRef.current.getContext('2d');

        var budgetChart = new Chart(myChartRef, chartConfig)

        return () => {budgetChart.destroy()}
    }, [props]);

    return (
        <canvas ref={chartRef} style={{marginLeft: '70px', width: '350px', height: '350px', alignSelf:'flex-end'}} />
    );
}
 
export default BudgetGraph;