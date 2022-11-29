import { Button , Popover , Input} from 'antd';
import { useState } from 'react';
import scale_icon from '../../../../static/img/scale_icon.svg'
import circle_tick_active from '../../../../static/img/circle-tick-active.svg'
import { Stage, Layer, Text , Image , Circle , Group , Line} from 'react-konva';
import calibration_dot from '../../../../static/img/calibration-dot-icon.svg'
import check_point_dis from '../../../../static/img/check_point_dis.svg'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import {calibrate} from '../../../../store/actions/casesActions'
import {useParams , useLocation} from 'react-router-dom'
import Check from './Check';
import useImage from 'use-image';
function Calibration({calibrateAction , nextStep , caseImg}){
    const {id} = useParams()
    const [firstDot , setFirstDot] = useState()
    const [secondDot , setSecondDot] = useState()
    const [status , setStatus] = useState(false)
    const [line , setLine] = useState()
    const [firstDotX , setFirstDotX] = useState(0)
    const [firstDotY , setFirstDotY] = useState(0)
    const [dotLength , setDotLength] = useState("")
    const [isShowButton , setIsShowButton] =useState(false) 
    const [isInputShow , setIsInputShow] = useState(false)
    const [lineLength , setLineLength] =  useState(0)
    const [image] = useImage(
        calibration_dot
    );
    const content = (<p>Начните калибровку. Левый клик мыши - <br/>определить точки, прокрутка по середине - <br/>увеличить, правый клик - передвинуть <br/>снимок.</p>)
    const [task , setTask] = useState('')
    const onChangeLength = (e) => {
        setDotLength(e.target.value);
       
    }
    const clickHandler = (e) => { 
        setFirstDotX()
        setFirstDotY()
        if(status && caseImg){
            const stage = e.target.getStage();
            const pointerPosition = stage.getRelativePointerPosition();
            const offset = {x: e.target.attrs.x, y: e.target.attrs.y};
    
            const imageClickX = pointerPosition.x;
            const imageClickY = pointerPosition.y;
            if(firstDot == undefined){
                setFirstDotX(imageClickX)
                setFirstDotY(imageClickY)
                setFirstDot(<Image image={image} width={28} height={28} x={imageClickX - 14} y={imageClickY - 14}/>)
                setTask(
                    <div className='task'>
                        <div className='getPoint getPointDone'>
                            <p>Отметьте первую точку на линейке</p>
                            <img src={circle_tick_active}/>
                        </div>
                        <div className='getPoint'>
                            <p>Отметьте вторую точку на линейке</p>
                            <img src={check_point_dis}/>
                        </div>
                    </div>
                )
            }else{
                setSecondDot(<Image image={image} width={28} height={28} x={imageClickX - 14} y={imageClickY - 14}/>)
                setLine(<Line points={[firstDotX , firstDotY , imageClickX , imageClickY]} stroke="white"/>)
                setLineLength(Math.sqrt((imageClickY - firstDotY) * (imageClickY - firstDotY) + (imageClickX - firstDotX) *(imageClickX - firstDotX)))
                setTask(
                    <div className='task'>
                        <div className='getPoint getPointDone'>
                            <p>Отметьте первую точку на линейке</p>
                            <img src={circle_tick_active}/>
                        </div>
                        <div className='getPoint getPointDone'>
                            <p>Отметьте вторую точку на линейке</p>
                            <img src={circle_tick_active}/>
                        </div>
                    </div>
                )
                setIsInputShow(true)
            }
        }
      }
    const startCalibration = () => {
        if(!caseImg){
            <p>Картинка не найдена</p>
        }else{
            setStatus(true)
            setTask(
                <div className='task'>
                    <div className='getPoint'>
                        <p>Отметьте первую точку на линейке</p>
                        <img src={check_point_dis}/>
                    </div>
                </div>
            )
        }
        
    }
    const enterLength = (e) => {
        e.target.disabled = true;
        e.target.style.backgroundColor = '#1C2F3E'
        e.target.style.color = '#8F95A1'
        e.target.style.border = '1px solid #1C2F3E'
        setIsShowButton(true)
        calibrateAction({
            data: {
                trgLengthInPixels: lineLength,
                trgLengthInMm: +dotLength
            },
            id
        })
    }
    return(
        <div className="row space-between">
            <div className="download-img calib-img">
                <Check clickHandler={clickHandler} firstDot={firstDot} secondDot={secondDot} line={line} caseImg={caseImg}/>
            </div>
            <div className="calibration-info">
                <h2>Калибровка снимка</h2>
                <div className='calibr-btns'>
                    <Popover content={content} >
                        <Button type="primary" onClick={startCalibration}>Начать</Button>
                    </Popover>
                    <Button type="primary">+</Button>
                    <Button type="primary">-</Button>
                    <Button type="primary"><img src={scale_icon}/></Button>
                </div>
                {task}
                {isInputShow ? 
                    <Input.Group compact className=''>
                        <Input
                            placeholder='Введите расстояние (мм)'
                            value={dotLength}
                            onChange={onChangeLength}
                        />
                        <Button type="primary" onClick={enterLength}>Подтвердить</Button>
                    </Input.Group>
                
                : ""}
                {isShowButton ? <Button type="primary" onClick={nextStep} className="next-btn">Отправить на оцифровку</Button> : ""}
            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    calibrateAction: bindActionCreators(calibrate , dispatch),
})
const mapStateToProps = state => ({
    // caseImg: state.casesReducers.caseImg
})
export default connect(mapStateToProps , mapDispatchToProps)(Calibration)