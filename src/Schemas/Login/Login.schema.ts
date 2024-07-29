import z from "zod"

  
export const loginSchema = z.object({
    email: z.string().email({message: "This field must be a valid email address"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters long"}).regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]$/
),
})

export type LoginFormFields = z.infer<typeof loginSchema>