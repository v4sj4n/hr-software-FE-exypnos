import { CircularProgress } from '@mui/material'
import { useContext, useEffect } from 'react'
import { InventoryContext } from '../InventoryContext'
import { GridPaginationModel, GridRenderCellParams } from '@mui/x-data-grid'
import style from '../style/inventoryTable.module.scss'
import DataTable from '@/Components/Table/Table'
import { Laptop, Monitor } from '@mui/icons-material'
import { useAllInventoryItems } from '../Hook'
import { SingleInventoryItem } from './SingleInventoryItem'
import { Asset } from '@/Pages/Holdings/TAsset'
import { StatusBadge } from '@/Components/StatusBadge/StatusBadge'

export const InventoryTable = () => {
    const { isError, error, data, isPending } = useAllInventoryItems()

    const { handleOpenViewAssetModalOpen, searchParams, setSearchParams } =
        useContext(InventoryContext)

    useEffect(() => {
        if (searchParams.get('page') === null) {
            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev)
                newParams.set('page', '0')
                newParams.set('limit', '5')
                return newParams
            })
        }
    }, [searchParams, setSearchParams])

    if (isError) return <div>Error: {error.message}</div>
    if (isPending) return <CircularProgress />

    const rows = data.data.map((asset: Asset) => ({
        id: asset._id,
        type: asset.type[0].toUpperCase() + asset.type.slice(1),
        occupant: asset.userId,
        status: asset.status,
        serialNumber: asset.serialNumber,
    }))

    const handlePaginationModelChange = (model: GridPaginationModel) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            newParams.set('page', model.page.toString())
            newParams.set('limit', model.pageSize.toString())
            return newParams
        })
    }

    const columns = [
        {
            field: 'id',
            headerName: 'No',
            width: 80,
        },
        {
            field: 'type',
            headerName: 'Type',
            flex: 1,
            renderCell: (param: GridRenderCellParams) => (
                <div className={style.itemDiv}>
                    {param.value === 'Monitor' ? (
                        <>
                            <Monitor /> {param.value}
                        </>
                    ) : (
                        <>
                            <Laptop /> {param.value}
                        </>
                    )}
                </div>
            ),
        },
        {
            field: 'occupant',
            headerName: 'Occupant',
            flex: 1,
            renderCell: (param: GridRenderCellParams) => {
                return (
                    <div className={style.divStyle}>
                        {param.value === null ? (
                            <span className={style.spanStyleNA}>N/A</span>
                        ) : (
                            <span className={style.spanStyleA}>
                                {param.value.firstName} {param.value.lastName}
                            </span>
                        )}
                    </div>
                )
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: (param: GridRenderCellParams) => (
                <StatusBadge
                    color={
                        param.value === 'available'
                            ? 'green'
                            : param.value === 'assigned'
                              ? 'red'
                              : 'gray'
                    }
                    status={param.value}
                />
            ),
        },

        {
            field: 'serialNumber',
            headerName: 'Serial Number',
            flex: 1,

            renderCell: (param: GridRenderCellParams) => {
                return (
                    <button
                        onClick={() => {
                            handleOpenViewAssetModalOpen()
                            setSearchParams((prev) => {
                                const newParams = new URLSearchParams(prev)
                                newParams.set(
                                    'selectedInventoryItem',
                                    param.value,
                                )
                                return newParams
                            })
                        }}
                        style={{
                            border: 'none',
                            backgroundColor: 'transparent',
                        }}
                    >
                        {param.value}
                    </button>
                )
            },
        },
    ]

    const getRowId = (row: { id: number | string }) => row.id

    return (
        <>
            <DataTable
                onPaginationModelChange={handlePaginationModelChange}
                page={Number(searchParams.get('page')!)}
                pageSize={Number(searchParams.get('limit')!)}
                totalPages={data.totalPages}
                rows={rows}
                columns={columns}
                getRowId={getRowId}
            />

            {searchParams.get('selectedInventoryItem') && (
                <SingleInventoryItem />
            )}
        </>
    )
}
