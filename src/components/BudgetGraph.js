import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

const BudgetGraph = (props) => {
    
    const chartRef = useRef(null);

    useEffect(() => {
        const myChartRef = chartRef.current.getContext('2d');

        new Chart(myChartRef, {
            type: 'doughnut',
            data:{
                labels: props.expenseTypes,
                datasets: [
                    {
                        label: 'Budget',
                        data: props.data,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            hoverOffset: 4
        })
    },[]);

    return ( 
        <canvas ref={chartRef} />
    );
}
 
export default BudgetGraph;