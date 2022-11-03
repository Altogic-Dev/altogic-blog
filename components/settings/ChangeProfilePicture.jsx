import React, { useState, useEffect } from 'react';
import Avatar from '@/components/profile/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { fileActions } from '@/redux/file/fileSlice';
import { authActions } from '@/redux/auth/authSlice';
import { ClipLoader } from 'react-spinners';
import Button from '../basic/button';

export default function ChangeProfilePicture({ user }) {
  const userAvatarLink = useSelector((state) => state.file.fileLink);
  const loading = useSelector((state) => state.file.isLoading);
  const dispatch = useDispatch();
  const profileUser = useSelector((state) => state.auth.profileUser);
  const sessionUser = useSelector((state) => state.auth.user);

  const [didMount, setDidMount] = useState(false);

  const uploadPhotoHandler = (e) => {
    e.stopPropagation();
    const fileInput = document.createElement('input');

    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/*');
    fileInput.click();

    fileInput.onchange = async () => {
      const file = fileInput.files[0];
      dispatch(
        fileActions.uploadFileRequest({
          file,
          name: user?.username,
          existingFile: user?.profilePicture,
        })
      );
    };
  };

  const deletePhotoHandler = () => {
    dispatch(fileActions.setDefaultAvatarFileRequest());
  };

  useEffect(() => {
    if (didMount) {
      dispatch(
        authActions.updateProfileRequest({
          _id: user._id,
          profilePicture: userAvatarLink,
        })
      );
    } else if (userAvatarLink) {
      setDidMount(true);
    }
    if (profileUser?._id === sessionUser._id) {
      dispatch(authActions.getUserByUserNameRequest(sessionUser.username));
    }
  }, [userAvatarLink]);

  useEffect(() => {
    dispatch(fileActions.setFileLinkByProfilePictureRequest());
  }, []);

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
            <div className="settingsInput md:grid-cols-2 grid-cols-1">
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
              <div className="flex md:items-end items-start justify-between flex-col">
                {loading ? (
                  <div className="flex items-center justify-center">
                    <ClipLoader color="#9333ea" size={30} />
                  </div>
                ) : (
                  <Avatar
                    src={userAvatarLink}
                    alt={user?.name}
                    placeholderName={user?.name}
                    className="w-16 h-16 object-cover mr-4"
                  />
                )}
                <div className="flex items-center gap-4 mt-2">
                  <Button
                    onClick={uploadPhotoHandler}
                    className="text-purple-700 text-sm tracking-sm"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={deletePhotoHandler}
                    className="text-purple-700 text-sm tracking-sm"
                  >
                    Delete
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
