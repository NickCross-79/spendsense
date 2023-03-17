import Logo from './Logo'

function Nav() {
    return (
        <div className="row" id='nav'>
            <Logo />
            <a href='http://localhost:3000/overview'>Overview</a>
            <a href='http://localhost:3000/create-budget'>Create Budget</a>
        </div>
    )
}

export default Nav;