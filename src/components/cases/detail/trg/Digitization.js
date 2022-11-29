import { Tabs , Button} from 'antd';
import DigitInfo from './DigitInfo';
import {useState , useRef, useEffect} from 'react'
import DigitizationImg from './DigitizationImg';
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';
import {getTrgPointsAI , getDelineationImg} from '../../../../store/actions/trgPointsActions'
import Information from './Information';
import Messages from './Messages';
function Digitization({caseInfo , caseImg , getTrgPointsAIAction , aiPoints , getDelineationImgAction , delineationImg}){
    const [pointsList , setPointsList] = useState([])
    const [delineation , setDelineation] = useState({})
    let container = document.querySelector('.download-img');
    const [loadingStatus , setLoadingStatus] = useState(true)
    const [mousePosition , setMousePosition] = useState({
        cursor: {
          x: null,
          y: null
        }
    });
    let containerSizesDigitization = {
        width: container.clientWidth,
        height: window.innerHeight * 0.7,
        ratio: 1,
        ratioX : 1
    }
    const stageRef = useRef(null);
    const hoverImage = (e) => {
        let stage = e.currentTarget;
        stage = e.target.getStage();
        setMousePosition({
            cursor: {
                x : - stage.getRelativePointerPosition().x / 1.5,
                y: - stage.getRelativePointerPosition().y / 4
            }
        })
    }
    const digitizeCase = () => {
        getTrgPointsAIAction(caseInfo.id)
        setPointsList(aiPoints)
        getDelineationImgAction(caseInfo.id)
        setLoadingStatus(false)
        document.getElementById('circle').style.animation='anim 4s linear forwards'
        document.getElementById('loader').style.display='flex'
    }
    useEffect(() => {
        console.log(aiPoints);
        setPointsList(aiPoints)
        if(aiPoints && aiPoints.length > 0){
            setLoadingStatus(true)
        }
    } , [aiPoints])
    useEffect(() => {
        setDelineation(delineationImg)
    } , [delineationImg])
    return(
        <div className="digitization row">
            {!loadingStatus ? <div className='bg'></div> : '' }            
            <div className="download-img">
                <DigitizationImg hoverMouse={hoverImage} caseImg={caseImg} points={pointsList} containerSizesDigitization={containerSizesDigitization} delineation={delineation}/>
                {/* <ZoomImage image={case_img}/> */}
            </div>
            <div className='digit-info' id='digit-info'>
                <Tabs>
                    <Tabs.TabPane tab="Параметры" key="item-1">
                        <DigitInfo image={caseImg} loadingStatus={loadingStatus} points={pointsList} mousePosition={mousePosition} digitizeCase={digitizeCase} delineation={delineation} containerSizesDigitization={containerSizesDigitization}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Информация" key="item-2">
                        <Information/>
                    </Tabs.TabPane>
                </Tabs>
            </div>
            
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    getTrgPointsAIAction: bindActionCreators(getTrgPointsAI , dispatch),
    getDelineationImgAction: bindActionCreators(getDelineationImg , dispatch),
})
const mapStateToProps = state => ({
    aiPoints: state.trgPointsReducers.aiPoints,
    delineationImg: state.trgPointsReducers.delineation

})
export default connect(mapStateToProps , mapDispatchToProps)(Digitization)