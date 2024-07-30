import DataTable from "../../Components/Table/Table";
import style from "./styles/Candidates.module.css"
import { useCandidateContext } from "./Context/CandidateTableContext";

export default function Candidates() {

  const { getRowId, headerIcons, columns, rows, handleRowClick} = useCandidateContext();
  return (
    <div className={style.content}>
      <div className={style.Candidates}>Candidates</div>
      <DataTable getRowId={getRowId} headerIcons={headerIcons}  columns={columns} rows={rows} handleRowClick={handleRowClick}/>
    </div>

  )
}
