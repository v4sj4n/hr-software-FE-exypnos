import AxiosInstance from '@/Helpers/Axios'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { valibotValidator } from '@tanstack/valibot-form-adapter'
import { useSearchParams } from 'react-router-dom'

const useHandlePasswordForget = () => {
    return useMutation({
        mutationFn: ({ email }: { email: string }) => {
            return AxiosInstance.post('/auth/forgot-password', { email })
        },
    })
}
const useHandlePasswordReset = () => {
    return useMutation({
        mutationFn: ({
            token,
            password,
        }: {
            token: string
            password: string
        }) => {
            return AxiosInstance.post('/auth/reset-password', {
                token,
                newPassword: password,
            })
        },
    })
}

export const useFormForgetPassword = () => {
    const { mutate, error, isError, isSuccess } = useHandlePasswordForget()
    const form = useForm({
        defaultValues: {
            email: '',
        },
        validatorAdapter: valibotValidator(),
        onSubmit: async ({ value }) => {
            mutate(value)
        },
    })

    return { form, error, isError, isSuccess }
}

export const useFormResetPassword = () => {
    const { mutate, error, isError, isSuccess } = useHandlePasswordReset()
    // SearchParams undestructured to not get ts errors :)
    const sP = useSearchParams()

    const form = useForm({
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
        onSubmit: async ({ value }) => {
            mutate({
                password: value.password,
                token: sP[0].get('token') as string,
            })
        },
    })
    return { form, error, isError, isSuccess }
}
