import { Input , Select} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FaCaretDown} from 'react-icons/fa';
import search_icon from '../../static/img/search-icon.svg'
import axios from 'axios'
import { connect } from 'react-redux';
import {payment} from '../../store/actions/authActions' 
import {bindActionCreators} from 'redux'
import { useEffect , useState} from 'react';
import { useNavigate , Redirect, Link} from 'react-router-dom';
import CreateCaseModal from './CreateCaseModal';
function ListHeader({handleChange , url , paymentAction }){
    const [isModalOpen, setIsModalOpen] = useState(false);
    let navigate = useNavigate();
    const { Option } = Select;
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
      };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        if(url.length > 3){
            window.location.replace(url)
        }
    } , [url])
    return (
        <div className="list-header">
            <div className="list-header-top row space-between">
                <h2>Список пациентов</h2>
                <button onClick={showModal} className="button">Начать исследование</button>
                {/* <button onClick={paymentAction}>Оплатить</button> */}
            </div>
            <CreateCaseModal isOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel}/>
            <div className="list-header-bottom row space-between">
                <Input placeholder="Поиск..." prefix={<img src={search_icon} />} />
                <div className='page-size-select row space-between'>
                    <p>Показывать по:</p>
                    <Select
                        defaultValue="5"
                        onChange={handleChange}
                        suffixIcon= {<FaCaretDown/>}
                    >
                        <Option value={1}>1</Option>
                        <Option value={2}>2</Option>
                        <Option value={5}>5</Option>
                        <Option value={10}>10</Option>
                    </Select>
                </div>
            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    paymentAction: bindActionCreators(payment , dispatch),
})
const mapStateToProps = state => ({
    url: state.authReducers.url
})
export default connect(mapStateToProps , mapDispatchToProps)(ListHeader)