import React, { useState, useEffect } from 'react';

const FilePreview = ({ file }) => { 
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timeout);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <h1 className="text-3xl font-bold text-gray-700 animate-pulse">Loading...</h1>
            </div>
        );
    }

    if (!file) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <h1 className="text-3xl font-bold text-gray-700">No file selected</h1>
            </div>
        );
    }

    const renderPreview = () => {
        if (file.type.startsWith("image/")) {
            return (
                <>
                    <img 
                        src={file.path} 
                        alt={file.name} 
                        className="w-full h-auto rounded mb-4 max-h-[70vh] object-contain"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            const fallback = e.target.nextElementSibling;
                            if (fallback) {
                                fallback.style.display = 'block';
                            }
                        }}
                    />
                    <div style={{ display: 'none' }} className="text-center p-8">
                        <div className="text-6xl mb-4">🖼️</div>
                        <h3 className="text-xl font-semibold mb-2">Image Preview Unavailable</h3>
                        <p className="text-gray-600 mb-4">Unable to load image preview</p>
                    </div>
                </>
            );
        }
        
        if (file.type.startsWith("video/")) {
            return (
                <>
                    <video 
                        controls 
                        className="w-full h-auto rounded mb-4 max-h-[70vh]"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            const fallback = e.target.nextElementSibling;
                            if (fallback) {
                                fallback.style.display = 'block';
                            }
                        }}
                    >
                        <source src={file.path} type={file.type} />
                        Your browser does not support the video tag.
                    </video>
                    <div style={{ display: 'none' }} className="text-center p-8">
                        <div className="text-6xl mb-4">🎬</div>
                        <h3 className="text-xl font-semibold mb-2">Video Preview Unavailable</h3>
                        <p className="text-gray-600 mb-4">Unable to load video preview</p>
                    </div>
                </>
            );
        }
        
        if (file.type.startsWith("audio/")) {
            return (
                <>
                    <audio 
                        controls 
                        className="w-full h-auto rounded mb-4"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            const fallback = e.target.nextElementSibling;
                            if (fallback) {
                                fallback.style.display = 'block';
                            }
                        }}
                    >
                        <source src={file.path} type={file.type} />
                        Your browser does not support the audio element.
                    </audio>
                    <div style={{ display: 'none' }} className="text-center p-8">
                        <div className="text-6xl mb-4">🎵</div>
                        <h3 className="text-xl font-semibold mb-2">Audio Preview Unavailable</h3>
                        <p className="text-gray-600 mb-4">Unable to load audio preview</p>
                    </div>
                </>
            );
        }
        
        if (file.type === "application/pdf") {
            return (
                <>
                    <iframe 
                        src={file.path} 
                        title="PDF Preview" 
                        className="w-full h-[70vh] rounded mb-4 border"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            const fallback = e.target.nextElementSibling;
                            if (fallback) {
                                fallback.style.display = 'block';
                            }
                        }}
                    />
                    <div style={{ display: 'none' }} className="text-center p-8">
                        <div className="text-6xl mb-4">📄</div>
                        <h3 className="text-xl font-semibold mb-2">PDF Preview Unavailable</h3>
                        <p className="text-gray-600 mb-4">Unable to load PDF preview</p>
                    </div>
                </>
            );
        }
        
        // For other file types, show a download link
        return (
            <div className="text-center p-8">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-xl font-semibold mb-2">{file.name}</h3>
                <p className="text-gray-600 mb-4">This file type cannot be previewed</p>
                <a 
                    href={file.path} 
                    download={file.name}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Download File
                </a>
            </div>
        );
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-4xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{file.name}</h3>
                <div className="text-sm text-gray-500">
                    {file.type} • {(file.size / 1024 / 1024).toFixed(2)} MB
                </div>
            </div>
            
            {renderPreview()}
            
            <div className="mt-4 text-right">
                <a 
                    href={file.path} 
                    download={file.name}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition mr-2"
                >
                    Download
                </a>
                <button
                    onClick={() => window.close()}
                    className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default FilePreview;