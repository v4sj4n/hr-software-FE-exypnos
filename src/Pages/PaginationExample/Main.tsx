import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { fetchItems } from './PaginationExample'

export default function Pagination() {
    const { data, error, status, fetchNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ['events'],
            queryFn: fetchItems,
            initialPageParam: 0,
            getNextPageParam: (lastPage) => lastPage.nextPage,
        })

    const { ref, inView } = useInView()

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [fetchNextPage, inView])

    return status === 'pending' ? (
        <div>Loading...</div>
    ) : status === 'error' ? (
        <div>{error.message}</div>
    ) : (
        <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
            {data.pages.map((page) => {
                return (
                    <div
                        key={page.currentPage}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                        }}
                    >
                        {page.data.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                    style={{
                                        borderRadius: '0.375rem',
                                        backgroundColor: '#374151', // This is an approximate color for bg-grayscale-700
                                        padding: '1rem',
                                    }}
                                >
                                    {item.name}
                                </div>
                            )
                        })}
                    </div>
                )
            })}

            <div ref={ref}>{isFetchingNextPage && 'Loading...'}</div>
        </div>
    )
}
