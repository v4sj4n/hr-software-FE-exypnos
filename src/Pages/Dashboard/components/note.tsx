import { useNoteDeletion } from '../Hook'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'

export const Note = ({
    title,
    description,
    noteId,
}: {
    title: string
    description: string
    noteId: string
}) => {
    const { mutate } = useNoteDeletion()
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <h3 style={{ margin: 0 }}>{title}</h3>
                <p style={{ margin: 0 }}>{description}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <Button
                    type={ButtonTypes.SECONDARY}
                    border="none"
                    textAlign="end"
                    paddingTop="0"
                    btnText="Remove"
                    onClick={() => mutate({ noteId })}
                />
            </div>
        </div>
    )
}
