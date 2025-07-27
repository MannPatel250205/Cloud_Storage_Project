import { BlobServiceClient } from "@azure/storage-blob";

const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING
);

// Get container client
const getContainerClient = (containerName = process.env.AZURE_CONTAINER_NAME || 'file-share-app') => {
    return blobServiceClient.getContainerClient(containerName);
};

export { blobServiceClient, getContainerClient };