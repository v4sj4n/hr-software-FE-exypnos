import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import Input from '@/Components/Input/Index'
import {
  CreateAssetFormFields,
  createAssetSchema,
} from '@/Schemas/Assets/CreateAsset.schema'
import { ErrorText } from '@/Components/Error/ErrorTextForm'
import { InventoryContext } from '../InventoryContext'
import { onSubmit } from '../../hook'

export const CreateItemForm = () => {
  const { handleCloseCreateModalOpen, setAssets } = useContext(InventoryContext)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateAssetFormFields>({
    resolver: zodResolver(createAssetSchema),
  })

  return (
    <>
      <h3>Create an asset</h3>
      <form
        onSubmit={handleSubmit((data) =>
          onSubmit(data, { setError, setAssets, handleCloseCreateModalOpen })
        )}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          marginTop: '1.5rem',
        }}
      >
        <div>
          <select
            {...register('type')}
            style={{
              padding: '0.5rem',
              width: '100%',
              borderRadius: '0.5rem',
            }}
          >
            <option value="" disabled selected>
              Select an item
            </option>
            <option value="laptop">Laptop</option>
            <option value="monitor">Monitor</option>
          </select>
          {errors.type && <ErrorText>{errors.type.message}</ErrorText>}
        </div>

        <div>
          <Input
            IsUsername
            name="serialNumber"
            width={'100%'}
            label="Serial Number"
            register={register('serialNumber')}
          />
          {errors.serialNumber && (
            <ErrorText>{errors.serialNumber.message}</ErrorText>
          )}
        </div>
        {errors.root && <ErrorText>{errors.root.message}</ErrorText>}

        <div style={{ display: 'flex', gap: '0.3rem' }}>
          <Button
            type={ButtonTypes.SECONDARY}
            btnText="Cancel"
            border="none"
            onClick={handleCloseCreateModalOpen}
            width={'100%'}
          />
          <Button
            type={ButtonTypes.PRIMARY}
            btnText={isSubmitting ? 'Submitting' : 'Submit'}
            width={'100%'}
            isSubmit
          />
        </div>
      </form>
    </>
  )
}
