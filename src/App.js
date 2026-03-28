import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import ImageList from './components/ImageList';
import axios from 'axios';

const App = () => {
    const [imageData, setImageData] = useState([]);

    const handleUpload = async (files) => {
        try {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i]); // Ensure the key matches what your backend expects
            }

            // Use environment variable for backend URL
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/process-images`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Convert response data to the expected format
            const imageData = Object.entries(response.data).map(([filename, count]) => ({
                filename,
                count
            }));
            setImageData(imageData);
        } catch (error) {
            console.error('Error processing images:', error);
        }
    };

    return (
        <div className="container">
            <h1>Flower Count Application</h1>
            <FileUpload onUpload={handleUpload} />
            <ImageList imageData={imageData} />
        </div>
    );
};

export default App;
