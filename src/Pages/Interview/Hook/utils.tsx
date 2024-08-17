import { Interview } from './InterviewContext'

export const formatDate = (dateString: string | number | Date) => {
    if (!dateString) {
        return 'No Date Provided'
    }

    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
        return 'Invalid Date'
    }
    const formattedDate = date.toLocaleDateString('en-GB')
    const formattedTime = date.toLocaleTimeString('en-GB')
    return `${formattedDate} ${formattedTime}`
}

export const getInterviewsByPhase = (
    interviews: Interview[],
    phase: string,
) => {
    return interviews
        .filter((interview) => interview.phase === phase)
        .sort(
            (a, b) =>
                new Date(a.interviewDate).getTime() -
                new Date(b.interviewDate).getTime(),
        )
}
