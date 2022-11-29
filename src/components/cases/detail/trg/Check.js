import case_img from '../../../../static/img/cases/1073/trg/image.jpeg'
import { Stage, Layer, Text , Image} from 'react-konva';
import {useState , useRef, useEffect} from 'react'
import useImage from 'use-image';
function Check({clickHandler , firstDot , secondDot , line , isShowButton , hoverMouse , caseImg}){
    let container = document.querySelector('.canvas-container');    
    let width = Math.floor(container.clientWidth) - 20
    let height = Math.floor(container.clientHeight ) - 20
    const [scale, setScale] = useState(1); 
    // const [points , setPoints] = useState([])
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [image] = useImage(
        `data:image/jpeg;base64,${caseImg.image}`
    );
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
    
    function generateShapes(){
        return [...Array(10)].map((_, i) => ({
            id: i.toString(),
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotation: Math.random() * 180,
            isDragging: false,
        }));
    }
    const INITIAL_STATE = generateShapes();  
    const [stars, setStars] = useState(INITIAL_STATE);
    const handleDragStart = (e) => {
        const id = e.target.id();
        setStars(
            stars.map((star) => {
              return {
                ...star,
                isDragging: star.id === id,
              };
            })
        );
    };
    const handleDragEnd = (e) => {
        setStars(
            stars.map((star) => {
                return {
                    ...star,
                    isDragging: false,
                };
            })
        );
    };
    useEffect(() => {
    } , [isShowButton])
    return(
        <div className="canvas-container">
            <div id="trg-calibration-container">
                <Stage width={width} height={height} onWheel={handleWheel} onMouseMove={hoverMouse} onClick={clickHandler} x={position.x} y={position.y} scaleX={scale} scaleY={scale}  ref={stageRef}>
                    <Layer>
                        <Image image={image} width={width} height={height}/>
                        {firstDot}
                        {secondDot}
                        {line}
                    </Layer>
                </Stage>
            </div>
            {/* <img id="trg-calibration-controls" class="" src={case_img}/> */}
        </div>
    )
}
export default Check