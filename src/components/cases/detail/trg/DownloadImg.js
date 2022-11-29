import downloadIcon from '../../../../static/img/download-icon.svg'
import case_img from '../../../../static/img/cases/1073/trg/image.jpeg'
import { message, Upload , Form} from 'antd';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import {uploadCaseImg , getCaseImg} from '../../../../store/actions/casesActions'
import {useParams , useLocation} from 'react-router-dom'
import React , {useEffect, useState} from 'react';
const { Dragger } = Upload;
const style = {
    display: 'inline-block',
  };
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
function DownloadImg({step , caseImg , uploadImg , getCaseImgAction , caseInfoDetail , loading}){
    const {id} = useParams()
    const[show , setShow] = useState(
        <div>
            <p className="ant-upload-drag-icon">
                <img src={downloadIcon} />
            </p>
            <p className="ant-upload-text">Перетащите файлы сюда или</p>
            <button>Выберите файлы</button>
        </div>
    )
    const [fileInfo , setFileInfo] = useState('')
    const props = {
        name: 'file',
        multiple: false,
        type: 'file',
        action: uploadImg,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'done') {
                getCaseImgAction(id)
                // setFileInfo(info.file.name);
                // console.log(caseImg);
                // setShow(<img src={`data:image/jpeg;base64,${caseImg.image}`}/>)
            }else if(loading){
                setShow(
                    <div className='loader' id='loader'>
                        {/* <div className='load-shadow'> */}
                            <div className='load-circle'>
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
                )
            }
            // if (status === 'done') {
            //     getCaseImgAction(id)
            //     message.success(`${info.file.name} file uploaded successfully.`);
            //     show = <img src=''/>
            // } else if (status === 'error') {
            //     message.error(`${info.file.name} file upload failed.`);
            // }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    useEffect(() => {   
        if(caseImg.image){
            setShow(
                <img src={`data:image/jpeg;base64,${caseImg.image}`}/>
            )
        }else{
            setShow(
                <div>
                    <p className="ant-upload-drag-icon">
                        <img src={downloadIcon} />
                    </p>
                    <p className="ant-upload-text">Перетащите файлы сюда или</p>
                    <button>Выберите файлы</button>
                </div>
            )
        }
    } , [caseImg])
    useEffect(() => {
        getCaseImgAction(id)
    } ,  [])
    return(
        <div className="download-img-block">
            <h2>Загрузка снимка</h2>
            
            <section className="canvas-container">
                <Dragger {...props}>
                    {show}
                    <input type="hidden" value={id} name="id"/>
                </Dragger>    
            </section>
            <p className='dowload-img-info-top'>Файл не должен превышать 200 МБ.</p>
            <p>Поддерживаемы типы файлов: <span>JPEG</span>, <span>PNG</span>.</p>
            {fileInfo}
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    uploadCaseImgAction: bindActionCreators(uploadCaseImg , dispatch),
    getCaseImgAction: bindActionCreators(getCaseImg , dispatch),
})
const mapStateToProps = state => ({
    caseImg: state.casesReducers.caseImg
})
export default connect(mapStateToProps , mapDispatchToProps)(DownloadImg)