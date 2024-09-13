export const dateFormatter = (value: Date | string) => {
    return new Date(value).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}
