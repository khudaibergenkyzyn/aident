import {Navigate} from "react-router-dom";
import Header from "./Main/Header";
import MainHome from "./Main/MainHome";
import MainSolutions from "./Main/MainSolutions";
function Main(){
    return(
        <div className="main">
            <Header/>
            <MainHome/>
            <MainSolutions/>
        </div>
    )
}
export default Main