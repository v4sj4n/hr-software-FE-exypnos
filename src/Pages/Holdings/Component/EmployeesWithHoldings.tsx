import { useEmployeesWithHoldings } from '../Hook/index.ts'
import { CircularProgress } from '@mui/material'
import { UserWithHoldings } from '../TAsset'
import { useInView } from 'react-intersection-observer'

import style from '../style/employeesWithHoldings.module.scss'
import { useContext, useEffect } from 'react'
import SimpleCollapsableCard from '@/Components/Vacation_Asset/SimpleCollapsableCard.tsx'
import { HoldingsContext } from '../HoldingsContext.tsx'

import Button from '@/Components/Button/Button.tsx'
import { ButtonTypes } from '@/Components/Button/ButtonTypes.tsx'
import { AssignAssetModal } from './Modals/AssignAssetModal.tsx'
import { ReturnAssetModal } from './Modals/ReturnAssetModal.tsx'
import Toast from '@/Components/Toast/Toast.tsx'

export const EmployeesWithHoldings = () => {
    const {
        isError,
        error,
        data,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
    } = useEmployeesWithHoldings()
    const { searchParams, setSearchParams, toastConfigs, handleToastClose } =
        useContext(HoldingsContext)

    const { ref, inView } = useInView()

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [fetchNextPage, inView])

    const setClickedOnHolding = (itemId: string) => {
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams)
            newParams.set('ownedItem', itemId)
            return newParams
        })
    }
    const setClickedOnAssignItem = () => {
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams)
            newParams.set('assignItem', 'true')
            return newParams
        })
    }

    if (isError) return <div>Error: {error.message}</div>
    if (isLoading)
        return (
            <div className={style.loading}>
                <CircularProgress />
            </div>
        )

    return (
        <div className={style.employeesContainer}>
            {data?.pages.map((page) =>
                page.data.map((user: UserWithHoldings) => (
                    <SimpleCollapsableCard
                        key={user._id}
                        user={user}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        items={
                            user.assets
                                ? { type: 'Holding', itemArr: user.assets }
                                : undefined
                        }
                    >
                        <div className={style.collapsedData}>
                            <div className={style.collapseDataVacationList}>
                                <h3>Occupied items</h3>
                                <div>
                                    <div>
                                        {user.assets &&
                                        user.assets.length > 0 ? (
                                            user.assets.map(({ type, _id }) => (
                                                <p
                                                    onClick={() => {
                                                        setClickedOnHolding(_id)
                                                    }}
                                                    key={_id}
                                                >
                                                    {type}
                                                </p>
                                            ))
                                        ) : (
                                            <p>No holdings</p>
                                        )}
                                    </div>
                                    <Button
                                        btnText={'Assign asset'}
                                        type={ButtonTypes.PRIMARY}
                                        onClick={setClickedOnAssignItem}
                                    />
                                    {searchParams.get('assignItem') && (
                                        <AssignAssetModal />
                                    )}
                                    {searchParams.get('ownedItem') && (
                                        <ReturnAssetModal />
                                    )}
                                </div>
                            </div>
                        </div>
                    </SimpleCollapsableCard>
                )),
            )}
            <div ref={ref}>{isFetchingNextPage && 'Loading...'}</div>
            <Toast
                severity={toastConfigs.severity}
                message={toastConfigs.message!}
                open={toastConfigs.isOpen}
                onClose={handleToastClose}
            />
        </div>
    )
}
