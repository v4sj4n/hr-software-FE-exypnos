import DataTable from '@/Components/Table/Table'
import { useCandidateContext } from './Context/CandidateTableContext'
import { CandidateProvider } from './Context/CandidateTableProvider'
import { Loader } from '@/Components/Loader/Loader'
import { ForbiddenResource } from '@/Components/ForbiddenResource/ForbiddenResource'

function CandidatesCoontext() {
    const {
        getRowId,
        columns,
        rows,
        handleRowClick,
        handlePaginationModelChange,
        totalPages,
        page,
        pageSize,
        isPending,
    } = useCandidateContext()

    return (
       <ForbiddenResource>
         <>
            {isPending ? (
                <Loader />
            ) : (
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
            )}
        </>
       </ForbiddenResource>
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
