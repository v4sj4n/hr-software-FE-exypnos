export function FormatPhoneNumber(phoneNumber: string) {
    return phoneNumber.replace(
        /(\+\d{3})(\d{2})(\d{2})(\d{2})(\d{3})/,
        '$1 $2 $3 $4 $5',
    )
}
