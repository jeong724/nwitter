import { useState } from "react";
import { authService } from "fbase";

const Auth = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        //console.log(event.target.name);
        const {
            target : {name, value},
        } = event;
        if(name == "email"){
            setEmail(value);
            console.log(value)
        } else if(name == "password"){
            setPassword(value);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try
        {
            let data;
            if(newAccount){
                data = await authService.createUserWithEmailAndPassword(email, password);
        }else{
            data = await authService.signInWithEmailAndPassword(email, password);
        }
        console.log(data);
    } catch(error){
        setError(error.message);
    }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input
                name="email"
                type="email" 
                placeholder="Email" 
                required
                value={email}
                onChange={onChange} 
                />
                <input 
                name="password"
                type="password" placeholder="Password" required 
                value={password}
                onChange={onChange}
                />
                <input type="submit" value={newAccount ? "create account" : "log in"}/>
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
        <div>
            <button>Continue with Google</button>
            <button>Continue with Github</button>
            </div>
            </div>
    );
};

export default Auth;