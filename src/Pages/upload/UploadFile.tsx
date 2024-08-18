// import React, { useRef, useState } from 'react'

// export default function UploadFile() {
//     const inputRef = useRef()
//     const [selectedFiles, setSelectedFiles] = useState(null)
//     const [progress, setProgress] = useState(0)
//     const [uploadStatus, setUploadStatus] = useState('select')

//     const handleFileChange = (e) => {
//         if (e.target.files && e.target.files.length > 0) {
//             setSelectedFiles(e.target.files[0])
//         }
//     }

//     const onChooseFile = () => {
//         inputRef.current.click()
//     }

//     return (
//         <>
//             <div>
//                 <input
//                     ref={inputRef}
//                     type='file'
//                     onChange={handleFileChange}
//                     style={{ display: 'none' }}
//                 />

//             {!selectedFiles && (
//                 <button onClick={onChooseFile}><span>upload File</span></button>
//             )}

//             {selectedFiles && (
//                 <>
//                 <h6>File Name</h6>
//                 <div></div>
//                 </>
//             )}
//             </div>
//         </>
//     )
// }
