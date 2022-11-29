import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';
import {GetReport} from '../../../../store/actions/pointsActions'
import { Document, Page  ,ReactPDF } from 'react-pdf';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; 
// import file from '../../../../static/file.pdf'
import { Viewer } from '@react-pdf-viewer/core';
import { useEffect, useState } from 'react';
function Report({cases , getReportAction , report}){
        const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [file , setFile] = useState()
    let document = null
    // let reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //     // Make a fileInfo Object
    //     console.log("Called", reader);
    //     document = reader.result;
    //     console.log(document);
    //     // resolve(document);
    //   };
    useEffect(() => {
        getReportAction(cases.id)
        // console.log(report);
        // reader.readAsBinaryString(report);
    } , [])
    useEffect(() => {
        if(report) {
            setFile(report)
            // const str2blob = new Blob([report]);
            // let reader = new FileReader();
            // reader.readAsDataURL(str2blob); 
            // reader.onloadend = function() {
            //     setFile(reader.result.substr(reader.result.indexOf(',') + 1));
            //     // setFile(reader.result);    
            // }
            
            // setFile(URL.createObjectURL(str2blob));
        }
    } , [report])

    function onDocumentLoadSuccess({ numPages }) {
    }
    return(
        <div>
            {/* <Document file={`data:application/pdf;base64,${file}`}></Document> */}
            <embed src={file} />
            {/* <iframe src={`data:application/pdf;base64,${file}`} type="application/pdf" width="100%" height="100%"></iframe> */}
            {/* {file ? <Viewer fileUrl={file} /> : "" } */}
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    getReportAction: bindActionCreators(GetReport , dispatch),
})
const mapStateToProps = state => ({
    report: state.pointsReducers.report,
})
export default connect(mapStateToProps , mapDispatchToProps)(Report)