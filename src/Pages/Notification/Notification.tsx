// import { useAuth } from '@/Context/AuthProvider'
// import AxiosInstance from '@/Helpers/Axios'
// import { useEffect, useState } from 'react'
// import style from "./notification.module.css"

// interface NotificationData {
//     _id: string,
//         title: string,
//         content: string,
//         type: string,
//         typeId: string,

// }

// export default function Notification() {

//     const [notification, setNotification] = useState<NotificationData[]>([])
//     const {currentUser} = useAuth()
//     const currentUserId = currentUser?._id;
//     console.log(currentUserId)

//     useEffect(() => {

//         AxiosInstance.get<NotificationData[]>(`notification/user/${currentUserId}`)
//             .then((response) => {
//                 setNotification(response.data)
//                 console.log('User fetched:', response.data)
//                 setNotification(response.data)
//             })
//             .catch((error) => {
//                 console.error('Error fetching data:', error)
//             })

//     }, [currentUserId])

//   return (
//     <div>
//       {notification.map(notification => (
//         <div key={notification._id}>
//             <div>{notification.title}</div>
//             <div> {notification.content}</div>
//             <div> {notification.type}</div>
//             <div> {notification.typeId}</div>
//         </div>
//       ))}
//     </div>
//   )
// }
