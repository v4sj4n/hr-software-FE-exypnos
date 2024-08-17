import z from 'zod'

export const createInventoryItemSchema = z.object({
    type: z.enum(['laptop', 'monitor'], {
        message: 'Asset should be either a laptop or a monitor',
    }),
    serialNumber: z.string().min(10, {
        message: 'Serial Number should be at least 10 characters long',
    }),
})

export type CreateInventoryItemFormFields = z.infer<
    typeof createInventoryItemSchema
>
