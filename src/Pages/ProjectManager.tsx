import React, { useEffect, useState } from 'react'
import AxiosInstance from '@/Helpers/Axios';

interface ProjectData {
    _id: string;
    projectManager: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    teamMembers: Array<{
        _id: string;
        firstName: string;
        lastName: string;
    }>;
}

export default function ProjectManager() {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        setLoading(true);
        AxiosInstance.get<ProjectData[]>('/project/structure')
            .then(response => {
                console.log("API Response:", response.data);
                setProjects(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError("Failed to fetch projects. Please try again later.");
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
            {
                projects.map(project => (
                    <div key={project._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                        <p>Project Manager: {project.projectManager.firstName} {project.projectManager.lastName}</p>
                        <p>Team Members:
                            {project.teamMembers.map(member =>
                                `${member.firstName} ${member.lastName}`
                            ).join(', ')}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}