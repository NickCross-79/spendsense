import Logo from './Logo'

const server = process.env.REACT_APP_SERVER_ADDRESS;
const port = process.env.REACT_APP_FRONTEND_PORT_NUMBER;

function Nav() {
    return (
        <div className="row" id='nav'>
            <Logo />
            <a href={server+':'+ port+ '/overview'}>Overview</a>
            <a href={server+':'+ port+ '/create-budget'}>Create Budget</a>
        </div>
    )
}

export default Nav;