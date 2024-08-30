import DataTable from '@/Components/Table/Table'
import { useCandidateContext } from './Context/CandidateTableContext'
import { CandidateProvider } from './Context/CandidateTableProvider'
import { RingLoader } from 'react-spinners'

function CandidatesCoontext() {
    const { getRowId, columns, rows, handleRowClick, handlePaginationModelChange, totalPages, page, pageSize, isPending  } = useCandidateContext()
    if (isPending) return <div style={{ display: "flex", fontSize: "30px", justifyContent: "center", marginTop: "200px" }}> <RingLoader /></div>
    return (
        <DataTable
            getRowId={getRowId}
            columns={columns}
            rows={rows}
            handleRowClick={handleRowClick}
            totalPages={totalPages}
            page={page}
            pageSize={pageSize}
            onPaginationModelChange={handlePaginationModelChange}
        />
    )
}

const Candidates: React.FC = () => {
    return (
        <CandidateProvider>
            <CandidatesCoontext />
        </CandidateProvider>
    )
}

export default Candidates
