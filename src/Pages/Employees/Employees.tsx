import style from './style/Employees.module.css'
import DataTable from "../../Components/Table/Table";
import { useEmployeeContext } from './Context/EmployeTableContext';

export default function Employees() {
    const { rows, columns, headerIcons,  getRowId } = useEmployeeContext();

    return (
        <>
            <div style={{ display: "flex", width: "100%", flexDirection: "column", padding: "0 16px", backgroundColor: "#f0f5ff" }}>
                <div className={style.account}>Employee List</div>
                <DataTable
                    rows={rows}
                    columns={columns}
                    getRowId={getRowId}
                    headerIcons={headerIcons}
                    // headerTextColors={headerTextColors}
                />
            </div>
        </>
    );
}