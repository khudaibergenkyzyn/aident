import {EyeOutlined , EyeTwoTone , EyeInvisibleOutlined, QuestionCircleFilled } from '@ant-design/icons';
import { Input, Space , Tooltip , Checkbox , Button , Form} from 'antd';
import { connect } from 'react-redux';
import {loginUser} from '../../store/actions/authActions' 
import {bindActionCreators} from 'redux'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import idCard from '../../static/img/id-card.svg'
import { useNavigate } from 'react-router-dom';
import envelope from '../../static/img/envelope.svg'
function SignInForm({user , loginUserAction}){
    let navigate = useNavigate();
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const validateMessages = {
        required: 'Это обязательное поле!',
        types: {
          email: '${label} заполнен некорректно',
          number: '${label} is not a valid number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
    };
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const signin = () => {
        loginUserAction({email , password})
    }
    useEffect(() => {
        if(localStorage.getItem("token")){
            navigate('/cases' , { replace: true })
        }
    } , [user])
    return(
        <div className="form signin-form signup-form">
            <h2>Войдите</h2>
            <Form direction="vertical" validateMessages={validateMessages} onFinish={signin}>
            <Form.Item
                name={'E-mail'}
                rules={[
                    {
                        type: 'email',
                        required: true
                    },
                ]}
            >
                <Input  
                    suffix={<img src={envelope} alt="envelope"/>} 
                    placeholder="E-mail"
                    addonAfter={
                        <Tooltip placement="right" title={<span>Введите адрес вашего почтового ящика.<br/>пример: Aident@gmail.com</span>}>
                            <QuestionCircleFilled />
                        </Tooltip>
                    }
                    value={email}
                    onChange={onChangeEmail}
                />
            </Form.Item>
            <Form.Item
                name={'password'}
                rules={[
                    {
                        required: true
                    },
                ]}
            >
                <Input.Password
                    placeholder="Введите пароль"
                    iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                    addonAfter={
                        <Tooltip placement="right" title={<span>Введите пароль</span>}>
                            <QuestionCircleFilled />
                        </Tooltip>
                    }
                    value={password}
                    onChange={onChangePassword}
                />
            </Form.Item>
                <div className='row space-between'>
                    <Checkbox>
                        Запомнить меня
                    </Checkbox>
                    <a>Забыли пароль?</a>
                </div>
                <Button type="primary" block htmlType='submit' className='button'>
                    Войти
                </Button>
                <p>Еще не создан аккаунт? <Link to="/authorization/register">Зарегистрируйтесь</Link></p>
            </Form>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    loginUserAction: bindActionCreators(loginUser , dispatch),
})
const mapStateToProps = state => ({
    user: state.authReducers.user
})
export default connect(mapStateToProps , mapDispatchToProps)(SignInForm)