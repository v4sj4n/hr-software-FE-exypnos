import { CircularProgress } from '@mui/material'

import { useContext } from 'react'
import { InventoryContext } from '../InventoryContext'
import { GridRenderCellParams } from '@mui/x-data-grid'
import style from '../style/inventoryTable.module.scss'
import DataTable from '@/Components/Table/Table'

// Icons
import { Laptop, Monitor } from '@mui/icons-material'
import { useAllInventoryItems } from '../Hook/hook'
import { SingleInventoryItem } from './SingleInventoryItem'
import { Asset } from '@/Pages/Holdings/TAsset'
import { StatusBadge } from '@/Components/StatusBadge/StatusBadge'

export const InventoryTable = () => {
    const { isError, error, isLoading, data } = useAllInventoryItems()

    const { handleOpenViewAssetModalOpen, searchParams, setSearchParams } =
        useContext(InventoryContext)

    if (isError) return <div>Error: {error.message}</div>
    if (isLoading) return <CircularProgress />

    const rows = data.map((asset: Asset) => ({
        id: asset._id,
        type: asset.type[0].toUpperCase() + asset.type.slice(1),
        occupant: asset.userId,
        status: asset.status,
        serialNumber: asset.serialNumber,
    }))

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
                            const selectedParam = new URLSearchParams({
                                selectedInventoryItem: param.value,
                            })
                            setSearchParams(selectedParam)
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
            <DataTable rows={rows} columns={columns} getRowId={getRowId} />
            {searchParams.get('selectedInventoryItem') && (
                <SingleInventoryItem />
            )}
        </>
    )
}
