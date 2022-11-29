import {Modal , Button} from 'antd'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import {createCase} from '../../store/actions/casesActions'
import { useEffect } from 'react';
import {useParams , useLocation} from 'react-router-dom'
function CreateCaseModal({isOpen ,  handleOk , handleCancel , caseInfo , createCaseAction}){
    let navigate = useNavigate();
    const {id} = useParams()
    const openDetail = (type) => {
        createCaseAction(type)
        if(caseInfo.id){
            navigate(`/cases/${caseInfo.id + 1}`)

        }
    }
    useEffect(() => {
    } , [caseInfo])

    return(
        <div className='create-modal'>
            <Modal 
                open={isOpen} 
                onOk={handleOk} 
                onCancel={handleCancel}
                footer={
                    <Button onClick={handleCancel}>Отменить</Button>
                }
            >
                <h2>Выберите тип исследование</h2>
                <div className='row space-between'>
                    <div className='case-type-btn'>
                        <button onClick={() => openDetail('TRG')}>ТРГ</button>
                    </div>
                    <div className='case-type-btn'>
                        <button onClick={() => openDetail('klkt')}>КЛКТ</button>
                    </div>
                </div>
                <p>Выберите данную опцию чтобы <br/> добавить снимок</p>
            </Modal>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    createCaseAction: bindActionCreators(createCase , dispatch),
})
const mapStateToProps = state => ({
    caseInfo: state.casesReducers.caseInfo
})
export default connect(mapStateToProps , mapDispatchToProps)(CreateCaseModal)