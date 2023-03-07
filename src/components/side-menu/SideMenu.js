import AccountBalance from "./AccountBalance";

function importAll(r){
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../../icons', false, /\.(png|jpe?g|svg)$/));

const SideMenu = () => {
    return ( 
        <div className="side-menu">
            <p>Account</p>
            <img src={images['icon_profile_.png']} alt="Profile" />
            <AccountBalance />
        </div>
     );
}
 
export default SideMenu;