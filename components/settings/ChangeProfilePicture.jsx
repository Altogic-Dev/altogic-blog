import React, { useState, useEffect } from 'react';
import Avatar from '@/components/profile/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { fileActions } from '@/redux/file/fileSlice';
import { authActions } from '@/redux/auth/authSlice';
import { ClipLoader } from 'react-spinners';
import Button from '../basic/button';

export default function ChangeProfilePicture() {
  const [file, setFile] = useState();

  const user = useSelector((state) => state.auth.user);
  const userAvatarLink = useSelector((state) => state.file.fileLink);
  const loading = useSelector((state) => state.file.isLoading);
  const authLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();
  const uploadPhotoHandler = (e) => {
    e.stopPropagation();
    const fileInput = document.createElement('input');

    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/*');
    fileInput.click();

    fileInput.onchange = async () => {
      const file = fileInput.files[0];
      setFile(file);
      dispatch(
        fileActions.uploadFileRequest({
          file,
          name: user?.username,
          existingFile: user?.profilePicture,
        })
      );
    };
  };
  useEffect(() => {
    if (userAvatarLink) {
      dispatch(
        authActions.updateProfileRequest({
          _id: user._id,
          profilePicture: userAvatarLink,
        })
      );
    }
  }, [userAvatarLink]);
  return (
    <div id="change-profile-picture" className="mb-16">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-3xl font-medium text-slate-800 tracking-[-0.8px]">
              Profile Picture
            </h3>
            <p className="mt-1 text-sm text-slate-500 tracking-[-0.4px]">
              Please upload your profile picture.
            </p>
          </div>
          <div className="mt-4 divide-y divide-gray-200 border-b border-gray-200">
            <div className="settingsInput ">
              <div className="mb-5 md:mb-0">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700 tracking-sm"
                >
                  Your photo
                </label>
                <span className="text-slate-500 text-sm tracking-sm">
                  This will be displayed on your profile.
                </span>
              </div>
              <div className="flex items-start justify-between">
                {authLoading || loading ? (
                  <div className="flex items-center justify-center">
                    <ClipLoader color="#9333ea" size={30} />
                  </div>
                ) : (
                  <Avatar
                    src={
                      file ? URL.createObjectURL(file) : user?.profilePicture
                    }
                    alt={user?.name}
                    className="w-16 h-16 object-cover"
                  />
                )}
                <div className="flex items-center gap-4">
                  <Button
                    onClick={uploadPhotoHandler}
                    className="text-purple-700 text-sm tracking-sm"
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
