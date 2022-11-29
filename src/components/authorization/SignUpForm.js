import {EyeOutlined  , EyeInvisibleOutlined , QuestionCircleFilled ,IdcardOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Input , Tooltip , Checkbox , Button , Form} from 'antd';
import idCard from '../../static/img/id-card.svg'
import envelope from '../../static/img/envelope.svg'
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {registerUser} from '../../store/actions/authActions' 
import {bindActionCreators} from 'redux'
import { useNavigate } from 'react-router-dom';
function SignUpForm({registerUserAction , user}){
    let navigate = useNavigate();
    const [email , setEmail] = useState('')
    const [lastName , setLastName] = useState('')
    const [firstName , setFirstName] = useState('')
    const [clinicName , setClinicName] = useState('')
    const [password , setPassword] = useState('')
    const [matchingPassword , setMatchingPassword] = useState('')
    const [checked , setChecked] = useState(false)
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const onChangeSurname = (e) => {
        setLastName(e.target.value)
    }
    const onChangeName = (e) => {
        setFirstName(e.target.value)
    }
    const onChangeCompanyName = (e) => {
        setClinicName(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const onChangeRepeatPassword = (e) => {
        setMatchingPassword(e.target.value)
    }
    const onChangeCheck = () => {
        setChecked(!checked)
    }
    const register = () => {
        registerUserAction({email , lastName , firstName , clinicName , password , matchingPassword , checked});
    }
    useEffect(() => {
        if(user.id){
            navigate(`/authorization/login`, { replace: true })
        }
    } , [user]) 
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
    return(
        <div className="signup-form form signin-form">
            <h2>Создайте аккаунт</h2>
            <Form direction="vertical" validateMessages={validateMessages} onFinish={register}>
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
                    onChange={onChangeEmail}
                    value={email}
                    rules={[
                        {
                          type: 'email',
                          required : true
                        },
                    ]}
                    label="email"
                />
            </Form.Item>
            <Form.Item
                name={'lastName'}
                rules={[
                    {
                        required: true
                    },
                ]}
            >
                <Input 
                    suffix={<IdcardOutlined />} 
                    placeholder="Фамилия"
                    addonAfter={
                        <Tooltip placement="right" title={<span>Введите фамилию</span>}>
                            <QuestionCircleFilled />
                        </Tooltip>
                    }
                    onChange={onChangeSurname}
                    value={lastName}
                />
            </Form.Item>
            <Form.Item
                name={'firstName'}
                rules={[
                    {
                        required: true
                    },
                ]}
            >
                <Input 
                    suffix={<IdcardOutlined />} 
                    placeholder="Имя"
                    addonAfter={
                        <Tooltip placement="right" title={<span>Введите имя</span>}>
                            <QuestionCircleFilled />
                        </Tooltip>
                    }
                    onChange={onChangeName}
                    value={firstName}
                />
            </Form.Item>
            <Form.Item
                name={'clinicName'}
                rules={[
                    {
                        required: true
                    },
                ]}
            >
                <Input 
                    suffix={<IdcardOutlined />} 
                    placeholder="Название компании"
                    addonAfter={
                        <Tooltip placement="right" title={<span>Введите название <br/>компании</span>}>
                            <QuestionCircleFilled />
                        </Tooltip>
                    }
                    onChange={onChangeCompanyName}
                    value={clinicName}
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
                    placeholder="Придумайте пароль"
                    iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                    addonAfter={
                        <Tooltip placement="right" title={<span>Введите пароль</span>}>
                            <QuestionCircleFilled />
                        </Tooltip>
                    }
                    onChange={onChangePassword}
                    value={password}
                />
            </Form.Item>
            <Form.Item
                name={'matchingPassword'}
                rules={[
                    {
                        required: true
                    },
                ]}
            >
                <Input.Password
                    placeholder="Повторите пароль"
                    iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                    addonAfter={
                        <Tooltip placement="right" title={<span>Повторите пароль</span>}>
                            <QuestionCircleFilled />
                        </Tooltip>
                    }
                    onChange={onChangeRepeatPassword}
                    value={matchingPassword}
                />
            </Form.Item>
            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                {
                    validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                },
                ]}
            >
                <Checkbox checked={checked} onChange={onChangeCheck}>
                    Я принимаю условия <a href="">Пользовательского соглашения</a> и <a href=''>Политику конфиденциальности </a>
                </Checkbox>
            </Form.Item>
                <Button type="primary" htmlType="submit" className='button' block>
                    Зарегистрироваться
                </Button>
                <p>Уже есть аккаунт? <Link to="/authorization/login">Войдите</Link></p>
            </Form>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    registerUserAction: bindActionCreators(registerUser , dispatch),
})
const mapStateToProps = state => ({
    user: state.authReducers.user
})
export default connect(mapStateToProps , mapDispatchToProps)(SignUpForm)