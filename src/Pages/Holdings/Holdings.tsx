import { EmployeesWithHoldings } from './Component/EmployeesWithHoldings.tsx'
import style from './style/holdings.module.scss'
import HoldingsProvider from './HoldingsContext.tsx'
import { HoldingsSearchFilter } from './Component/SearchFilters.tsx'

function HoldingsComponent() {
    return (
        <main className={style.main}>
            <HoldingsSearchFilter />

            <div className={style.mainContainer}>
                <EmployeesWithHoldings />
            </div>
        </main>
    )
}

export default function Holdings() {
    return (
        <HoldingsProvider>
            <HoldingsComponent />
        </HoldingsProvider>
    )
}
