import step_icon_dis from '../../../../static/img/step-icon-dis.svg'
import step_icon_active from '../../../../static/img/steps-icon.svg'
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';
import TrgDownload from './TrgDownload';
import { Button, message, Steps } from 'antd';
import { useEffect, useState } from 'react';
import Calibration from './Calibration';
import Digitization from './Digitization';
import {useParams , useLocation} from 'react-router-dom'
import {getCase , getCaseImg} from '../../../../store/actions/casesActions'
import female from '../../../../static/img/female.svg'
import male from '../../../../static/img/male.svg'
import Report from './Report';
const { Step } = Steps;
const items=[
    {
        title: 'Профиль пациента',
        status: 'process',
        icon: <UserOutlined />,
    },
    {
        title: 'Калибровка',
        status: 'process',
        icon: <SolutionOutlined />,
    },
    {
        title: 'Оцифровка',
        status: 'process',
        icon: <LoadingOutlined />,
    },
    {
        title: 'Отчет',
        status: 'wait',
        icon: <SmileOutlined />,
    },
]

function TrgDetail( {getCaseAction , caseInfo , caseImg , getCaseImgAction } ){
    const {id} = useParams()
    const next = () => {
        setCurrent(current + 1);
    };
    const sub = <img src={step_icon_dis}/>
    const sub_active = <img src={step_icon_active}/>
    const [current, setCurrent] = useState(0);
    const steps = [
        {
          title: 'First',
          content: <TrgDownload caseInfoDetail={caseInfo} caseImg={caseImg} nextStep={next}/>,
        },
        {
          title: 'Second',
          content: <Calibration caseInfo={caseInfo} nextStep={next} caseImg={caseImg}/>,
        },
        {
          title: 'Third',
          content: <Digitization caseInfo={caseInfo} caseImg={caseImg}/>,
        },
        {
            title: 'Last',
            content: <Report caseInfo={caseInfo}/>,
        },
    ];
   
    const prev = () => {
        setCurrent(current - 1);
    };
    const onChange = (value ) => {
        setCurrent(value);

    }
    useEffect(() => {
        getCaseAction(id) 
        getCaseImg(id)
    } , [])
    useEffect(() => {
    } , [caseInfo])
    useEffect(() => {
    } , [caseImg])
    // items.map((item,index) => (index <= current) ? console.log(current , index , "---") : console.log(current , index , "+++"))
    return(
        <div className='trg-detail'>
            <>
            <div className='detail-header'>
                <Steps current={current} onChange={onChange}>
                    {items.map((item,index) => (index <= current) ? <Step title={item.title} subTitle={sub_active} key={`steps-${index}`}/> : <Step title={item.title} subTitle={sub} key={`steps-${index}`}/>)}
                </Steps>
                <div className='detail-patient-info'>     
                    {console.log(caseInfo)}
                    <p className='case-name'>Ф.И.О.</p>
                    <div className='row'>
                        <div>
                            <p className='info'>{caseInfo.patientFirstName} {caseInfo.patientLastName}</p>
                        </div>
                        <div className='parient-age-gender'>
                            {caseInfo.patientGender == 'MALE' ? <img src={male}/> : ''}
                            {caseInfo.patientGender == 'FEMALE' ? <img src={female}/> : ''}
                            <span>{caseInfo.patientAge} лет</span>
                        </div>
                    </div>
                    <p  className='case-name'>Дата исследования</p>
                    <p>{caseInfo.createdAt}</p>
                </div>
                <div className='payment'>
                    <button className='button payment-button'>Оплатить</button>
                </div>
            </div>
                

                <div className="steps-content">{steps[current].content}</div>
            </>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    getCaseAction: bindActionCreators(getCase , dispatch),
    getCaseImgAction: bindActionCreators(getCaseImg , dispatch),
})
const mapStateToProps = state => ({
    caseInfo: state.casesReducers.caseInfo,
    caseImg: state.casesReducers.caseImg
})
export default connect(mapStateToProps , mapDispatchToProps)(TrgDetail)