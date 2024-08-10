import { EmployeesWithHoldings } from './Component/EmployeesWithHoldings.tsx'
import { ChangeEvent, useContext } from 'react'
import Input from '@/Components/Input/Index.tsx'
import FormLabel from '@mui/joy/FormLabel'
import Radio, { radioClasses } from '@mui/joy/Radio'
import RadioGroup from '@mui/joy/RadioGroup'
import Sheet from '@mui/joy/Sheet'
import Box from '@mui/joy/Box'
import { debounce } from 'lodash'
import { TooltipImproved } from '@/Components/Tooltip/Tooltip.tsx'
import HoldingsProvider, { HoldingsContext } from './HoldingsContext.tsx'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import style from './style/holdings.module.scss'
import { UserHoldings } from './Component/UserHoldings.tsx'

function HoldingsComponent() {
  const { setSearchParams, searchParams } = useContext(HoldingsContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      const value = e.target.value
      const newParams = new URLSearchParams(prev)
      if (newParams.get('selected')) {
        newParams.delete('selected')
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
      if (newParams.get('selected')) {
        newParams.delete('selected')
      }

      if (value) {
        newParams.set('search', value)
      } else {
        newParams.delete('search')
      }
      return newParams
    })
  }, 500)
  const userFilterChoices = ['ALL', 'W ASSETS', 'W/O ASSETS']

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchParams(e.target.value)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div className={style.titleHeading}>
        <div className={style.title}>Holdings</div>
        <Input
          type="text"
          iconPosition="end"
          icon={<SearchOutlinedIcon />}
          IsUsername
          label="Search"
          name="search"
          initialValue={searchParams.get('search') || ''}
          onChange={onSearchChange}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormLabel
            id="filter-user-choices"
            sx={{
              mb: 1.5,
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
              searchParams.get('users') ? searchParams.get('users') : 'all'
            }
            sx={{ gap: 1, mb: 2, flexWrap: 'wrap', flexDirection: 'row' }}
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
                    theme.vars.palette.neutral.outlinedBorder,
                  [`& .${radioClasses.checked}`]: {
                    [`& .${radioClasses.label}`]: {
                      fontWeight: 'lg',
                    },
                    [`& .${radioClasses.action}`]: {
                      '--variant-borderWidth': '1px',
                      borderColor: 'text.secondary',
                    },
                  },
                  [`& .${radioClasses.action}.${radioClasses.focusVisible}`]: {
                    outlineWidth: '2px',
                  },
                }}
              >
                <TooltipImproved
                  text={
                    usersFilter === 'ALL'
                      ? 'All Employees'
                      : usersFilter === 'W ASSETS'
                      ? 'Employees with Assets'
                      : 'Employees without Assets'
                  }
                  placement="top"
                  offset={[0, 5]}
                >
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
                </TooltipImproved>
              </Sheet>
            ))}
          </RadioGroup>
        </Box>
      </div>
      <div className={style.mainContainer}>
        <EmployeesWithHoldings />

        <div className={style.selectedUserContainer}>
          {searchParams.get('selected') ? (
            <UserHoldings />
          ) : (
            <div className={style.noItemsOnSelectedUser}>
              <p>No User selected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Holdings() {
  return (
    <HoldingsProvider>
      <HoldingsComponent />
    </HoldingsProvider>
  )
}
