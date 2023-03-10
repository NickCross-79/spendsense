import { useState } from "react";
import SendRequest from "../../util/sendRequest";

const RightImage = () => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("submitted");
        const authRequest = {
            userEmail: email,
            userPassword: password
        };
        console.log(authRequest);
        const response = await SendRequest.postReq("/user/authenticate", authRequest);
        console.log(response);

        if(response == true){
            window.location.replace("http://localhost:3000/overview");
        }

    }

    return ( 
        <div className="login-page_right-image_container">
            <div className="login-page_right-image">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        required
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        type="password"
                        required
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button>Login</button>
                    <p>New User?</p>
                    <a href="/login">Sign Up</a>
                </form>
            </div>
        </div>
     );
}
 
export default RightImage;