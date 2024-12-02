import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import {Header} from "./components/Header/Header.jsx";
import {Footer} from "./components/Footer/Footer.jsx";
import './App.css';

function App() {
    const [image, setImage] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setImage(URL.createObjectURL(file));
        recognizeImage(file);
    };

    const recognizeImage = async (file) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://localhost:5000/api/recognize', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResults(response.data.objects);
        } catch (error) {
            console.error('Error recognizing image:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <Header />
            <div className="App-content">
                <p>Загрузите фотографию еды, чтобы узнать, что на ней изображено.</p>
                <Dropzone onDrop={onDrop} accept="image/*">
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()} className="dropzone">
                                <input {...getInputProps()} />
                                {image ? (
                                    <img src={image} alt="Uploaded" className="uploaded-image" />
                                ) : (
                                    <p>Перетащите изображение сюда или кликните для выбора файла</p>
                                )}
                            </div>
                        </section>
                    )}
                </Dropzone>
                {loading && <p className="loading">Распознавание...</p>}
                {results.length > 0 && (
                    <div className="results">
                        <h2>Результаты распознавания</h2>
                        <ul>
                            {results.map((result, index) => (
                                <li key={index}>
                                    {result.label} - {Math.round(result.confidence * 100)}%
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default App;