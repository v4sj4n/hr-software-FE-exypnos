export const tableUserPresenceFormatter = (
    value: null | { firstName: string; lastName: string },
) => {
    return value === null ? 'N/A' : `${value.firstName} ${value.lastName}`
}
