import main_home_img from '../../static/img/main-home-img.svg'
function MainHome(){
    return(
        <div className="main-home section-padding">
            <div className='row space-between main-home-top'>
                <div className="main-home-info">
                    <h1>Cтоматологический <br/>осмотр</h1>
                    <h2>Икусственным <br/>Интеллектом</h2>
                    <a>Создать аккаунт</a>
                </div>
                <div className="main-home-info-img">
                    <img src={main_home_img}/>
                </div>
            </div>
            <div className='main-home-desc'>
                <p>Виртуальный помощник способствует врачу<br/> сконцентрироваться на процессе лечения, <br/>избавляет от рутины, делая такие задачи как:</p>
                <div className='row space-between site-tasks'>
                    <p>Автоматическая обработка КЛКТ снимков</p>
                    <p>Онлайн расчет ТРГ в боковой проекции</p>
                </div>
            </div>
        </div>
    )
}
export default MainHome