import { Provider } from "react-redux";
import {Helmet} from "react-helmet";
import configureStore from './store'
import { Routes, Route} from "react-router-dom";
import Registration from "./components/authorization/Registration";
import Login from "./components/authorization/Login";
import Main from "./components/Main";
import MainCase from "./components/cases/MainCase";
import DetailPage from "./components/cases/detail/DetailPage";
import './trg'
const store = configureStore()
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/authorization/register" element={<Registration/>} />
            <Route path="/authorization/login" element={<Login/>} />
            <Route path="/cases" element={<MainCase/>} />
            <Route path="/cases/:id" element={<DetailPage/>} />
        </Routes>
      </div>  
    </Provider>
    
  );
}

export default App;
