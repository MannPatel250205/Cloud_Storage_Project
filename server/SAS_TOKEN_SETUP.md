# Azure SAS Token Setup Guide

## Overview
This application now uses Azure Shared Access Signature (SAS) tokens for secure file access and preview. SAS tokens provide time-limited access to Azure Blob Storage resources without requiring the storage account key.

## Required Environment Variables

Add the following to your `.env` file:

```env
# Azure Storage Configuration
AZURE_STORAGE_CONNECTION_STRING=your_azure_storage_connection_string_here
AZURE_CONTAINER_NAME=file-share-app
AZURE_SAS_TOKEN=your_azure_sas_token_here
```

## How to Generate a SAS Token

### Option 1: Azure Portal
1. Go to your Azure Storage Account in the Azure Portal
2. Navigate to "Shared access signature" under "Security + networking"
3. Configure the following settings:
   - **Allowed services**: Blob
   - **Allowed resource types**: Container, Object
   - **Allowed permissions**: Read, Write, Delete, List
   - **Start time**: Current time
   - **Expiry time**: Set to a future date (e.g., 1 year from now)
   - **Allowed protocols**: HTTPS only
4. Click "Generate SAS and connection string"
5. Copy the "SAS token" (the part after the `?` in the SAS URL)

### Option 2: Azure CLI
```bash
az storage container generate-sas \
  --account-name YOUR_STORAGE_ACCOUNT_NAME \
  --name file-share-app \
  --permissions rwdl \
  --expiry 2025-12-31T23:59:59Z \
  --https-only
```

### Option 3: Azure Storage Explorer
1. Open Azure Storage Explorer
2. Right-click on your container
3. Select "Get Shared Access Signature"
4. Configure permissions and expiry
5. Copy the generated token

## Migration

After setting up the SAS token, run the migration to update existing files:

```bash
POST /api/files/migrate-files
```

This will update all existing files to use SAS URLs for secure access.

## Security Notes

- Keep your SAS token secure and don't commit it to version control
- Regularly rotate your SAS tokens
- Use the minimum required permissions for your use case
- Consider using Azure Key Vault to store sensitive tokens

## File Access

With SAS tokens configured:
- File uploads will automatically generate SAS URLs
- File previews will work securely
- File downloads will use SAS URLs
- QR codes will contain secure SAS URLs
- Sharing links will use secure SAS URLs 