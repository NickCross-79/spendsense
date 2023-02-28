import Logo from './Logo'

function Nav() {
    return (
        <div className="nav">
            <Logo />
            <a style={{left: '378px'}}>Overview</a>
            <a style={{left: '502px'}}>Budget</a>
            <a style={{left: '612px'}}>Account</a>
        </div>
    )
}

export default Nav;