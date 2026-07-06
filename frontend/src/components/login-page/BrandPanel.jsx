import logo from '../../assets/images/logo.png';

const BrandPanel = () => {
    return (
        <section className="login-brand" aria-hidden="true">
            <img className="login-brand_logo" src={logo} alt="SpendSense" />
            <ul className="login-brand_features">
                <li>Track budgets, incomes, and expenses in one place</li>
                <li>See where every dollar goes with clear visual breakdowns</li>
                <li>Connect your bank and import transactions automatically</li>
            </ul>
        </section>
    );
};

export default BrandPanel;
