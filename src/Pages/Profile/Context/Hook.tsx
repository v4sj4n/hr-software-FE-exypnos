import { useContext } from 'react'
import { FileUploadContext } from './UploadPicContext'

export const useFileUpload = () => {
    const context = useContext(FileUploadContext)
    if (!context) {
        throw new Error(
            'useFileUpload must be used within a FileUploadProvider',
        )
    }
    return context
}
