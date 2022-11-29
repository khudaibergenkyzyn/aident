import useImage from 'use-image';
import { Stage, Layer, Text , Image , Circle , Group , Line} from 'react-konva';
import {useState , useRef, useEffect} from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';
import {getAllPoints} from '../../../../store/actions/pointsActions'
function DigitizationImg({caseImg , hoverMouse , points , getAllPointsAction , pointsList , containerSizesDigitization , delineation}){
    let container = document.querySelector('.canvas-container');   
    const [width , setWidth] = useState(Math.floor(container.clientWidth) - 20)
    const [height , setHeight] = useState(Math.floor(container.clientHeight ) - 20)
    const [imageHeightOnLoad , setImageHeightOnLoad] = useState()
    const [imageWidthOnLoad , setImageWidthOnLoad] = useState()
    const [scale, setScale] = useState(1); 
    // const [points , setPoints] = useState([])
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [allPoints,  setAllPoints] = useState([])
    const [state , setState] = useState({
      isDragging: false,
      x: 50,
      y: 50,
    })
    
    containerSizesDigitization.ratio =imageHeightOnLoad/ height ;
    containerSizesDigitization.ratioX = imageWidthOnLoad / width * scale;
    const [image] = useImage(
      `data:image/jpeg;base64,${caseImg.image}`
    );
    const [delineationSrc] = useImage(
      `data:image/jpeg;base64,${delineation.image}`
    );
    useEffect(() => {
      if(image){
        let img = <Image image={image}/>
        setImageHeightOnLoad(img.props.image.height);
        setImageWidthOnLoad(img.props.image.width)
      }
    } , [image])  
    const stageRef = useRef(null);
    const handleWheel = (event) => {
        event.evt.preventDefault();
        const currentStageRef = stageRef.current;
    
        if (currentStageRef) {
          const stage = currentStageRef.getStage();
    
          if (event.evt.ctrlKey) {
            const oldScale = stage.scaleX();
    
            const mousePointTo = {
              x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
              y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
            };
    
            const unboundedNewScale = oldScale - event.evt.deltaY * 0.01;
            let newScale = unboundedNewScale;
            if (unboundedNewScale < 0.1) {
              newScale = 0.1;
            } else if (unboundedNewScale > 10.0) {
              newScale = 10.0;
            }
    
            const newPosition = {
              x:
                -(mousePointTo.x - stage.getPointerPosition().x / newScale) *
                newScale,
              y:
                -(mousePointTo.y - stage.getPointerPosition().y / newScale) *
                newScale
            };
    
            setScale(newScale);
            setPosition(newPosition);
          } else {
            const dragDistanceScale = 0.75;
            const newPosition = {
              x: position.x - dragDistanceScale * event.evt.deltaX,
              y: position.y - dragDistanceScale * event.evt.deltaY
            };
    
            setPosition(newPosition);
          }
        }
      };
      useEffect(() => {
        setAllPoints(points)
        // setSCordinates(allPoints.filter(point => point.name == '2')[0])
      } , [points])
      useEffect(() => {
        getAllPointsAction()
      } , [])
      const [drawPoint , setDrawPoint] = useState()
      const getPointInfo = (pointID) => {
        return pointsList.filter(p => p.id == pointID)
      }
      useEffect(() =>{
        if(image){
            let imgCheck = <Image image={image}/>
            setImageHeightOnLoad(imgCheck.props.image.height);
            setImageWidthOnLoad(imgCheck.props.image.width)
        }
        
    } , [image])
    useEffect(() => {
      setHeight(Math.floor(container.clientHeight ) - 20)
      setWidth(Math.floor(container.clientWidth ) - 20)
    } , [container])
    useEffect(() => {
      getAllPointsAction()
    } , [])
    useEffect(() => {
        setAllPoints(points)
        console.log(points);
        // setSCordinates(allPoints.filter(point => point.name == '2')[0])
      } , [points])
      useEffect(() => {  
        console.log(imageWidthOnLoad , width);
        console.log(containerSizesDigitization.ratioX);
        setTimeout(() => {

          containerSizesDigitization.ratio = imageHeightOnLoad / height * scale
          containerSizesDigitization.ratioX = imageWidthOnLoad / width * scale
          if(allPoints){

          setDrawPoint({
            dotsInfo : allPoints.map(point => {
            let data = getPointInfo(point.name)[0]
            if(data.pointType == "SKELETAL"){
              return <Group 
                        draggable 
                        key={`dots-${point.data[0]}`} 
                        // onDragStart={() => {
                        //   this.setState({
                        //     isDragging: true,
                        //   });
                        // }}
                        onDragEnd={(e) => {
                          // this.setState({
                          //   isDragging: false,
                          point.x = e.target.x()
                          point.y = e.target.y()
                        }}
                      >
                <Circle x={point.data[0] / containerSizesDigitization.ratioX } y={point.data[1]  / containerSizesDigitization.ratio } radius={4} fill="#1667F5" />
                <Text x={point.data[0] / containerSizesDigitization.ratioX  - 8  } y={point.data[1] / containerSizesDigitization.ratio - 17 } width={150} height={50} text={data.name ? data.name : ''} verticalAlign="middle" fill="black"/>
              </Group>
            }else if(data.pointType == "SOFT_TISSUE"){
              return <Group key={`dots-${point.data[0]}`}>
                <Circle x={(point.data[0] / containerSizesDigitization.ratioX )} y={(point.data[1] / containerSizesDigitization.ratio)} radius={4} fill="#78E9C2" />
                <Text x={point.data[0] / containerSizesDigitization.ratioX  - 15 } y={point.data[1] / containerSizesDigitization.ratio - 18  } width={150} height={50} fill="black" text={data.name ? data.name  : ''} verticalAlign="middle"/>
              </Group>
            }else{
              return <Group  key={`dots-${point.data[0]}`}>
                <Circle x={point.data[0] / containerSizesDigitization.ratioX } y={point.data[1] / containerSizesDigitization.ratio} radius={3} fill="#F08AC7" />
                <Text x={point.data[0] / containerSizesDigitization.ratioX   - 10 } y={point.data[1] / containerSizesDigitization.ratio - 13  } width={150} height={50} fill="black" text={data.name ? data.name  : ''} verticalAlign="middle"/>
              </Group>
            }
          }),
          lines: allPoints.filter(p => p.name == '1' || p.name == '2' || p.name == '3' || p.name == '4' || p.name == '5' || p.name == '6').map( item => {
            if(item.name == 1){
              return <Line key={`line-${item.name}`} points={[allPoints.filter(p => p.name == '2')[0].data[0] / containerSizesDigitization.ratioX  , allPoints.filter(p => p.name == '2')[0].data[1] / containerSizesDigitization.ratio , allPoints.filter(p => p.name == '1')[0].data[0] / containerSizesDigitization.ratioX , allPoints.filter(p => p.name == '1')[0].data[1] / containerSizesDigitization.ratio ]} dash={[10, 10]} stroke="#E27A19"/>
            }else if(item.name == 2){
              return <Line key={`line-${item.name}`}  points={[allPoints.filter(p => p.name == '18')[0].data[0] / containerSizesDigitization.ratioX  , allPoints.filter(p => p.name == '18')[0].data[1] / containerSizesDigitization.ratio , allPoints.filter(p => p.name == '17')[0].data[0] / containerSizesDigitization.ratioX , allPoints.filter(p => p.name == '17')[0].data[1] / containerSizesDigitization.ratio ]} dash={[10, 10]} stroke="#E27A19"/>
            }else if(item.name == 3){
              return <Line key={`line-${item.name}`}  points={[allPoints.filter(p => p.name == '8')[0].data[0] / containerSizesDigitization.ratioX  , allPoints.filter(p => p.name == '8')[0].data[1] / containerSizesDigitization.ratio , allPoints.filter(p => p.name == '10')[0].data[0] / containerSizesDigitization.ratioX , allPoints.filter(p => p.name == '10')[0].data[1] / containerSizesDigitization.ratio ]} dash={[10, 10]} stroke="#E27A19"/>
            }else if(item.name == 4){
              return <Line key={`line-${item.name}`}  points={[allPoints.filter(p => p.name == '30')[0].data[0] / containerSizesDigitization.ratioX  , allPoints.filter(p => p.name == '30')[0].data[1] / containerSizesDigitization.ratio , allPoints.filter(p => p.name == '31')[0].data[0] / containerSizesDigitization.ratioX , allPoints.filter(p => p.name == '31')[0].data[1] / containerSizesDigitization.ratio ]} dash={[10, 10]} stroke="#E27A19"/>
            }else if(item.name == 5){
              return <Line key={`line-${item.name}`}  points={[allPoints.filter(p => p.name == '26')[0].data[0] / containerSizesDigitization.ratioX  , allPoints.filter(p => p.name == '26')[0].data[1] / containerSizesDigitization.ratio , allPoints.filter(p => p.name == '16')[0].data[0] / containerSizesDigitization.ratioX , allPoints.filter(p => p.name == '16')[0].data[1] / containerSizesDigitization.ratio ]} dash={[10, 10]} stroke="#E27A19"/>
            }else if(item.name == 6){
              return <Line key={`line-${item.name}`}  points={[allPoints.filter(p => p.name == '3')[0].data[0] / containerSizesDigitization.ratioX  , allPoints.filter(p => p.name == '3')[0].data[1] / containerSizesDigitization.ratio , allPoints.filter(p => p.name == '4')[0].data[0] / containerSizesDigitization.ratioX , allPoints.filter(p => p.name == '4')[0].data[1] / containerSizesDigitization.ratio ]} dash={[10, 10]} stroke="#E27A19"/>             
            }
          })

          })
        }
      } , 3000)

      } , [allPoints])
   
    useEffect(() => {
      console.log(caseImg);
    } , [caseImg])
    useEffect(() => {
      console.log(pointsList);
    } , [pointsList])
    
    // function generateShapes(){
    //     return [...Array(10)].map((_, i) => ({
    //         id: i.toString(),
    //         x: Math.random() * window.innerWidth,
    //         y: Math.random() * window.innerHeight,
    //         rotation: Math.random() * 180,
    //         isDragging: false,
    //     }));
    // }
    // const INITIAL_STATE = generateShapes();  
    // const [stars, setStars] = useState(INITIAL_STATE);
    // const handleDragStart = (e) => {
    //     const id = e.target.id();
    //     setStars(
    //         stars.map((star) => {
    //           return {
    //             ...star,
    //             isDragging: star.id === id,
    //           };
    //         })
    //     );
    // };
    // const handleDragEnd = (e) => {
    //     setStars(
    //         stars.map((star) => {
    //             return {
    //                 ...star,
    //                 isDragging: false,
    //             };
    //         })
    //     );
    // };
    // useEffect(() => {
    //   console.log(isShowButton);
    // } , [isShowButton])
    console.log(drawPoint);
    return(
        <div className="canvas-container">
            <div id="trg-calibration-container">
                <Stage width={width} height={height} onWheel={handleWheel} onMouseMove={hoverMouse} x={position.x} y={position.y} scaleX={scale} scaleY={scale}  ref={stageRef}>
                    <Layer>
                        <Group>
                          <Image image={image} width={width} height={height}/>
                          {delineation ? <Image image={delineationSrc} width={width*1.2} height={height*1.2} x={-70}/> : ""}
                          {drawPoint ? drawPoint.dotsInfo : ""}
                          {drawPoint ? drawPoint.lines : ""}
                          {/* {nCordinates? <Line points={[nCordinates.data[0] / containerSizesDigitization.ratioX , nCordinates.data[1] / containerSizesDigitization.ratio, sCordinates.data[0] / containerSizesDigitization.ratioX, sCordinates.data[1] / containerSizesDigitization.ratio]} dash={[10, 10]} stroke="#E27A19"/> : ''}
                          {pnsCordinates? <Line points={[ansCordinates.data[0] / containerSizesDigitization.ratioX , ansCordinates.data[1] / containerSizesDigitization.ratio, pnsCordinates.data[0] / containerSizesDigitization.ratioX, pnsCordinates.data[1] / containerSizesDigitization.ratio]} dash={[10, 10]} stroke="#E27A19"/> : ''}
                          {meCordinates ? <Line points={[meCordinates.data[0] / containerSizesDigitization.ratioX , meCordinates.data[1] / containerSizesDigitization.ratio, goCordinates.data[0] / containerSizesDigitization.ratioX, goCordinates.data[1] / containerSizesDigitization.ratio]} dash={[10, 10]} stroke="#E27A19"/> : ''}
                          {osp1Cordinates ? <Line points={[osp1Cordinates.data[0] / containerSizesDigitization.ratioX , osp1Cordinates.data[1] / containerSizesDigitization.ratio, osp2Cordinates.data[0] / containerSizesDigitization.ratioX, osp2Cordinates.data[1] / containerSizesDigitization.ratio]} dash={[10, 10]} stroke="#E27A19"/> : ''}
                          {enCordinates ? <Line points={[enCordinates.data[0] / containerSizesDigitization.ratioX , enCordinates.data[1] / containerSizesDigitization.ratio, pgCordinates.data[0] / containerSizesDigitization.ratioX, pgCordinates.data[1] / containerSizesDigitization.ratio]} dash={[10, 10]} stroke="#E27A19"/> : ''}
                          {orCordinates ? <Line points={[orCordinates.data[0] / containerSizesDigitization.ratioX , orCordinates.data[1] / containerSizesDigitization.ratio, poCordinates.data[0] / containerSizesDigitization.ratioX, poCordinates.data[1] / containerSizesDigitization.ratio]} dash={[10, 10]} stroke="#E27A19"/> : ''} */}
                        </Group>
                        {/* {firstDot}
                        {secondDot}
                        {line} */}
                    </Layer>
                </Stage>
            </div>
            {/* <img id="trg-calibration-controls" class="" src={case_img}/> */}
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
  getAllPointsAction: bindActionCreators(getAllPoints , dispatch),
})
const mapStateToProps = state => ({
  pointsList: state.pointsReducers.pointsList,
})
export default connect(mapStateToProps , mapDispatchToProps)(DigitizationImg)