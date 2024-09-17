export interface EventsData {
    _id: number
    title: string
    description: string
    location: string
    type: string
}

export interface EventsCreationData {
    title: string
    description: string
    location: string
    type: string
}

export enum EventType {
    SPORTS = 'sports',
    CAREER = 'career',
    TRAINING = 'training',
    TEAMBUILDING = 'teambuilding',
    OTHER = 'other',
}
