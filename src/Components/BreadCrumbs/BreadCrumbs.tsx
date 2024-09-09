import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useLocation, Link as RouterLink } from 'react-router-dom'

interface BreadcrumbItem {
    name: string
    path: string
}

interface Route {
    name: string
    parent: string | null
}

const routeStructure: Record<string, Route> = {
    '/dashboard': { name: 'Dashboard', parent: null },
    '/recruitment': { name: 'Recruitment', parent: 'Recruiting' },
    '/candidates': { name: 'Candidates', parent: 'Recruiting' },
    '/interview': { name: 'Interviews', parent: 'Recruiting' },
    '/employees': { name: 'Employees', parent: 'Employee' },
    '/payroll': { name: 'Payroll', parent: 'Employee' },
    '/payroll/user/:id': { name: 'Historic Payroll', parent: 'Payroll' },
    '/vacation': { name: 'Vacation', parent: 'Employee' },
    '/promotion': { name: 'Promotion', parent: 'Employee' },
    '/holdings': { name: 'Holdings', parent: 'Assets' },
    '/inventory': { name: 'Inventory', parent: 'Assets' },
    '/events': { name: 'Upcoming Events', parent: 'Events' },
    '/activities': { name: 'Activities', parent: 'Events' },
    '/career': { name: 'Career', parent: 'Events' },
    '/structure': { name: 'Structure', parent: null },
    '/historic': { name: 'About Hr-System', parent: null },
    '/view/:id': { name: 'View Candidate Details', parent: 'Employees' },
    '/profile/:id': { name: 'Profile', parent: 'Employee' },
    '/holdings/:id': { name: 'User Holdings', parent: 'Holdings' },
    '/promotion/:id': { name: 'User Promotion', parent: 'Promotion' },
}

export const BreadcrumbComponent = () => {
    const location = useLocation()
    const currentPath = location.pathname

    const generateBreadcrumbs = (path: string): BreadcrumbItem[] => {
        const breadcrumbs: BreadcrumbItem[] = []
        let currentRoute: string | null = path

        while (currentRoute) {
            const matchingRoute = Object.keys(routeStructure).find((route) => {
                const routeRegex = new RegExp(
                    `^${route.replace(/:\w+/g, '\\w+')}$`,
                )
                return routeRegex.test(currentRoute || '')
            })

            const route: Route | undefined = matchingRoute
                ? routeStructure[matchingRoute]
                : undefined

            if (route) {
                breadcrumbs.unshift({
                    name: route.name,
                    path: currentRoute,
                })
                currentRoute = route.parent ? `/${route.parent}` : null
            } else {
                breadcrumbs.unshift({
                    name: currentRoute.split('/').pop() || currentRoute,
                    path: currentRoute,
                })
                break
            }
        }

        return breadcrumbs
    }

    const breadcrumbs = generateBreadcrumbs(currentPath)

    return (
        <Stack sx={{ marginBottom: '16px', maxWidth: '50%' }}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="medium" />}
                aria-label="breadcrumb"
            >
                {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1
                    return isLast ? (
                        <div
                            style={{
                                color: '#000000',
                                fontWeight: 'bolder',
                                fontSize: '18px',
                                fontFamily: 'Outfit, sans-serif',
                            }}
                            key={crumb.path}
                        >
                            {crumb.name}
                        </div>
                    ) : (
                        <Link
                            component={RouterLink}
                            underline="hover"
                            key={crumb.path}
                            color="inherit"
                            to={crumb.path}
                            style={{ fontFamily: 'Outfit, sans-serif' }}
                        >
                            {crumb.name}
                        </Link>
                    )
                })}
            </Breadcrumbs>
        </Stack>
    )
}
