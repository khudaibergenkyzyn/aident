import { Stage, Layer, Text , Image , Group , Circle , Line} from 'react-konva';
import {useState , useRef, useEffect} from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';
import {getAllPoints} from '../../../../store/actions/pointsActions'
import useImage from 'use-image';
function ZoomWindow({img , mousePosition , getAllPointsAction , points , containerSizesDigitization , pointsList , delineation}){
    const [position, setPosition] = useState({ x: mousePosition.cursor.x, y: mousePosition.cursor.y});
    const [scale, setScale] = useState(3); 
    const [width , setWidth] = useState(284)
    const [imageHeightOnLoad , setImageHeightOnLoad] = useState(1200)
    const [imageWidthOnLoad , setImageWidthOnLoad] = useState()
    const [allPoints,  setAllPoints] = useState([])
    const [image] = useImage(
        `data:image/jpeg;base64,${img.image}`
    );
    const [delineationSrc] = useImage(
        `data:image/jpeg;base64,${delineation.image}`
      );
    let container = document.querySelector('.minimg-container');
    useEffect(() => {
        if(container){
            setWidth(Math.floor(container.clientWidth) - 35)
            containerSizesDigitization.ratioX = imageWidthOnLoad / width;
            console.log(Math.floor(container.clientWidth) - 20);
        }
    } , [container])
    containerSizesDigitization.ratio =imageHeightOnLoad/ 170 ;
    containerSizesDigitization.ratioX = imageWidthOnLoad / width ;
    useEffect(() =>{
        if(image){
            let imgCheck = <Image image={image}/>
            setImageHeightOnLoad(imgCheck.props.image.height);
            setImageWidthOnLoad(imgCheck.props.image.width)
        }
    } , [image])
    useEffect(() => {
      getAllPointsAction()
    } , [])
    useEffect(() => {
        setAllPoints(points)
        // setSCordinates(allPoints.filter(point => point.name == '2')[0])
      } , [points])
      const [drawPoint , setDrawPoint] =useState()
      const getPointInfo = (pointID) => {
        return pointsList.filter(p => p.id == pointID)
      }
      useEffect(() => {  
        setTimeout(() => {
        if(allPoints){
          console.log(allPoints);
          setDrawPoint({
            dotsInfo : allPoints.map(point => {
            let data = getPointInfo(point.name)[0]
            console.log(imageHeightOnLoad);
            containerSizesDigitization.ratio = imageHeightOnLoad /170
            // containerSizesDigitization.ratioX = imageWidthOnLoad /width * 1.1
            console.log(containerSizesDigitization.ratioX);
            console.log(containerSizesDigitization.ratio , containerSizesDigitization.ratioX);
            if(data.pointType == "SKELETAL"){
              return <Group key={`line-${point.data[0]}`} >
                <Circle x={point.data[0] / containerSizesDigitization.ratioX} y={point.data[1]  / containerSizesDigitization.ratio} radius={3} fill="#1667F5" />
                <Text x={point.data[0] / containerSizesDigitization.ratioX  - 8} y={point.data[1] / containerSizesDigitization.ratio - 17 } width={150} height={50} text={data.name ? data.name : ''} verticalAlign="middle" fill="black"/>
              </Group>
            }else if(data.pointType == "SOFT_TISSUE"){
              return <Group key={`line-${point.data[0]}`} >
                <Circle x={(point.data[0] / containerSizesDigitization.ratioX)} y={(point.data[1] / containerSizesDigitization.ratio)} radius={3} fill="#78E9C2" />
                <Text x={point.data[0] / containerSizesDigitization.ratioX  - 15 } y={point.data[1] / containerSizesDigitization.ratio - 18 } width={150} height={50} fill="black" text={data.name ? data.name  : ''} verticalAlign="middle"/>
              </Group>
            }else{
              return <Group key={`line-${point.data[0]}`} >
                <Circle x={point.data[0] / containerSizesDigitization.ratioX} y={point.data[1] / containerSizesDigitization.ratio} radius={3} fill="#F08AC7" />
                <Text x={point.data[0] / containerSizesDigitization.ratioX   - 10} y={point.data[1] / containerSizesDigitization.ratio - 13 } width={150} height={50} fill="black" text={data.name ? data.name  : ''} verticalAlign="middle"/>
              </Group>
            }
          }),
          lines: allPoints.filter(p => p.name == '1' || p.name == '2' || p.name == '3' || p.name == '4' || p.name == '5' || p.name == '6').map( item => {
            if(item.name == 1){
              return <Line key={`line-${item.name}`}  points={[allPoints.filter(p => p.name == '2')[0].data[0] / containerSizesDigitization.ratioX, allPoints.filter(p => p.name == '2')[0].data[1] / containerSizesDigitization.ratio, allPoints.filter(p => p.name == '1')[0].data[0] / containerSizesDigitization.ratioX, allPoints.filter(p => p.name == '1')[0].data[1] / containerSizesDigitization.ratio]} dash={[10, 10]} stroke="#E27A19"/>
            }else if(item.name == 2){
              return <Line key={`line-${item.name}`}  points={[allPoints.filter(p => p.name == '18')[0].data[0] / containerSizesDigitization.ratioX, allPoints.filter(p => p.name == '18')[0].data[1] / containerSizesDigitization.ratio, allPoints.filter(p => p.name == '17')[0].data[0] / containerSizesDigitization.ratioX, allPoints.filter(p => p.name == '17')[0].data[1] / containerSizesDigitization.ratio]} dash={[10, 10]} stroke="#E27A19"/>
            }else if(item.name == 3){
              return <Line key={`line-${item.name}`}  points={[allPoints.filter(p => p.name == '8')[0].data[0] / containerSizesDigitization.ratioX, allPoints.filter(p => p.name == '8')[0].data[1] / containerSizesDigitization.ratio, allPoints.filter(p => p.name == '10')[0].data[0] / containerSizesDigitization.ratioX, allPoints.filter(p => p.name == '10')[0].data[1] / containerSizesDigitization.ratio]} dash={[10, 10]} stroke="#E27A19"/>
            }else if(item.name == 4){
              return <Line key={`line-${item.name}`}  points={[allPoints.filter(p => p.name == '30')[0].data[0] / containerSizesDigitization.ratioX, allPoints.filter(p => p.name == '30')[0].data[1] / containerSizesDigitization.ratio, allPoints.filter(p => p.name == '31')[0].data[0] / containerSizesDigitization.ratioX, allPoints.filter(p => p.name == '31')[0].data[1] / containerSizesDigitization.ratio]} dash={[10, 10]} stroke="#E27A19"/>
            }else if(item.name == 5){
              return <Line key={`line-${item.name}`}  points={[allPoints.filter(p => p.name == '26')[0].data[0] / containerSizesDigitization.ratioX, allPoints.filter(p => p.name == '26')[0].data[1] / containerSizesDigitization.ratio, allPoints.filter(p => p.name == '16')[0].data[0] / containerSizesDigitization.ratioX, allPoints.filter(p => p.name == '16')[0].data[1] / containerSizesDigitization.ratio]} dash={[10, 10]} stroke="#E27A19"/>
            }else if(item.name == 6){
              return <Line key={`line-${item.name}`}  points={[allPoints.filter(p => p.name == '3')[0].data[0] / containerSizesDigitization.ratioX, allPoints.filter(p => p.name == '3')[0].data[1] / containerSizesDigitization.ratio , allPoints.filter(p => p.name == '4')[0].data[0] / containerSizesDigitization.ratioX, allPoints.filter(p => p.name == '4')[0].data[1] / containerSizesDigitization.ratio]} dash={[10, 10]} stroke="#E27A19"/>             
            }
          })
        })
        }    
      } , 3000)  
      } , [allPoints]) 
     useEffect(() => {
      console.log(drawPoint);
     } , [drawPoint])
      useEffect(() => {
      } , [pointsList])
    return(
        <div className="minimg-container">
            <div className='digitization-container'>
                <Stage width={width} height={170} scaleX={scale} scaleY={scale} x={mousePosition.cursor.x * 2} y={mousePosition.cursor.y * 2}>
                    <Layer>
                        <Group>
                            {console.log(imageHeightOnLoad , containerSizesDigitization.ratio )}
                          
                            <Image image={image} width={width} height={170} className="image-show"/>
                          {/* {delineation ? <Image image={delineationSrc} width={width * 1.1} height={200} x={mousePosition.cursor.x - 50} y={mousePosition.cursor.y} /> : ""} */}
                          {drawPoint && drawPoint.dotsInfo.length > 0 ? drawPoint.dotsInfo : console.log('dontWork -1')}
                          {drawPoint && drawPoint.lines.length > 0? drawPoint.lines : console.log('dontWork -2')}
                        </Group>
                    </Layer>
                </Stage>
            </div>
            
        </div>
        
    )
}
const mapDispatchToProps = dispatch => ({
    getAllPointsAction: bindActionCreators(getAllPoints , dispatch),
  })
  const mapStateToProps = state => ({
    pointsList: state.pointsReducers.pointsList,
  })
export default connect(mapStateToProps , mapDispatchToProps)(ZoomWindow)