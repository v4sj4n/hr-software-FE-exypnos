import z from "zod"

export const createAssetSchema = z.object({
    type: z.enum(['laptop', 'monitor'], {
      message: 'Asset should be either a laptop or a monitor',
    }),
    serialNumber: z.string().min(10, {
      message: 'Serial Number should be at least 10 characters long',
    }),
  })
  
export type CreateAssetFormFields = z.infer<typeof createAssetSchema>