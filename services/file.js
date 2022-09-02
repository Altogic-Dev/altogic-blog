import { storage } from '@/utils/altogic';

const FileService = {
  uploadFile: async (file, fileName) =>
    storage.bucket('root').upload(fileName, file),
  deleteFile: async (fileName) =>
    storage.bucket('root').file(fileName).delete(),
};
export default FileService;
