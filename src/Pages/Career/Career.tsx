// import { useState } from 'react';
// import style from './Style/Career.module.css';
// import Button from '@/Components/Button/Button';
// import { ButtonTypes } from '@/Components/Button/ButtonTypes';
// import Recruitment from '../Recruitment/Recruitment'; 
// import { useGetAllEvents,useCreateCareer,useDeleteCareer,useUpdateCareer } from './Hook';

// export type career = {
//   id: number;
//   title: string;
//   department: string;
//   location: string;
//   description: string;
// };

// const careerOpenings: career[] = [
//   {
//     id: 1,
//     title: 'Software Engineer',
//     department: 'Engineering',
//     location: 'Tirana',
//     description: 'We are looking for a talented software engineer to join our team and help build innovative solutions.',
//   },
//   {
//     id: 2,
//     title: 'Product Manager',
//     department: 'Product',
//     location: 'Tirana',
//     description: 'Join our product team to drive the vision and strategy for our cutting-edge products.',
//   },
//   {
//     id: 3,
//     title: 'UX Designer',
//     department: 'Design',
//     location: 'Remote',
//     description: 'Help create intuitive and beautiful user experiences for our web and mobile applications.',
//   },
// ];

// const Careers = () => {
//   const [selectedcareer, setSelectedcareer] = useState<career | null>(null);
//   const [filter, setFilter] = useState<string>('');

//   const handleApply = (career: career) => {
//     setSelectedcareer(career);
//     console.log(`Applying for ${career.title}`);
//   };

//   const handleFilterChange = (e: React.Changecareer<HTMLInputElement>) => {
//     setFilter(e.target.value);
//   };

//   const filteredcareers = careerOpenings.filter((career) =>
//     career.title.toLowerCase().includes(filter.toLowerCase()) ||
//     career.department.toLowerCase().includes(filter.toLowerCase()) ||
//     career.location.toLowerCase().includes(filter.toLowerCase())
//   );
// return (
//   <div className={style.body}>
//     <div className={style.container}>
//       <div className={style.hero}>
//         <h1>Join Our Team</h1>
//         <p>Be part of something bigger. Make a difference in the world of technology.</p>
//       </div>

//       <div className={style.filter}>
//         <input 
//           type="text" 
//           placeholder="Filter by title, or location"
//           value={filter}
//           onChange={handleFilterChange}
//           className={style.filterInput}
//         />
//       </div>

//       <div className={style.jobList}>
//         {filteredJobs.map((job) => (
//           <div key={job.id} className={style.jobCard}>
//             <h2>{job.title}</h2>
//             <p className={style.department}>{job.department}</p>
//             <p className={style.location}>{job.location}</p>
//             <p className={style.description}>{job.description}</p>
//             <Button 
//               btnText="Apply" 
//               type={ButtonTypes.PRIMARY}
//               onClick={() => handleApply(job)}
//             />
//           </div>
//         ))}
//       </div>

//       {selectedJob && (
//         <Recruitment job={selectedJob} onClose={() => setSelectedJob(null)} />
//       )}

//       <div className={style.culture}>
//         <h2>Our Culture</h2>
//         <p>At our company, we value innovation, collaboration, and growth. Join us and thrive in a supportive and dynamic environment.</p>
//       </div>

//       <div className={style.testimonials}>
//         <h2>What Our Employees Say</h2>
//         <p>"This company has provided me with numerous opportunities for growth and development."</p>
//         <p>"I love the collaborative and inclusive culture here."</p>
//       </div>

//       <div className={style.footer}>
//         <p>&copy; 2024  Codevider. All rights reserved.</p>
//         <p>Follow us on <a href="#">LinkedIn</a> .</p>
//       </div>
//     </div>
//   </div>
// );
// };

// export default Careers;

import { useState } from 'react';
import style from './Style/Career.module.css';
import Button from '@/Components/Button/Button';
import { ButtonTypes } from '@/Components/Button/ButtonTypes';
import { useGetAllEvents, useCreateCareer, useDeleteCareer, useUpdateCareer } from './Hook';
import { CareerData } from './Interface/Career';

export default function Careers() {
  const [filter, setFilter] = useState<string>('');
  const { events: careers, isLoading } = useGetAllEvents();
  const { editingCareer, editingTime, handleEditChange, updateEvent, showForm, toggleForm, handleEditClick } = useUpdateCareer();
  const { handleDelete, showModal, handleDeleteEventModal, closeModal, careerToDeleteId } = useDeleteCareer();

  const filteredCareer = careers.filter((career) =>
    career.title.toLowerCase().includes(filter.toLowerCase()) ||
    career.location.toLowerCase().includes(filter.toLowerCase())
  );

  if (isLoading) return <p>Loading...</p>;

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
            placeholder="Filter by title or location"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={style.filterInput}
          />
        </div>

        <div className={style.careerList}>
          {filteredCareer.map((career) => (
            <div key={career._id} className={style.careerCard}>
              <h2>{career.title}</h2>
              <p className={style.department}>{career.department}</p>
              <p className={style.location}>{career.location}</p>
              <p className={style.description}>{career.description}</p>
              <Button 
                btnText="Apply" 
                type={ButtonTypes.PRIMARY}
                onClick={() => handleApply(career)}
              />
              <Button 
                btnText="Edit" 
                type={ButtonTypes.SECONDARY}
                onClick={() => handleEditClick(career)}
              />
              <Button 
                btnText="Delete" 
                type={ButtonTypes.DANGER}
                onClick={() => handleDeleteEventModal(career._id)}
              />
            </div>
          ))}
        </div>

        {showModal && (
          <div>
            <p>Are you sure you want to delete this event?</p>
            <Button btnText="Yes" onClick={() => handleDelete(careerToDeleteId)} />
            <Button btnText="No" onClick={closeModal} />
          </div>
        )}

        {showForm && (
          <form onSubmit={updateEvent}>
            <input 
              type="text"
              name="title"
              value={editingCareer?.title || ''}
              onChange={handleEditChange}
              placeholder="Title"
            />
            <input 
              type="text"
              name="description"
              value={editingCareer?.description || ''}
              onChange={handleEditChange}
              placeholder="Description"
            />
            <input 
              type="date"
              name="date"
              value={editingCareer?.date || ''}
              onChange={handleEditChange}
            />
            <input 
              type="time"
              name="time"
              value={editingTime}
              onChange={handleEditChange}
            />
            <Button btnText="Update" type={ButtonTypes.PRIMARY} />
          </form>
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
          <p>&copy; 2024 Codevider. All rights reserved.</p>
          <p>Follow us on <a href="#">LinkedIn</a>.</p>
        </div>
      </div>
    </div>
  );
};