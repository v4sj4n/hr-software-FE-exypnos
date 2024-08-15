import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './Dropzone.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { useEvents } from '@/Pages/Events/Context/EventsContext';

interface DropzoneProps {
  className?: string;
}

interface PreviewFile extends File {
  preview: string;
}

const Dropzone: React.FC<DropzoneProps> = ({ className }) => {
  const { eventPhotos, handleFileUpload } = useEvents();
  const [previewFiles, setPreviewFiles] = useState<PreviewFile[]>([]);

  useEffect(() => {
    const newPreviewFiles = eventPhotos.map(file => 
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setPreviewFiles(newPreviewFiles);

    return () => newPreviewFiles.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [eventPhotos]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      handleFileUpload([...eventPhotos, ...acceptedFiles]);
    }
  }, [eventPhotos, handleFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxSize: 1024 * 1000, 
    onDrop,
  });

  const removeFile = (name: string) => {
    handleFileUpload(eventPhotos.filter(file => file.name !== name));
  };

  const removeAll = () => {
    handleFileUpload([]);
  };

  return (
    <div>
      <div {...getRootProps({ className: `${styles.container} ${className}` })}>
        <input {...getInputProps()} />
        <div className={styles.container}>
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.flexRow}>
          <button
            type="button"
            onClick={removeAll}
            className={styles.removeAllBtn}
          >
            Remove all files
          </button>
        </div>

        <h3 className={styles.title}>Accepted Files</h3>
        <ul className={styles.previewList}>
          {previewFiles.map((file) => (
            <li key={file.name} className={styles.previewItem}>
              <img
                src={file.preview}
                alt={file.name}
                width={50}
                height={50}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
                className={styles.image}
              />
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeFile(file.name)}
              >
                <CloseIcon />
              </button>
              <p className={styles.fileName}>{file.name}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dropzone;