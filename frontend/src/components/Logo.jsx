const Logo = () => {
    return (
        <span className="logo-lockup">
            <svg className="logo-mark" viewBox="0 0 64 64" aria-hidden="true">
                <defs>
                    <linearGradient id="logo-gradient" x1="0" y1="1" x2="1" y2="0">
                        <stop offset="0%" stopColor="#5500FF" />
                        <stop offset="100%" stopColor="#D0B9FF" />
                    </linearGradient>
                </defs>
                <rect width="64" height="64" rx="14" fill="url(#logo-gradient)" />
                <text x="32" y="44" fontFamily="Inter, system-ui, sans-serif" fontSize="34" fontWeight="700" fill="#ffffff" textAnchor="middle">$</text>
            </svg>
            <span className="logo">SpendSense</span>
        </span>
    );
};

export default Logo;
