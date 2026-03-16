import { storage } from './config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

/**
 * PHASE 4: Storage Utility System
 * High-reliability upload wrapper with progress and structured error handling.
 * 
 * @param {File} file - The file object to upload
 * @param {string} path - Storage path (e.g., 'payment-proofs/uid/timestamp-file.jpg')
 * @param {Function} onProgress - Optional callback for progress percentage (0-100)
 * @returns {Promise<string>} Resolves with the download URL
 */
export const uploadToFirebaseStorage = (file, path, onProgress) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        if (onProgress) onProgress(progress);
      },
      (error) => {
        let message = 'Upload failed';
        switch (error.code) {
          case 'storage/unauthorized':
            message = 'Storage rules denied access (check CORS/Rules)';
            break;
          case 'storage/canceled':
            message = 'Upload canceled by user';
            break;
          case 'storage/quota-exceeded':
            message = 'Storage quota exceeded';
            break;
          default:
            message = error.message;
        }
        reject(new Error(message));
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (err) {
          reject(new Error('Failed to resolve download URL'));
        }
      }
    );
  });
};

// Direct export of storage for advanced use cases
export default storage;
