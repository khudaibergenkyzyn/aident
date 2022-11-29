import { Divider, Radio, Table, Dropdown , Space , Menu} from 'antd';
import { MoreOutlined ,CaretLeftOutlined ,CaretRightOutlined } from '@ant-design/icons';
import star from '../../static/img/star.svg'
import archive from '../../static/img/archive.svg'
import trash from '../../static/img/trash.svg'
import { useEffect, useState } from 'react';
import male from '../../static/img/male.svg'
import female from '../../static/img/female.svg'
import case_processing from '../../static/img/case-processing.svg'
import case_processed from '../../static/img/case-processed.svg'
import { deleteCase } from '../../store/actions/casesActions';
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';
import ListHeader from "./ListHeader"
const items = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: '1',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];

function ListPatients({allCases , deleteCaseAction , deleteRes}){
    const [patientList , setPatientList] = useState([])
    const [pageSize , setPageSize] = useState(5)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const handleChange = (value) => {
        setPageSize(value)
    };
    const onSelectChange = (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    const columns = [
      {
        title: '#ID',
        dataIndex: 'id',
        render: (_ , text) =>{
          let href=`/cases/${text.id}`
        return(
          <a href={href}>{text.id}</a>
        )
      } 
      },
      {
        title: 'Информация о пациенте',
        dataIndex: 'patientInfo',
        render: (_ , text) =>{
            let href=`/cases/${text.id}`
          return(
            <a href={href}>{text.patientInfo}</a>
          )
        } 
        // <a href='/detail/' >{text}</a>,
      },
      {
        title: 'Тип исследования',
        dataIndex: 'caseType',
        // defaultSortOrder: 'descend',
        // sortDirections: ['ascend', 'descend', 'ascend'],
        sorter: (a, b) => a.caseType.localeCompare(b.caseType),
      },
      {
          title: 'Врач',
          dataIndex: 'doctorFullName',
          sorter: (a, b) => a.doctorFullName.localeCompare(b.doctorFullName)
      },
      {
          title: 'Статус',
          dataIndex: 'caseTRGStatus',
          sorter: (a, b) => a.caseTRGStatus.localeCompare(b.caseTRGStatus)
      },
      {
          title: 'Дата создания',
          dataIndex: 'createdAt',
          sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      },
      {
        title: '',
        key: 'action',
        render: (_, text) => {
          const menu = (
            <Menu className='list-drop'>
              <Menu.Item><img src={star}/> В избранное</Menu.Item>
              <Menu.Item><img src={archive}/> В архив</Menu.Item>
              <Menu.Item onClick={() => deleteCaseAction(text.id)}><img src={trash}/> Удалить</Menu.Item>
            </Menu>
          );
          return <Dropdown overlay={menu} trigger="click" placement="bottomLeft">
            <MoreOutlined/>
          </Dropdown>
        },
      },
  ];
    useEffect(() => {
      console.log(allCases);
      if(allCases){
        let list = allCases.map((caseItem , i) => {
          return{
            id: caseItem.id,
            createdAt: caseItem.createdAt,
            patientInfo : <div><p>{caseItem.patientFullName} {caseItem.patientGender == 'MALE' ? <img src={male}/>:caseItem.patientGender == 'FEMALE' ? <img src={female}/> : ""} {caseItem.patientAge}</p></div>,
            caseType: caseItem.caseType == 'TRG' ? 'ТРГ' : 'КЛКТ',
            doctorFullName: caseItem.doctorFullName,
            caseTRGStatus: <div className='case-status'>{caseItem.caseTRGStatus == 'NEW' ? <div><img src={case_processing}/><span>В процессе</span></div> : caseItem.caseTRGStatus == 'READY' ? <div><img src={case_processed}/><span>Завершен</span></div> : caseItem.caseTRGStatus == '"DIGITIZATION"' ? "Оцифровка" : ""}</div>
          }
        })
        setPatientList(list)
      }
    } , [allCases])
    useEffect(() => {
    } , [deleteRes])
    return(
        <div className='list-patients'>
            <ListHeader handleChange={handleChange}/>
            <Table className='list-table'
                columns={columns}
                dataSource={patientList}
                pagination={{
                    prevIcon: <CaretLeftOutlined />,
                    nextIcon: <CaretRightOutlined />,
                    pageSize: pageSize,
                }}

            />
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
  deleteCaseAction: bindActionCreators(deleteCase , dispatch),
})
const mapStateToProps = state => ({
  allCases: state.casesReducers.allCases
})
export default connect(mapStateToProps , mapDispatchToProps)(ListPatients)