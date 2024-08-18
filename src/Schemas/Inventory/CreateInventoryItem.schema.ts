import {
    InferInput,
    minLength,
    nonEmpty,
    object,
    picklist,
    pipe,
    string,
} from 'valibot'

export const CreateInventoryItemSchema = object({
    type: picklist(
        ['laptop', 'monitor'],
        "Please select an item type of 'laptop' or'monitor'",
    ),
    serialNumber: pipe(
        string('Serial Number is required'),
        nonEmpty('Please type your serial number'),
        minLength(10, 'Serial Number should be at least 10 characters long'),
    ),
})

export type CreateInventoryItemFormFields = InferInput<
    typeof CreateInventoryItemSchema
>
