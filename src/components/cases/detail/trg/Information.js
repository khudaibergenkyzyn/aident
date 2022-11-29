import { Table } from 'antd';
import {getAllMeasurments} from '../../../../store/actions/pointsActions'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Unit',
      dataIndex: 'Unit',
      width: 150,
    },
    {
      title: 'Value',
      dataIndex: 'mean',
    },
    {
        title: 'Normal',
        dataIndex: ``,
      },
      {
        title: 'Difference',
        dataIndex: 'deviation',
      },
  ];
function Information({measurments , getAllMeasurmentsAction}){
    useEffect(() => {
        getAllMeasurmentsAction()
    } , [])
    return(
        <div className='info'>
            <Table
                columns={columns}
                dataSource={measurments}
                pagination={{
                pageSize: 50,
                }}
                scroll={{
                y: 240,
                }}
            />
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    getAllMeasurmentsAction: bindActionCreators(getAllMeasurments , dispatch),
  })
  const mapStateToProps = state => ({
    measurments: state.pointsReducers.measurments,
  })
  export default connect(mapStateToProps , mapDispatchToProps)(Information)