import { InferInput, isoDate, object, picklist, pipe, string } from 'valibot'

export const ReturnAssetSchema = object({
    returnDate: pipe(
        string('Please enter a date'),
        isoDate('Please enter a date.'),
    ),
    status: picklist(
        ['available', 'broken'],
        "Please select a status of the following 'available' or 'broken'",
    ),
})
export type ReturnAssetFormFields = InferInput<typeof ReturnAssetSchema>
