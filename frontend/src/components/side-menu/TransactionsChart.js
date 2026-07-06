import {Line} from 'react-chartjs-2'
import { useEffect, useRef } from 'react';

const TransactionsChart = (props) => {

    const chartRef = useRef(null);

    const labels = Object.keys(props.totalTransactionsByDay);

    const data = {
        labels: labels,
        datasets: [{
            label: 'Transactions this month',
            data: Object.values(props.totalTransactionsByDay),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1
        }]
    };

    return ( 
        <Line data={data}/>
    );
}
 
export default TransactionsChart;