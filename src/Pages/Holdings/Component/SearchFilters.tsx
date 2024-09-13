import { ChangeEvent, useContext } from 'react'
import { HoldingsContext } from '../HoldingsContext'
import { debounce } from '@/Helpers/debounce'
import Input from '@/Components/Input/Index'
import { SearchOutlined } from '@mui/icons-material'
import {
    FormLabel,
    Radio,
    RadioGroup,
    Sheet,
    Box,
    radioClasses,
} from '@mui/joy'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles'
// import { TooltipImproved } from '@/Components/Tooltip/Tooltip'


export const HoldingsSearchFilter = () => {
    const { searchParams, setSearchParams } = useContext(HoldingsContext)

    const theme = extendTheme({
        components: {
            JoyRadioGroup: {
                styleOverrides: {
                    root: {
                        '--Radio-radius': '7.5px',
                    },
                },
            },
        },
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchParams((prev) => {
            const value = e.target.value
            const newParams = new URLSearchParams(prev)
            if (newParams.get('selectedHolding')) {
                newParams.delete('selectedHolding')
            }

            if (value === 'all') {
                newParams.delete('users')
            } else {
                newParams.set('users', value)
            }

            return newParams
        })
    }

    const debouncedSetSearchParams = debounce((value: string) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            if (newParams.get('selectedHolding')) {
                newParams.delete('selectedHolding')
            }

            if (value) {
                newParams.set('search', value)
            } else {
                newParams.delete('search')
            }
            return newParams
        })
    }, 500)
    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        debouncedSetSearchParams(e.target.value)
    }
    const userFilterChoices = ['ALL', 'W ASSETS', 'W/O ASSETS']
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem',
            }}
        >
            <Input
                type="search"
                iconPosition="end"
                icon={<SearchOutlined />}
                IsUsername
                label="Search"
                name="search"
                initialValue={searchParams.get('search') || ''}
                onChange={onSearchChange}
            />
            <CssVarsProvider theme={theme}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <FormLabel
                        id="filter-user-choices"
                        sx={{
                            fontWeight: 'xl',
                            textTransform: 'uppercase',
                            fontSize: 'xs',
                            letterSpacing: '0.1em',
                        }}
                    >
                        Filter by
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="product-size-attribute"
                        defaultValue={
                            searchParams.get('users')
                                ? searchParams.get('users')
                                : 'all'
                        }
                        sx={{
                            gap: 1,
                            backgroundColor: 'transparent',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                        }}
                        onChange={handleChange}
                    >
                        {userFilterChoices.map((usersFilter) => (
                            <Sheet
                                key={usersFilter}
                                sx={{
                                    position: 'relative',
                                    height: 40,
                                    flexShrink: 0,
                                    padding: '0.333rem 1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    alignSelf: 'end',
                                    borderRadius: 7.5,
                                    justifyContent: 'center',
                                    '--joy-focus-outlineOffset': '4px',
                                    '--joy-palette-focusVisible': (theme) =>
                                        theme.vars.palette.neutral
                                            .outlinedBorder,
                                    [`& .${radioClasses.checked}`]: {
                                        [`& .${radioClasses.label}`]: {
                                            fontWeight: 'lg',
                                        },
                                        [`& .${radioClasses.action}`]: {
                                            '--variant-borderWidth': '1px',
                                            borderColor: 'text.secondary',
                                        },
                                    },
                                    [`& .${radioClasses.action}.${radioClasses.focusVisible}`]:
                                        {
                                            outlineWidth: '2px',
                                        },
                                }}
                            >
                                {/* <TooltipImproved
                                PROBLEME KUR ESHTE INSTALUAR THEME PURPLE / BLUE
                                    text={
                                        usersFilter === 'ALL'
                                            ? 'All Employees'
                                            : usersFilter === 'W ASSETS'
                                              ? 'Employees with Assets'
                                              : 'Employees without Assets'
                                    }
                                    placement="top"
                                    offset={[0, 5]}
                                > */}
                                <Radio
                                    color="neutral"
                                    overlay
                                    disableIcon
                                    value={
                                        usersFilter === 'ALL'
                                            ? 'all'
                                            : usersFilter === 'W ASSETS'
                                              ? 'with'
                                              : 'without'
                                    }
                                    label={usersFilter}
                                />
                                {/* </TooltipImproved> */}
                            </Sheet>
                        ))}
                    </RadioGroup>
                </Box>
            </CssVarsProvider>
        </div>
    )
}
