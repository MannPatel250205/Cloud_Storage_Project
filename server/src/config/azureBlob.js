import { BlobServiceClient } from "@azure/storage-blob";

const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING
);

// Get container client
const getContainerClient = (containerName = process.env.AZURE_CONTAINER_NAME) => {
    return blobServiceClient.getContainerClient(containerName);
};

// Generate SAS URL for file access
const generateSasUrl = async (blobName, permissions = 'r', expiresInHours = 1) => {
    try {
        const containerClient = getContainerClient();
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        const expiresOn = new Date();
        expiresOn.setHours(expiresOn.getHours() + expiresInHours);

        const sasUrl = await blockBlobClient.generateSasUrl({
            permissions: permissions,
            expiresOn: expiresOn,
        });

        return sasUrl;
    } catch (error) {
        console.error('Error generating SAS URL:', error);
        throw error;
    }
};

// Generate SAS URL using provided SAS token
const generateSasUrlWithToken = (blobName, sasToken) => {
    try {
        const containerClient = getContainerClient();
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Append SAS token to the blob URL
        const sasUrl = `${blockBlobClient.url}?${sasToken}`;
        return sasUrl;
    } catch (error) {
        console.error('Error generating SAS URL with token:', error);
        throw error;
    }
};

export { blobServiceClient, getContainerClient, generateSasUrl, generateSasUrlWithToken };