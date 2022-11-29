import { CheckOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd';
function Messages({txt}){
    // let secondsToGo = 5;
    // const timer = setInterval(() => {
    //     secondsToGo -= 1;
    //     document.querySelector('.message-modal').display = 'flex'
    //   }, 1000);
    return(
        <div className='message-modal'>
            <div className='message-info'>
                <CheckOutlined />
                <p>Успешно оцифровано Искусственным Интеллектом</p>
                <p>{txt}</p>
            </div>
        </div>
    )
}
export default Messages