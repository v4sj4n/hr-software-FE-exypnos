import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AxiosInstance from '../../../Helpers/Axios';

const EmailConfirmation: React.FC = () => {
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const token = query.get('token');
    const [status, setStatus] = useState<'confirming' | 'success' | 'error'>('confirming');

    useEffect(() => {
        const confirm = async () => {
            if (token) {
                try {
                    await AxiosInstance.post('http://localhost:3000/applicants/confirm', { token });
                    setStatus('success');
                } catch (error) {
                    console.error('Error confirming application:', error);
                    setStatus('error');
                }
            } else {
                setStatus('error');
            }
        };

        confirm();
    }, [token]);

    if (status === 'confirming') {
        return <div>Confirming your application...</div>;
    }

    if (status === 'success') {
        return (
            <div>
                <h1>Confirmation Successful!</h1>
                <p>Your application has been confirmed. You can now proceed to the recruitment page.</p>
                <a href="/recruitment">Go to Recruitment Page</a>
            </div>
        );
    }

    return (
        <div>
            <h1>Confirmation Failed</h1>
            <p>There was an issue with confirming your application. Please try again later </p>
        </div>
    );
};

export default EmailConfirmation;
