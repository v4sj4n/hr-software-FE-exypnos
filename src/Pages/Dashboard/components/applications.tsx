import React from 'react';
import style from "../../../Pages/Dashboard/style/applications.module.css"

interface Application {
  id: number;
  name: string;
  position: string;
  date: string;
}

const applications: Application[] = [
  { id: 1, name: 'John Doe', position: 'Software Engineer', date: '2024-07-01' },
  { id: 2, name: 'Jane Smith', position: 'Product Manager', date: '2024-07-02' },
  { id: 3, name: 'Sam Wilson', position: 'Designer', date: '2024-07-03' },
];

const NewApplications: React.FC = () => {
  return (
    <div className={style.newApplications}>
      <h2>New Applications</h2>
      <ul>
        {applications.map(application => (
          <li key={application.id} className={style.applicationItem}>
            <div className={style.applicationDetails}>
              <h3>{application.name}</h3>
              <p>Position: {application.position}</p>
              <p>Date: {application.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewApplications;
