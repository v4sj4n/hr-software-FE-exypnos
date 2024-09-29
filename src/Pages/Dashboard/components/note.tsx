import { useNoteDeletion } from '../Hook'
import { Button, Typography } from '@mui/joy'

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
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-0">
                <Typography level="title-lg">{title}</Typography>
                <Typography level="body-sm">{description}</Typography>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <Button
                    className="border-none text-end pt-0"
                    variant="soft"
                    color="neutral"
                    onClick={() => mutate({ noteId })}
                >
                    Remove
                </Button>
            </div>
        </div>
    )
}
