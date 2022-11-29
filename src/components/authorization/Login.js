import Header from "../Header";
import SignInForm from "./SignInForm";
function Login(){
    return(
        <div>
            <Header auth={false}/>
            <SignInForm/>
        </div>
    )
}
export default Login