import React, { useState } from 'react';

function ResumeUploader() {
    // State to store the selected file, backend response, and any error messages.
    const [selectedFile, setSelectedFile] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState('');

    // Update state when the user selects a file.
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Handle the form submission to upload the file.
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setError('Please select a file to upload.');
            return;
        }
        setError('');
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            // Send the file to the backend endpoint.
            const response = await fetch('http://localhost:8080/resume/match', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Server responded with an error.');
            }
            const data = await response.json();
            setResponseData(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Upload Your Resume</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <br /><br />
                <button type="submit">Upload and Get Job Matches</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {responseData && (
                <div>
                    <h3>Job Matches</h3>
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default ResumeUploader;
