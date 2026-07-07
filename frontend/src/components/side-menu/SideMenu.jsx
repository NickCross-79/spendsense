import { useEffect, useRef, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import api from '../../api/client.js';
import AccountBalance from './AccountBalance.jsx';
import TransactionsList from './TransactionsList.jsx';
import TransactionsChart from './TransactionsChart.jsx';
import './side-menu.css';

const POLL_INTERVAL_MS = 5000;
const MAX_POLLS = 24;

const SideMenu = ({ budgets, onImported }) => {
    const [linkToken, setLinkToken] = useState(null);
    const [unavailable, setUnavailable] = useState(false);
    const [pending, setPending] = useState(false);
    const [transactionData, setTransactionData] = useState(null);
    const [importBudgetId, setImportBudgetId] = useState('');
    const [importState, setImportState] = useState(null);
    const pollCount = useRef(0);
    const cancelled = useRef(false);

    useEffect(() => {
        cancelled.current = false;
        api.post('/plaid/create_link_token/me')
            .then(response => setLinkToken(response.data.link_token))
            .catch(() => setUnavailable(true));
        return () => { cancelled.current = true; };
    }, []);

    const pollTransactions = async (itemId, accessToken) => {
        if (cancelled.current) return;
        try {
            const response = await api.post('/user/transactions', {
                item_id: itemId,
                transactionRequest: { access_token: accessToken },
            });
            if (cancelled.current) return;
            if (response.data === false) {
                if (pollCount.current++ < MAX_POLLS) {
                    setTimeout(() => pollTransactions(itemId, accessToken), POLL_INTERVAL_MS);
                } else {
                    setPending(false);
                    setUnavailable(true);
                }
            } else {
                setPending(false);
                setTransactionData(response.data);
            }
        } catch {
            setPending(false);
            setUnavailable(true);
        }
    };

    const { open, ready } = usePlaidLink({
        token: linkToken,
        onSuccess: async (publicToken) => {
            try {
                const response = await api.post(`/plaid/exchange_public_token/${publicToken}`);
                setPending(true);
                pollCount.current = 0;
                pollTransactions(response.data.item_id, response.data.access_token);
            } catch {
                setUnavailable(true);
            }
        },
    });

    const handleImport = async () => {
        if (!importBudgetId || !transactionData?.transactions?.length) return;
        setImportState('working');
        try {
            await api.post(`/budget/${importBudgetId}/expenses/import`, {
                transactions: transactionData.transactions,
            });
            setImportState('done');
            onImported();
        } catch {
            setImportState('error');
        }
    };

    return (
        <aside className="side-menu">
            <h2 className="side-menu_title">Bank account</h2>

            {!transactionData && !pending && (
                <div className="side-menu_connect">
                    <svg className="side-menu_placeholder" viewBox="0 0 240 90" aria-hidden="true">
                        <rect x="0" y="0" width="240" height="90" rx="10" fill="#f2f0f9" />
                        <polyline
                            points="16,64 52,48 88,56 124,34 160,42 196,22 224,30"
                            fill="none"
                            stroke="#cfc6ea"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <circle cx="124" cy="34" r="4" fill="#cfc6ea" />
                        <circle cx="196" cy="22" r="4" fill="#cfc6ea" />
                    </svg>
                    <p>Link your bank to see balances and recent transactions.</p>
                    {unavailable ? (
                        <p className="side-menu_muted">Bank linking is currently unavailable.</p>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-primary"
                            disabled={!ready || !linkToken}
                            onClick={() => open()}
                        >
                            Connect bank account
                        </button>
                    )}
                </div>
            )}

            {pending && (
                <div className="side-menu_connect" role="status">
                    <div className="spinner" />
                    <p>Fetching your transactions — this can take a minute…</p>
                </div>
            )}

            {transactionData && (
                <>
                    <AccountBalance accounts={transactionData.accounts} />
                    <TransactionsChart totalsByDay={transactionData.totalTransactionsByDay} />
                    <TransactionsList transactions={transactionData.transactions} />

                    {budgets.length > 0 && (
                        <div className="side-menu_import">
                            <h3>Import into a budget</h3>
                            <p className="side-menu_muted">
                                Add these transactions to a budget as expenses.
                            </p>
                            <div className="side-menu_import-controls">
                                <label className="visually-hidden" htmlFor="importBudget">Budget</label>
                                <select
                                    id="importBudget"
                                    value={importBudgetId}
                                    onChange={e => { setImportBudgetId(e.target.value); setImportState(null); }}
                                >
                                    <option value="">Choose a budget</option>
                                    {budgets.map((budget, i) => (
                                        <option key={budget._id} value={budget._id}>Budget {i + 1}</option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-sm"
                                    disabled={!importBudgetId || importState === 'working'}
                                    onClick={handleImport}
                                >
                                    {importState === 'working' ? 'Importing…' : 'Import'}
                                </button>
                            </div>
                            {importState === 'done' && <p className="side-menu_success" role="status">Transactions imported.</p>}
                            {importState === 'error' && <p className="form-error" role="alert">Import failed — try again.</p>}
                        </div>
                    )}
                </>
            )}
        </aside>
    );
};

export default SideMenu;
