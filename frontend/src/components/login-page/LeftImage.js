import logo from '../../assets/images/logo.png';
import features from '../../assets/images/features.png';

const LeftImage = () => {
    return ( 
        <div className="login-page_left-image">
            <img src={logo} alt="Logo" />
            <img src={features} alt="Features" />
        </div>
     );
}
 
export default LeftImage;