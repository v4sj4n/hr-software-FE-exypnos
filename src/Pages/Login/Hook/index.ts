import AxiosInstance from '@/Helpers/Axios'
import { useForm } from '@tanstack/react-form'
import { valibotValidator } from '@tanstack/valibot-form-adapter'
import { AxiosError } from 'axios'
import { useAuth } from '@/Context/AuthProvider'
import { Dispatch } from 'react'

export const useFormLogin = (
    setError: Dispatch<React.SetStateAction<string | null>>,
) => {
    const { login } = useAuth()

    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        validatorAdapter: valibotValidator(),
        onSubmit: async ({ value }) => {
            try {
                const res = await AxiosInstance.post('/auth/signin', value)
                const user = res.data.data.user
                const role = user.role
                const access_token = res.data.data.access_token
                login(access_token, role, user)
            } catch (err: unknown) {
                if (err instanceof AxiosError) {
                    if (err?.response?.data?.message) {
                        setError(err?.response?.data?.message)
                        return
                    }
                    if (err.code === 'ERR_NETWORK') {
                        setError(
                            'No internet connection. Please try again later.',
                        )
                        return
                    }
                }
                setError('An error occurred. Please try again later.')
            }
        },
    })

    return { form }
}