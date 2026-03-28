import React from 'react';

const ImageList = ({ imageData }) => {
    return (
        <div>
            <h2>Flower Counts</h2>
            <ul>
                {imageData.map((item, index) => (
                    <li key={index}>
                        <img src={`http://localhost:3002/flower_test_images/${item.filename}`} alt={`flower-${index}`} width="100" />
                        <p>Filename: {item.filename}</p>
                        <p>Flower Count: {item.count}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ImageList;
