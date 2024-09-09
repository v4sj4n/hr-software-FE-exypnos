import { useNavigate } from 'react-router-dom'
import style from './notFound.module.scss'
import { useEffect, useState } from 'react'
export default function NotFound() {
    const navigate = useNavigate()
    const [count, setCount] = useState(5)

    useEffect(() => {
        setTimeout(() => {
            navigate('/dashboard')
        }, 5500)
    })
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => prevCount - 1)
        }, 1000)
        if (count === 0) {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [count])
    return (
        <main className={style.mainContainer}>
            <div className={style.itemsContainer}>
                <img src="/Images/notFound.png" alt="not found illustration" />
                <h3>Ooops, this page is not found</h3>
                {count > 0 ? (
                    <p>Redirecting you to the homepage in {count} seconds </p>
                ) : (
                    <p>Redirecting you to the homepage...</p>
                )}
            </div>
        </main>
    )
}
