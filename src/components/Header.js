import logo from '../static/img/logo.svg'
import { Dropdown, Space } from 'antd';
import { Select } from 'antd';
import { FaUserAlt , FaBell , FaQuestionCircle , FaCaretDown} from 'react-icons/fa';
import { CaretDownOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
const items = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ];
function Header({auth}){
    const { Option } = Select;
    const handleChange = (value) => {
    };
    const change = (e) => {
        e.target.style.color = 'red'
    }
    const logout = () =>{
        let token = localStorage.getItem('token')
        if(token){
            localStorage.removeItem('token')
        }
    }
    return(
        <header>
            <div className="header-logo">
                <Link to="/cases"><img src={logo} alt="Logo"/></Link>
            </div>
            {!auth ? 
                <div className='header-menu'>
                    <div className='head-menu-item'>
                        <FaQuestionCircle/>
                        <span>FAQ</span>
                    </div>
                    <div className='head-menu-item'>
                        <FaBell/>
                        <span>Оповещения</span>
                    </div>
                    <Link className='head-menu-item' to="/authorization/login">
                            <FaUserAlt/>
                            <span>Войти</span>
                    </Link>
                    <Select
                    defaultValue="ru"
                    onChange={handleChange}
                    suffixIcon={<CaretDownOutlined />}
                >
                    <Option id="same-select-option" className="same-select-option" value="ru">RU</Option>
                    <Option id="same-select-option" className="same-select-option" value="kz">KZ</Option>
                    <Option id="same-select-option" className="same-select-option" value="en">EN</Option>
                </Select>
                </div>
            : 
                <div className='header-menu'>    
                    <Link className='head-menu-item' to="/authorization/login">
                            <FaUserAlt/>
                            <span>Нурайлым</span>
                    </Link>
                    <Link className='head-menu-item' to="/authorization/login">
                        <span onClick={logout}>Выход</span>
                    </Link>
                    <Select
                    defaultValue="ru"
                    onChange={handleChange}
                    suffixIcon={<CaretDownOutlined />}
                >
                    <Option id="same-select-option" className="same-select-option" value="ru">RU</Option>
                    <Option id="same-select-option" className="same-select-option" value="kz">KZ</Option>
                    <Option id="same-select-option" className="same-select-option" value="en">EN</Option>
                </Select>
                </div>
            }
        </header>
    )
}
export default Header
