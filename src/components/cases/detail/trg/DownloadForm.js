import { Input, Space , Tooltip , Checkbox , Button , Form , Select} from 'antd';
import {EyeOutlined , EyeTwoTone , EyeInvisibleOutlined , QuestionCircleFilled , CaretDownOutlined} from '@ant-design/icons';
import envelope from '../../../../static/img/envelope.svg'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';
import {updateCase} from '../../../../store/actions/casesActions'
import idCard from '../../../../static/img/id-card.svg'
import {useParams , useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react';
function DownloadForm({caseInfoDetail , updateCaseAction , caseInfo , nextStep}){
    const { Option } = Select;
    const {id} = useParams()
    const [lastName , setLastName] = useState('')
    const [firstName , setFirstName ] = useState()
    const [patientGender , setPatientGender ] = useState('')
    const [patientAge , setPatientAge] = useState('')
    const [doctorFullName , setDoctorFullName] = useState('')
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
    const onChangeGender = (value) => {
        setPatientGender(value)
      };
    const onChangeDoctorName = (e) => {
        setDoctorFullName(e.target.value)
    }
    const onChangeLastName = (e) => {
        setLastName(e.target.value)
    }
    const onChangeName = (e) => {
        setFirstName(e.target.value)
    }
    const sendData = () => {
        updateCaseAction({patientLastName: lastName , patientFirstName : firstName , id: id , patientGender , patientAge , doctorFullName})
        nextStep()
    }
    const onChangePatienAge = (e) => {
        setPatientAge(e.target.value)
    }
    useEffect(() => {
        setFirstName(caseInfoDetail.patientFirstName)
        setLastName(caseInfoDetail.patientLastName)
        setPatientGender(caseInfoDetail.patientGender)
        setPatientAge(caseInfoDetail.patientAge)
        setDoctorFullName(caseInfoDetail.doctorFullName)
    } , [caseInfoDetail])
    return(
        <div className='info-form'>
            <h2>Информация о пациенте</h2>
            <Form direction="vertical" validateMessages={validateMessages} onFinish={sendData}>
                <Form.Item
                    name={'lastName'}
                    // rules={[
                    //     {
                    //         required: true
                    //     },
                    // ]}
                    value={lastName}
                >
                    {console.log(firstName)}
                    <Input 
                        suffix={<img src={idCard} alt="id"/>} 
                        placeholder="Фамилия"
                        onChange={onChangeLastName}
                        value={lastName}
                        addonAfter={
                            <Tooltip placement="right" title={<span>Введите фамилию</span>}>
                                <QuestionCircleFilled />
                            </Tooltip>
                        }
                        // onChange={onChangeSurname}
                    />
                </Form.Item>
                <Form.Item
                    name={'firstName'}
                    value = {firstName}
                    // rules={[
                    //     {
                    //         required: true
                    //     },
                    // ]}
                    
                >
                    {console.log(firstName)}

                    <Input 
                        suffix={<img src={idCard} alt="id"/>} 
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
                <div className='row'>
                <Form.Item
                    name={'gender'}
                    // rules={[
                    //     {
                    //         required: true
                    //     },
                    // ]}
                >
                    {console.log(patientGender)}
                    <Select
                        style={{
                        width: 200,
                        }}
                        placeholder="Пол"
                        // defaultValue="Пол"
                        onChange={onChangeGender}
                        suffixIcon={<CaretDownOutlined />}
                        value={patientGender!= null ? patientGender : "Пол"}
                    >
                        <Option id="same-select-option" className="same-select-option" value="FEMALE">Женский</Option>
                        <Option id="same-select-option" value="MALE">Мужской</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name={'age'}
                    // rules={[
                    //     {
                    //         required: true
                    //     },
                    // ]}
                    placeholder="Возраст"
                >
                    {console.log(patientAge)}
                    <Input 
                        suffix={<img src={idCard} alt="id"/>} 
                        placeholder="Возраст"
                        value={patientAge}
                        onChange={onChangePatienAge}
                        type="number"
                        // value={firstName}
                    />
                </Form.Item>
                </div>
                
                <Form.Item
                    name={'doctor'}
                    // rules={[
                    //     {
                    //         required: true
                    //     },
                    // ]}
                    
                >
                    {console.log(doctorFullName)}
                    <Input 
                        suffix={<img src={idCard} alt="id"/>} 
                        placeholder="Врач"
                        value={doctorFullName}
                        onChange={onChangeDoctorName}

                        addonAfter={
                            <Tooltip placement="right" title={<span>Введите имя врача</span>}>
                                <QuestionCircleFilled />
                            </Tooltip>
                        }
                        // value={firstName}
                    />
                </Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Отправить на калибровку
                </Button>
            </Form>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    updateCaseAction: bindActionCreators(updateCase , dispatch),
  })
  const mapStateToProps = state => ({
    caseInfo: state.casesReducers.caseInfo,
  })
  export default connect(mapStateToProps , mapDispatchToProps)(DownloadForm)