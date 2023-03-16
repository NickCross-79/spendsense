import { useEffect, useState } from "react";
import SendRequest from "../../util/sendRequest";

const RightImage = () => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [isHidden, setIsHidden] = useState(false);
    const [loginSignUp, setLoginSignUp] = useState("Sign Up");

    async function handleSubmit(e) {
        e.preventDefault();
        const authRequest = {
            userEmail: email,
            userPassword: password
        };
        const response = await SendRequest.postReq("/user/authenticate", authRequest);

        if(response == true){
            window.location.replace("http://localhost:3000/overview");
        }
        console.log("form submit");

    }

    async function handleSignUp (e) {
        e.preventDefault();

        const newUser = {
            userEmail: email,
            userPassword: password,
            firstName: firstName,
            lastName: lastName
        };

        const authRequest = {
            userEmail: email,
            userPassword: password
        };

        await SendRequest.postReq("/register", newUser);
        
        await SendRequest.postReq("/user/authenticate", authRequest);

        window.location.replace("http://localhost:3000/overview");

    }

    function signUpSwitch() {
        setIsHidden(!isHidden);

        if(loginSignUp == "Login")
            setLoginSignUp("Sign Up");
        else 
            setLoginSignUp("Login");
    }

    return ( 
        <div className="login-page_right-image_container">
            <div className="login-page_right-image">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                    {isHidden && <>
                        <label className="inputLabel">First Name</label>
                        <input
                            type="text"
                            required
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <label className="inputLabel">Last Name</label>
                        <input
                            type="text"
                            required
                            onChange={e => setLastName(e.target.value)}
                        />
                    </>}
                    <label className="inputLabel">Email</label>
                    <input
                        type="text"
                        required
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label className="inputLabel">Password</label>
                    <input 
                        type="password"
                        required
                        onChange={e => setPassword(e.target.value)}
                    />
                    {isHidden && <>
                        <label className="inputLabel">Confirm Password</label>
                        <input 
                            type="password"
                            required
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button type="button" onClick={e => handleSignUp(e)}>Sign Up</button>
                    </>}
                    
                    {!isHidden && <>
                        <button>Login</button>
                        <p>New User?</p>
                    </>}
                    <a onClick={e =>signUpSwitch()} style={{cursor:"pointer"}}>{loginSignUp}</a>
                </form>
            </div>
        </div>
     );
}
 
export default RightImage;