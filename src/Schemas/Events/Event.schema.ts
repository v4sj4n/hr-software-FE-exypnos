import {
    array,
    boolean,
    email,
    everyItem,
    InferInput,
    instance,
    isoDate,
    minLength,
    nonEmpty,
    object,
    optional,
    picklist,
    pipe,
    string,
    transform,
} from 'valibot'

export const EventSchema = object({
    title: pipe(
        string('Title is required'),
        nonEmpty('Please enter a title'),
        minLength(5, 'Title must be at least 5 characters long'),
    ),
    description: pipe(
        string('Description is required'),
        nonEmpty('Please enter a description'),
        minLength(10, 'Description must be at least 50 characters long'),
    ),
    type: picklist(
        ['sports', 'career', 'training', 'teambuilding', 'other'],
        'Please select an event type',
    ),
    startDate: pipe(
        string('Please enter a datetime'),
        isoDate('Please enter a datetime.'),
    ),
    endDate: pipe(
        string('Pleas enter an end datetime'),
        isoDate('Please enter a datetime.'),
    ),
    participants: optional(
        array(
            pipe(
                string('Email is required'),
                email('Please enter a valid email address'),
            ),
        ),
    ),

    location: pipe(
        string('Location is required'),
        nonEmpty('Please enter a location'),
        minLength(5, 'Location must be at least 5 characters long'),
    ),
    file: optional(
        pipe(
            instance(FileList),
            transform((fileList) => Array.from(fileList)),
            everyItem(
                (file) => file.type.startsWith('image/') && file.size <= 1e7,
                'Please enter an image',
            ),
        ),
    ),
    poll: optional(
        object({
            question: pipe(
                string('Question is required'),
                minLength(5, 'Question must be at least 5 characters long'),
            ),
            isMultipleVote: boolean('Is multiple-choice?'),
            options: array(
                pipe(
                    string('Option is required'),
                    nonEmpty('Please enter an option'),
                    minLength(2, 'Option must be at least 3 characters long'),
                ),
            ),
        }),
    ),
})
export type EventFormFields = InferInput<typeof EventSchema>
