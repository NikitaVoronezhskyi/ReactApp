import "./app-info.css";

const AppInfo = ({increased,employersLength}) => {
    return(
        <div className="app-info">
            <h1>Учёт Сотрудников в компании NV</h1>
            <h2>Общее число сотрудниов: {employersLength}</h2>
            <h2>Премию получат: {increased} </h2>
        </div>
    )
}

export default AppInfo