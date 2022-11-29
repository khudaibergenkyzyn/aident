import Header from "../Header";
import SignUpForm from "./SignUpForm";
function Registration(){
    return(
        <div>
            <Header auth={false}/>
            <SignUpForm/>
        </div>
    )
}
export default Registration