import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

const BudgetGraph = (props) => {
    
    const chartRef = useRef(null);

    useEffect(() => {
        const myChartRef = chartRef.current.getContext('2d');
        new Chart(myChartRef, {
            type: 'doughnut',
            data:{
                labels: Object.keys(props.data),
                datasets: [
                    {
                        label: 'Budget',
                        data: Object.values(props.data),
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        hoverOffset: 40
                    },
                ],
            }
        })
    },[]);

    return (
        <div style={{width: 225}}>
            <canvas ref={chartRef} />
        </div> 
    );
}
 
export default BudgetGraph;