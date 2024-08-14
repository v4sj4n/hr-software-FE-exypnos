import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './Dropzone.module.css';
import CloseIcon from '@mui/icons-material/Close';

interface DropzoneProps {
  className?: string;
}

interface PreviewFile extends File {
  preview: string;
}

const Dropzone: React.FC<DropzoneProps> = ({ className }) => {
  const [files, setFiles] = useState<PreviewFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxSize: 1024 * 1000, 
    onDrop,
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!files?.length) return;

    const formData = new FormData();
    files.forEach((file) => formData.append('file', file));
    formData.append('upload_preset', 'friendsbook');

    const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
    if (URL) {
      const data = await fetch(URL, {
        method: 'POST',
        body: formData,
      }).then((res) => res.json());

      console.log(data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

      {/* Preview */}
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

        {/* Accepted files */}
        <h3 className={styles.title}>Accepted Files</h3>
        <ul className={styles.previewList}>
          {files.map((file) => (
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
    </form>
  );
};

export default Dropzone;
