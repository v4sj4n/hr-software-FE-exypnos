import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AxiosInstance from '@/Helpers/Axios'
import { Box, CircularProgress, Typography } from '@mui/joy'

const EmailConfirmation: React.FC = () => {
    const { search } = useLocation()
    const query = new URLSearchParams(search)
    const token = query.get('token')
    const [status, setStatus] = useState<'pending' | 'success' | 'error'>(
        'pending',
    )
    const navigate = useNavigate()

    useEffect(() => {
        const confirm = async () => {
            if (token) {
                try {
                    const confirmationUrl = `/applicant/confirm?token=${token}`
                    const response = await AxiosInstance.get(confirmationUrl)

                    if (response.status === 200) {
                        setStatus('success')
                    } else {
                        setStatus('error')
                    }
                } catch (error) {
                    console.error('Error confirming application:', error)
                    setStatus('error')
                }
            } else {
                setStatus('error')
            }
        }

        confirm()
    }, [navigate, token])

    useEffect(() => {
        if (status === 'success') {
            setTimeout(() => {
                navigate('/career')
            }, 5000)
        }
    }, [status, navigate])

    return (
        <Box
            sx={{
                height: '100svh',
                width: '100svw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {status === 'pending' ? (
                <Box>
                    <Typography>Confirming</Typography>
                    <CircularProgress />
                </Box>
            ) : status === 'success' ? (
                <Box>
                    <Typography level="title-lg">
                        Confirmation Successful!
                    </Typography>
                    <Typography level="body-md">
                        Your application has been confirmed. You will be
                        redirected shortly.
                    </Typography>
                </Box>
            ) : (
                <Box>
                    <Typography level="title-lg">
                        Confirmation Failed
                    </Typography>
                    <Typography level="body-md">
                        There was an issue confirming your application.
                    </Typography>
                    <Typography level="body-sm">
                        Please try again later.
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default EmailConfirmation
