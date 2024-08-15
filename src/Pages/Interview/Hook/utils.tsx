import { Interview } from './InterviewContext';

export const getInterviewsByPhase = (interviews: Interview[], phase: string) => {
  if (!Array.isArray(interviews)) {
    console.error('Expected an array of interviews');
    return [];
  }

  return interviews
    .filter(interview => interview.currentPhase === phase)
    .sort((a, b) => {
      const dateA = a.firstInterviewDate ? new Date(a.firstInterviewDate) : new Date(0);
      const dateB = b.firstInterviewDate ? new Date(b.firstInterviewDate) : new Date(0);

      if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
      if (isNaN(dateA.getTime())) return 1;
      if (isNaN(dateB.getTime())) return -1;

      return dateA.getTime() - dateB.getTime();
    });
};