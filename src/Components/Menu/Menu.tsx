import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ListItemIcon from '@mui/material/ListItemIcon'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEvents } from '@/Pages/Events/Context/EventsContext'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { EventsData } from '@/Pages/Events/Interface/Events'

const ITEM_HEIGHT = 32

export default function LongMenu({ event }: { event: EventsData }) {
    const { handleOpenDrawer, handleDeleteEventModal } = useEvents()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleClickAway = () => {
        handleClose()
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon sx={{ margin: 0, padding: 0 }} />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                            borderRadius: '10px',
                            fontFamily: 'Outfit, sans-serif',
                            color: 'rgb(44, 56, 68)',
                        },
                    }}
                >
                    <div>
                        <MenuItem
                            onClick={() => handleOpenDrawer('edit', event)}
                        >
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            <button
                                style={{
                                    textDecoration: 'none',
                                    color: 'rgb(44, 56, 68)',
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                    fontFamily: 'Outfit, sans-serif',
                                    fontSize: '18px',
                                }}
                            >
                                Edit
                            </button>
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleDeleteEventModal(event._id)}
                        >
                            <ListItemIcon>
                                <DeleteIcon />
                            </ListItemIcon>
                            <button
                                style={{
                                    textDecoration: 'none',
                                    color: '#3C3A3B',
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                    fontFamily: 'Outfit, sans-serif',
                                    fontSize: '18px',
                                }}
                            >
                                Delete
                            </button>
                        </MenuItem>
                    </div>
                </Menu>
            </div>
        </ClickAwayListener>
    )
}
