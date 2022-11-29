import { Select , Button , Switch} from 'antd';
import { useEffect, useState } from 'react';
import { FaUserAlt , FaBell , FaQuestionCircle , FaCaretDown} from 'react-icons/fa';
import Messages from './Messages';
import point_img from '../../../../static/img/sn-point-img.svg'
import ZoomWindow from './ZoomWindow';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import {getAllAnalyzeTypes} from '../../../../store/actions/analyzeTypesActions'
import load_brain from '../../../../static/img/load-brain.svg'
function DigitInfo({image , mousePosition , getAllAnalyzeTypesAction , types , digitizeCase , containerSizesDigitization , points , delineation , loadingStatus}){
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
    };
    const [done , setDone] = useState(false)
    useEffect(() => {
        getAllAnalyzeTypesAction()
    } , [])
    useEffect(() => {
    } , [types])
    useEffect(() => {
    } , [image])
    useEffect(() => {
        if(points && points.length > 0){
            setDone(true)
        }
    } , [points])
    return(
        <div className='digit-inner'>
            {!done ? 
            <div>
                <div className='loader' id='loader'>
                    {/* <div className='load-shadow'> */}
                        <div className='load-circle'>
                            <div className='load-img'>
                                <img src={load_brain}/>
                            </div>     
                        </div>
                    {/* </div>  */}
                    <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width="260px" height="260px">
                        <defs>
                            <linearGradient id='gradient-color'>
                                <stop offset="0%" stop-color="#4C9BBC"/>
                                <stop offset="100%" stop-color="#3BDFCF"/>
                            </linearGradient>
                        </defs>
                        <circle id='circle' cx={130} cy={130} r="115" strokeLinecap="round"/>
                    </svg>
                </div>
                <Button className='digitize-btn' type="primary" onClick={digitizeCase}>оцифровка с помощью<br/> искусственного интеллекта</Button>
            </div>
            :
                <div className='digit-info-block'>
                    <Messages/>
                    <div>
                        <div className='digit-top row'>
                            <div className='mini-img'>
                                <p>Zoom</p>
                                <ZoomWindow delineation={delineation} points={points} img={image} containerSizesDigitization={containerSizesDigitization} mousePosition={mousePosition}/>
                            </div>
                            <div className='show-types'>
                                <div className='row'>
                                    <p>Обрисовка</p>
                                    <Switch onChange={onChange} />
                                </div>
                                <div className='row'>
                                    <p>Линия анализа</p>
                                    <Switch onChange={onChange} />
                                </div>
                                <div className='row'>
                                    <p>Название точек</p>
                                    <Switch onChange={onChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <p>Вспомогательная инструкция</p>
                    <div className='digit-points row'>
                    <div className='point-info'>
                            <Select
                                defaultValue="Sn"
                                suffixIcon={<FaCaretDown/>}
                                onChange={handleChange}
                                options={[
                                    {
                                    value: 'sn',
                                    label: 'Sn',
                                    },
                                    {
                                    value: 'lucy',
                                    label: 'Lucy',
                                    },
                                    {
                                    value: 'disabled',
                                    disabled: true,
                                    label: 'Disabled',
                                    },
                                    {
                                    value: 'Yiminghe',
                                    label: 'yiminghe',
                                    },
                                ]}
                            />
                        </div>
                        <div className='digit-point-img'>
                            <img src={point_img}/>
                        </div>
                        <div className='row point-detail'>
                            <b>Sn</b>
                            <p>Субнозальная точка, пересечение <br/>носа с верхней губой.</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    getAllAnalyzeTypesAction: bindActionCreators(getAllAnalyzeTypes , dispatch),
})
const mapStateToProps = state => ({
    types: state.analyzeTypesReducers.types
})
export default connect(mapStateToProps , mapDispatchToProps)(DigitInfo)