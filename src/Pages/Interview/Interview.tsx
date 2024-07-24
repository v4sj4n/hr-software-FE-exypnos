import style from './styles/Interview.module.css'
import React, { useState } from 'react';
import CandidateTable from './Hook/interviewTable';

interface Candidate {
  _id: string;
  Name: string;
  Position: string;
  InterviewDate: string | null;
}

const dummyCandidates: Candidate[] = [
  { _id: "1", Name: "Artenisa nuri", Position: "Software Engineer", InterviewDate: "2024-07-25 14:00" },
  { _id: "2", Name: "Artenisa nuri", Position: "Product Manager", InterviewDate: null },
  { _id: "3", Name: "Artenisa nuri", Position: "UX Designer", InterviewDate: "2024-07-26 10:30" },
];

const InterviewPage: React.FC = () => {
  const [candidates] = useState<Candidate[]>(dummyCandidates);

  const scheduleInterview = (id: string) => {
    console.log(`Schedule interview for candidate ${id}`);
  };

  const viewProfile = (id: string) => {
    console.log(`View profile of candidate ${id}`);
  };

  return (
    <div className={style.interviewPage}>
      <h1 className={style.title}>Interview Schedule</h1>
      <CandidateTable candidates={candidates}
        onSchedule={scheduleInterview}
        onViewProfile={viewProfile} />
    </div>
  );
};

export default InterviewPage;