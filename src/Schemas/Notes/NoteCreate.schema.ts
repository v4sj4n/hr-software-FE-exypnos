import { minLength, nonEmpty, object, pipe, string } from 'valibot'

export const NoteCreateSchema = object({
    title: pipe(
        string('Title is required'),
        nonEmpty('Please dont leave the title empty'),
        minLength(3, 'Title should be at least 3 characters long'),
    ),
    description: pipe(
        string('Description is required'),
        nonEmpty('Please dont leave the description empty'),
        minLength(10, 'Description should be at least 10 characters long'),
    ),
})
