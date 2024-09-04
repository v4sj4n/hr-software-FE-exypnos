import { Asset } from '@/Pages/Holdings/TAsset'
import { Vacation } from '@/Pages/Vacation/TVacation'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Collapse } from '@mui/material'
import { Dispatch, MouseEvent, ReactNode } from 'react'
import style from './SimpleCollapsableCard.module.scss'
import Card from '../Card/Card'

type SimpleCollapsableCardProps = {
    user: {
        _id: string
        firstName: string
        lastName: string
        phone: string
        role: string
        imageUrl: string
    }
    searchParams: URLSearchParams
    setSearchParams: Dispatch<React.SetStateAction<URLSearchParams>>
    items?: {
        type: string
        itemArr: Vacation[] | Asset[]
    }
    children: ReactNode
}

export default function SimpleCollapsableCard({
    user,
    searchParams,
    setSearchParams,
    items,
    children,
}: SimpleCollapsableCardProps) {
    const { _id, firstName, lastName, phone, role, imageUrl } = user
    const expandUserCard = (id: string) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            newParams.set('selectedUser', id)
            return newParams
        })
    }
    const collapse = () => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            newParams.delete('selectedUser')
            return newParams
        })
    }

    const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        if (searchParams.get('selectedUser') === _id) {
            collapse()
        } else {
            expandUserCard(_id)
        }
    }

    return (
        <Card
            className={style.userDiv}
            padding="1.25rem"
            borderRadius="1rem"
            backgroundColor={'white'}
        >
            <div className={style.mainData} onClick={handleCardClick}>
                <div className={style.leftMainData}>
                    <img
                        src={imageUrl}
                        alt={`${firstName}'s profile picture`}
                    />
                    <div>
                        <h3>
                            {firstName} {lastName}
                        </h3>
                        <p>
                            {phone} - {role}
                        </p>
                    </div>
                </div>
                <div className={style.rightMainData}>
                    <div onClick={handleCardClick}>
                        <p>
                            View{' '}
                            {searchParams.get('selectedUser') === _id
                                ? 'Less'
                                : 'More'}
                        </p>
                        {searchParams.get('selectedUser') === _id ? (
                            <ExpandLess fontSize="medium" />
                        ) : (
                            <ExpandMore fontSize="medium" />
                        )}
                    </div>
                    {searchParams.get('selectedUser') !== _id && items && (
                        <p>
                            {items.itemArr.length} {items.type}
                            {items.itemArr.length === 1 ? '' : 's'}
                        </p>
                    )}
                </div>
            </div>
            <Collapse
                in={
                    searchParams.get('selectedUser') !== null &&
                    _id === searchParams.get('selectedUser')
                }
                timeout="auto"
                unmountOnExit
            >
                {children}
            </Collapse>
        </Card>
    )
}
