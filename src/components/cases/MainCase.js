import Header from '../Header'
import ListPatients from './ListPatients'
import { useNavigate } from 'react-router-dom';
import { useEffect} from 'react';
import { getUserCases } from '../../store/actions/casesActions';
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';
function MainCase({getUserCasesAction , allCases}){
    let navigate = useNavigate();
    let user = localStorage.getItem("token");
    useEffect(() => {
        if(!user){
            navigate('/' , {replace : true})
        }else{
            getUserCasesAction()
        }

    } , [])
    useEffect(() => {
    } , [allCases])
    return(
        <div className='main-case'>
            <Header auth={true}/>
            <ListPatients allCases={allCases}/>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    getUserCasesAction: bindActionCreators(getUserCases , dispatch),
})
  const mapStateToProps = state => ({
    allCases: state.casesReducers.allCases
})
export default connect(mapStateToProps , mapDispatchToProps)(MainCase)