import main_logo from '../../static/img/main-logo.svg'
import { Dropdown, message, Space , Select , Button , Menu} from 'antd'
import { CaretDownOutlined } from '@ant-design/icons';
import loginImg from '../../static/img/login.svg'
import { useNavigate } from 'react-router-dom';
function Header(){
    const { Option } = Select;
    let navigate = useNavigate();
    const onClick = ({ key }) => {
        message.info(`Click on item ${key}`);
      };
      const handleChange = (value) => {
        console.log(`selected ${value}`);
      };
      const menu = (
        <Menu className='menu'>
          <Menu.Item>item 1</Menu.Item>
          <Menu.Item>item 2</Menu.Item>
        </Menu>
      );
      const login = () => {
        navigate('/authorization/login' , { replace: true })
      }
    return(
        <div className='header row space-between'>
            <img src={main_logo}/>
            <div className='header-menu'>
                <a>Главная</a>
                <Dropdown
                    overlay={menu}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            Продукты
                        </Space>
                    </a>
                </Dropdown>
                <a>Цена</a>
                <a>Создать аккаунт</a>
                <Select
                    defaultValue="ru"
                    onChange={handleChange}
                    suffixIcon={<CaretDownOutlined />}
                >
                    <Option id="same-select-option" className="same-select-option" value="ru">RU</Option>
                    <Option id="same-select-option" className="same-select-option" value="kz">KZ</Option>
                    <Option id="same-select-option" className="same-select-option" value="en">EN</Option>
                </Select>
                <Button type="primary" onClick={login}>
                    <img src={loginImg}/>
                    Войти
                </Button>

            </div>
        </div>
    )
}
export default Header