import express, { Router } from "express"
import upload from "../middlewares/upload.middlewares.js";
import authenticate from "../middlewares/auth.middlewares.js";
import { deleteFile, downloadInfo, downloadFile, generateQR, generateShareShortenLink, getDownloadCount, getFileDetails, getUserFiles, resolveShareLink, searchFiles, sendLinkEmail, showUserFiles, updateAllFileExpiry, updateFileExpiry, updateFilePassword, updateFileStatus, uploadFiles, verifyFilePassword, uploadFilesGuest, guestDownloadInfo, verifyGuestFilePassword, migrateExistingFiles } from "../controllers/file.controller.js";


const router = Router();

router.post("/upload", authenticate, upload.array('files'), uploadFiles);
router.post("/upload-guest", upload.array('files'), uploadFilesGuest);

router.get("/download/:fileId", downloadFile);
router.delete("/delete/:fileId", authenticate, deleteFile);
router.put("/update/:fileId", authenticate, updateFileStatus);
router.get("/getFileDetails/:fileId", getFileDetails);
router.post('/generateShareShortenLink', authenticate, generateShareShortenLink);
router.post('/sendLinkEmail', authenticate, sendLinkEmail);

router.post('/FileExpiry', authenticate, updateFileExpiry);
router.post('/updateAllFileExpiry', authenticate, updateAllFileExpiry);
router.post('/updateFilePassword', authenticate, updateFilePassword);
router.get('/searchFiles', authenticate, searchFiles);
router.get('/showUserFiles', authenticate, showUserFiles);

router.get('/generateQR/:fileId', authenticate, generateQR);
router.get('/getDownloadCount/:fileId', getDownloadCount);

router.get('/f/:shortCode', downloadInfo);
router.get('/g/:shortCode', guestDownloadInfo);

router.get('/resolveShareLink/:code', resolveShareLink);
router.post('/verifyFilePassword', verifyFilePassword);
router.post('/verifyGuestFilePassword', verifyGuestFilePassword);

router.get('/getUserFiles/:userId', getUserFiles);

router.post('/migrate-files', migrateExistingFiles);

export default router;