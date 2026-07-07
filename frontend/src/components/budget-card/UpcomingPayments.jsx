import { formatMoney } from '../../constants.js';

// Incomes sorted by their next payment date
const UpcomingPayments = ({ incomes }) => {
    const sorted = [...incomes].sort((a, b) => String(a.paymentDate).localeCompare(String(b.paymentDate)));

    return (
        <section className="card panel lift">
            <h3 className="panel_title">Upcoming payments</h3>
            {sorted.length === 0 && <p className="panel_empty">Add incomes to see upcoming payments.</p>}
            <ul className="upcoming-payments">
                {sorted.map(income => (
                    <li key={income._id} className="upcoming-payments_row">
                        <div className="upcoming-payments_text">
                            <span className="upcoming-payments_name">{income.incomeName}</span>
                            <span className="upcoming-payments_meta">{income.paymentDate} · {income.incomeFrequency}</span>
                        </div>
                        <span className="upcoming-payments_amount">+{formatMoney(income.incomeAmount)}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default UpcomingPayments;
