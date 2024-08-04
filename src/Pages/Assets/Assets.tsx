import { EmployeesWithAssets } from './Component/EmployeesWithAssets'
import AssetProvider, { AssetsContext } from './AssetsContext.tsx'
import { ChangeEvent, useContext } from 'react'
import Input from '@/Components/Input/Index.tsx'
import style from './style/assets.module.scss'
import FormLabel from '@mui/joy/FormLabel'
import Radio, { radioClasses } from '@mui/joy/Radio'
import RadioGroup from '@mui/joy/RadioGroup'
import Sheet from '@mui/joy/Sheet'
import Box from '@mui/joy/Box'

import { debounce } from 'lodash'
import { UserHoldings } from './Component/UserHoldings.tsx'

function AssetsComponent() {
  const { setSearchParams, searchParams } =
    useContext(AssetsContext)

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
    <>
      <div className={style.titleHeading}>
        <div className={style.title}>Holdings</div>
        <Input
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
            defaultValue={'all'}
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
                  padding: '1rem 2rem',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 20,
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
                <Radio
                  color="neutral"
                  overlay
                  disableIcon
                  data-tooltip-conf="top"
                  data-tooltip={`
                  ${
                    usersFilter === 'ALL'
                      ? 'All Employees'
                      : usersFilter === 'W ASSETS'
                      ? 'Employees with Assets'
                      : 'Employees without Assets'
                  }`}
                  value={
                    usersFilter === 'ALL'
                      ? 'all'
                      : usersFilter === 'W ASSETS'
                      ? 'with'
                      : 'without'
                  }
                  label={usersFilter}
                />
              </Sheet>
            ))}
          </RadioGroup>
        </Box>
      </div>
      <EmployeesWithAssets />
      {searchParams.get('selected') && <UserHoldings />}
    </>
  )
}

export default function Assets() {
  return (
    <AssetProvider>
      <AssetsComponent />
    </AssetProvider>
  )
}
