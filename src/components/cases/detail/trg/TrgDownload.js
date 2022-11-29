import DownloadImg from "./DownloadImg"
import DownloadForm from "./DownloadForm"
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import {uploadCaseImg , getCaseImg} from '../../../../store/actions/casesActions'
import { useEffect, useState } from "react";
import {useParams , useLocation} from 'react-router-dom'
function TrgDownload({caseInfo ,caseInfoDetail , uploadCaseImgAction , caseImg , nextStep}){
    const [loading , setLoading] = useState(false)
    const [caseDetail , setCaseDetail] = useState({})
    const {id} = useParams()
    const uploadImg = (file) => {
        uploadCaseImgAction({file , id: id})
        setLoading(true)
    }
    useEffect(() => {
        setCaseDetail(caseInfo)
    } , [caseInfoDetail])
    return(
        <div className="trg-download">
            <div className="download-img">
                <DownloadImg caseInfoDetail={caseInfoDetail}  step={1} loading={loading} uploadImg={uploadImg} caseImg={caseImg}/>
            </div>
            <div className="download-info">
                <DownloadForm caseInfoDetail={caseInfoDetail} nextStep={nextStep}/>
            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    uploadCaseImgAction: bindActionCreators(uploadCaseImg , dispatch),
})
const mapStateToProps = state => ({
})
export default connect(mapStateToProps , mapDispatchToProps)(TrgDownload)