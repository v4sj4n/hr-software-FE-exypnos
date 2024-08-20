import DataTable from '@/Components/Table/Table'
import { useCandidateContext } from './Context/CandidateTableContext'
import { CandidateProvider } from './Context/CandidateTableProvider'

function CandidatesCoontext() {
    const { getRowId, columns, rows, handleRowClick } =
        useCandidateContext()
    return (
        <DataTable
            getRowId={getRowId}
            columns={columns}
            rows={rows}
            handleRowClick={handleRowClick}
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
