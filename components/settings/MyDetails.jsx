/* eslint-disable global-require */
/* eslint-disable max-classes-per-file */
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Avatar from '@/components/profile/Avatar';
import constants from '@/constants';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@/redux/auth/authSlice';
import UserSettingsInput from './UserSettingsInput';
import EditorToolbar, { modules, formats } from '../EditorToolbar';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

export default function MyDetails({ user }) {
  const urlRegex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  const settingsSchema = new yup.ObjectSchema({
    email: yup.string().email(),
    username: yup
      .string()
      .matches(/^[a-zA-Z0-9_]+$/, 'Only alphabets are allowed for this field ')
      .max(15, 'Username must be at most 15 characters'),
    name: yup.string(),
    website: yup.string().nullable(true),
    about: yup.string(),
    profilePicture: yup.string(),
  });
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.updateProfileError);
  const isUsernameAvailable = useSelector(
    (state) => state.auth.isUsernameAvailable
  );
  const [about, setAbout] = useState();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(settingsSchema),
  });
  const formSubmit = (data) => {
    const req = data;
    if (!data.website || urlRegex.test(data.website)) {
      req._id = user._id;
      req.about = about;
      dispatch(authActions.updateProfileRequest(req));
    } else {
      setError('website', {
        type: 'url',
        message: 'Please enter a valid url',
      });
    }
  };

  useEffect(() => {
    if (Symbol.iterator in Object(error)) {
      error.forEach((err) => {
        setError('username', {
          type: 'manuel',
          message: err.message,
        });
      });
    }
  }, [error, setError]);
  useEffect(() => {
    if (isUsernameAvailable) {
      clearErrors('username');
    }
  }, [isUsernameAvailable]);

  const checkUsername = (e) => {
    if (e.target.value !== user.username) {
      dispatch(authActions.checkUsernameRequest(e.target.value));
    } else {
      clearErrors('username');
    }
  };
  if (typeof window !== 'undefined') {
    const Quill = require('quill');
    const Link = Quill.import('formats/link');
    Link.sanitize = (url) => {
      // quill by default creates relative links if scheme is missing.
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return `https://${url}`;
      }
      return url;
    };
  }

  useEffect(() => {
    setAbout(user?.about);
  }, [user]);
  return (
    <div id="my-details" className="mb-16">
      <div className="flex items-center gap-6 pb-6 mb-6 md:mb-12 border-b border-gray-200">
        <Avatar
          className="hidden md:block w-40 h-40 rounded-full object-cover shadow-lg ring-4 ring-white"
          src={user?.profilePicture}
          alt={user?.name}
        />
        <div>
          <h3 className="text-slate-700 text-3xl font-medium tracking-md">
            Profile
          </h3>
          <p className="text-slate-500 text-base tracking-sm">
            Update your photo and personal details.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="divide-y divide-gray-200">
          {constants.USER_SETTINGS_FIELDS.map((field) => (
            <UserSettingsInput
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              register={register}
              errors={errors}
              icon={field.icon ?? ''}
              prefix={field.prefix ?? ''}
              className={field.className ?? ''}
              id={field.name}
              type={field.type ?? 'text'}
              defaultValue={user?.[field.name]}
              setValue={setValue}
              onBlur={field.name === 'username' ? checkUsername : null}
            />
          ))}

          <div className="settingsInput">
            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700 tracking-sm"
              >
                About me
              </label>
              <span className="text-slate-500 text-sm tracking-sm">
                Write a short introduction.
              </span>
            </div>
            <div>
              <EditorToolbar />
              <ReactQuill
                theme="snow"
                value={about}
                onChange={setAbout}
                placeholder="You can start typing the forum you want to start."
                modules={modules}
                formats={formats}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 py-6 border-t border-gray-200">
          <button
            type="submit"
            className="inline-flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}
