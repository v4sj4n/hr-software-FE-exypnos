import { EmployeesWithHoldings } from './Component/EmployeesWithHoldings.tsx'
import style from './style/holdings.module.scss'
import HoldingsProvider from './HoldingsContext.tsx'
import { HoldingsSearchFilter } from './Component/SearchFilters.tsx'
import { ForbiddenResource } from '@/Components/ForbiddenResource/ForbiddenResource.tsx'

function HoldingsComponent() {
    return (
        <ForbiddenResource>
            <main className={style.main}>
                <HoldingsSearchFilter />
                <div className={style.mainContainer}>
                    <EmployeesWithHoldings />
                </div>
            </main>
        </ForbiddenResource>
    )
}

export default function Holdings() {
    return (
        <HoldingsProvider>
            <HoldingsComponent />
        </HoldingsProvider>
    )
}
