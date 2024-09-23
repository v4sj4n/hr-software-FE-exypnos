import { useEffect, useState } from 'react'
import Card from '@/Components/Card/Card'
import style from './styles/promotion.module.css'
import ChartBar from './components/ChartBar'
import PromotionCard from './components/PromotionCard'
import Rating from './components/Rating'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'
import AxiosInstance from '@/Helpers/Axios'
import { Button } from '@mui/material'
import DrawerComponent from '@/Components/Drawer/Drawer'

type TeamMember = {
    _id: string
    firstName: string
    lastName: string
    position: string
    grade: string
}

export default function Promotion() {
    const { currentUser } = useAuth()
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
    const [openDrawer, setOpenDrawer] = useState(false)
    const [id, setId] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [buttonText, setButtonText] = useState('Look At Team Members')

    useEffect(() => {
        if (currentUser?.role === 'hr' || currentUser?.role === 'pm') {
            fetchTeamMembers()
        }
        setId(currentUser!._id.toString())
        setName(`${currentUser?.firstName} ${currentUser?.lastName}`)
    }, [currentUser])

    const fetchTeamMembers = async () => {
        try {
            const response = await AxiosInstance.get(
                `/project/pm/${currentUser?._id}`,
            )
            setTeamMembers(response.data)
        } catch (error) {
            console.error('Error fetching team members:', error)
        }
    }

    const handleClickButton = () => {
        if (buttonText === 'Go Back') {
            setId(currentUser!._id.toString())
            setName(`${currentUser?.firstName} ${currentUser?.lastName}`)
            setButtonText('Look At Team Members')
            return
        }
        setOpenDrawer(true)
    }

    const handleDrawerClose = () => {
        setOpenDrawer(false)
    }

    const handelTeamMemberClick = (memberId: string) => {
        setId(memberId)
        setName(
            teamMembers.find((member) => member._id === memberId)!.firstName +
                ' ' +
                teamMembers.find((member) => member._id === memberId)!.lastName,
        )
        setOpenDrawer(false)
        setButtonText('Go Back')
    }

    return (
        <>
            <div style={{ display: 'flex' }}>
                <h3
                    style={{ position: 'absolute', top: '95px', right: '20px' }}
                >
                    {name}
                </h3>
            </div>
            <div className={style.container}>
                <DrawerComponent open={openDrawer} onClose={handleDrawerClose}>
                    <h1>Team Members</h1>
                    {teamMembers.map((member) =>
                        member._id !== currentUser?._id?.toString() ? (
                            <div
                                key={member._id}
                                className={style.member}
                                onClick={() =>
                                    handelTeamMemberClick(member._id)
                                }
                            >
                                <h5>
                                    {member.firstName} {member.lastName}
                                </h5>
                                <p>{member.grade}</p>
                                <p>{member.position}</p>
                            </div>
                        ) : null,
                    )}
                </DrawerComponent>
                <div className={style.firstDiv}>
                    <Card
                        padding="20px"
                        backgroundColor="rgba(255, 255, 255, 0.7)"
                    >
                        <ChartBar id={id} />
                    </Card>
                    <Rating id={id} />
                </div>
                <div className={style.thirdDiv}>
                    {(currentUser?.role === 'hr' ||
                        currentUser?.role === 'pm') && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClickButton}
                        >
                            {buttonText}
                        </Button>
                    )}
                    <PromotionCard id={id} />
                </div>
            </div>
        </>
    )
}
