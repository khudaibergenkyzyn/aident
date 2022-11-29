import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import Header from '../../Header';
import TrgDetail from './trg/TrgDetail';
// import '../../../static/js/case.js'
// import '../../../static/js/trg.js'
// const items = new Array(3).fill(null).map((_, i) => {
//     const id = String(i + 1);
//     return {
//       label: `Tab Title ${id}`,
//       key: id,
//       children: (
//         <>
//           <p>Content of Tab Pane {id}</p>
//           <p>Content of Tab Pane {id}</p>
//           <p>Content of Tab Pane {id}</p>
//         </>
//       ),
//     };
//   });
const items =[ 
    {
        label: 'ТРГ',
        key : 'trg',
        children: <TrgDetail/>
    },
    {
        label: 'КЛКТ',
        key: 'klkt'
    }
]
function DetailPage(){
    return(
        <div className='detail'>
            <Header auth={true}/>
            <div className="card-container container">
                <Tabs type="card" items={items} />
            </div>
            
        </div>
    )
}
export default DetailPage