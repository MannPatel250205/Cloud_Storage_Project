import { createSlice } from "@reduxjs/toolkit";
import {
    uploadFile,
    getFileDetails,
    deleteFile,
    updateFileStatus,
    generateShareShortenLink,
    sendLinkEmail,
    updateFileExpiry,
    updateFilePassword,
    searchFiles,
    showUserFiles,
    generateQR,
    getDownloadCount,
    resolveShareLink,
    verifyFilePassword,
    getUserFiles,
} from "./fileThunk";

const fileSlice = createSlice({
    name: "file",
    initialState: {
        files: [],
        userFiles: [],
        uploadFiles: [],
        selectedFile: null,
        qrCodeUrl: null,
        downloadCounts: {},
        resolvedFile: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearQR: (state) => {
            state.qrCodeUrl = null;
        },
        clearSelectedFile: (state) => {
            state.selectedFile = null;
        },
        resetLoading: (state) => {
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadFile.pending, (state) => {
                console.log("Upload pending - setting loading to true");
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                console.log("Upload fulfilled - setting loading to false");
                state.loading = false;
                state.files.push(...action.payload.fileIds);
            })
            .addCase(uploadFile.rejected, (state, action) => {
                console.log("Upload rejected - setting loading to false");
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getFileDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getFileDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedFile = action.payload;
            })
            .addCase(getFileDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteFile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(deleteFile.fulfilled, (state, action) => {
                state.loading = false;
                state.files = state.files.filter((f) => f._id !== action.payload);
            })
            .addCase(deleteFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateFileStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(updateFileStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.files = state.files.map((f) =>
                    f._id === action.payload._id ? action.payload : f
                );
            })
            .addCase(updateFileStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(generateShareShortenLink.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(generateShareShortenLink.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedFile = action.payload;
            })
            .addCase(generateShareShortenLink.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(sendLinkEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendLinkEmail.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(sendLinkEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateFileExpiry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateFileExpiry.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedFile = action.payload;
            })
            .addCase(updateFileExpiry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateFilePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(updateFilePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedFile = action.payload;
            })
            .addCase(updateFilePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(searchFiles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchFiles.fulfilled, (state, action) => {
                state.loading = false;
                state.files = action.payload;
            })
            .addCase(searchFiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(showUserFiles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(showUserFiles.fulfilled, (state, action) => {
                state.loading = false;
                state.files = action.payload;
            })
            .addCase(showUserFiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(generateQR.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(generateQR.fulfilled, (state, action) => {
                state.loading = false;
                state.qrCodeUrl = action.payload;
            })
            .addCase(generateQR.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getDownloadCount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDownloadCount.fulfilled, (state, action) => {
                state.loading = false;
                const { fileId, count } = action.payload;
                state.downloadCounts[fileId] = count;
            })
            .addCase(getDownloadCount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(resolveShareLink.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resolveShareLink.fulfilled, (state, action) => {
                state.loading = false;
                state.resolvedFile = action.payload;
            })
            .addCase(resolveShareLink.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(verifyFilePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyFilePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.resolvedFile = action.payload;
            })
            .addCase(verifyFilePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // get files
            .addCase(getUserFiles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserFiles.fulfilled, (state, action) => {
                state.loading = false;
                state.files = action.payload;
            })
            .addCase(getUserFiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


    },
});

export const { clearQR, clearSelectedFile, resetLoading } = fileSlice.actions;
export default fileSlice.reducer;
