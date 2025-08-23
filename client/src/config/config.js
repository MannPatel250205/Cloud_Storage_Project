// Environment configuration
const config = {
    development: {
        API_BASE_URL: 'http://localhost:6600/api/',
        CLIENT_URL: 'http://localhost:5173'
    },
    production: {
        API_BASE_URL: 'https://cloud-storage-project-backend.onrender.com/api/',
        CLIENT_URL: 'https://cloud-storage-project-frontend.onrender.com/'
    }
};

const environment = import.meta.env.MODE || 'production';
const currentConfig = config[environment] || config.production;

export const API_BASE_URL = currentConfig.API_BASE_URL;
export const CLIENT_URL = currentConfig.CLIENT_URL;

export default currentConfig;
