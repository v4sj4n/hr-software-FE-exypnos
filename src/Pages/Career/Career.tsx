import { useState } from 'react';
import style from './Style/Career.module.css';
import Button from '@/Components/Button/Button';
import { ButtonTypes } from '@/Components/Button/ButtonTypes';
import Recruitment from '../Recruitment/Recruitment'; // Ensure this path is correct

export type Job = {
  id: number;
  title: string;
  department: string;
  location: string;
  description: string;
};

const jobOpenings: Job[] = [
  {
    id: 1,
    title: 'Software Engineer',
    department: 'Engineering',
    location: 'Tirana',
    description: 'We are looking for a talented software engineer to join our team and help build innovative solutions.',
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    location: 'Tirana',
    description: 'Join our product team to drive the vision and strategy for our cutting-edge products.',
  },
  {
    id: 3,
    title: 'UX Designer',
    department: 'Design',
    location: 'Remote',
    description: 'Help create intuitive and beautiful user experiences for our web and mobile applications.',
  },
];

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filter, setFilter] = useState<string>('');

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    console.log(`Applying for ${job.title}`);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredJobs = jobOpenings.filter((job) =>
    job.title.toLowerCase().includes(filter.toLowerCase()) ||
    job.department.toLowerCase().includes(filter.toLowerCase()) ||
    job.location.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={style.body}>
      <div className={style.container}>
        <div className={style.hero}>
          <h1>Join Our Team</h1>
          <p>Be part of something bigger. Make a difference in the world of technology.</p>
        </div>

        <div className={style.filter}>
          <input 
            type="text" 
            placeholder="Filter by title, or location"
            value={filter}
            onChange={handleFilterChange}
            className={style.filterInput}
          />
        </div>

        <div className={style.jobList}>
          {filteredJobs.map((job) => (
            <div key={job.id} className={style.jobCard}>
              <h2>{job.title}</h2>
              <p className={style.department}>{job.department}</p>
              <p className={style.location}>{job.location}</p>
              <p className={style.description}>{job.description}</p>
              <Button 
                btnText="Apply" 
                type={ButtonTypes.PRIMARY}
                onClick={() => handleApply(job)}
              />
            </div>
          ))}
        </div>

        {selectedJob && (
          <Recruitment job={selectedJob} onClose={() => setSelectedJob(null)} />
        )}

        <div className={style.culture}>
          <h2>Our Culture</h2>
          <p>At our company, we value innovation, collaboration, and growth. Join us and thrive in a supportive and dynamic environment.</p>
        </div>

        <div className={style.testimonials}>
          <h2>What Our Employees Say</h2>
          <p>"This company has provided me with numerous opportunities for growth and development."</p>
          <p>"I love the collaborative and inclusive culture here."</p>
        </div>

        <div className={style.footer}>
          <p>&copy; 2024  Codevider. All rights reserved.</p>
          <p>Follow us on <a href="#">LinkedIn</a> .</p>
        </div>
      </div>
    </div>
  );
};

export default Careers;