/* eslint-disable react/display-name */
/* eslint-disable react/function-component-definition */
/* eslint-disable global-require */
/* eslint-disable max-classes-per-file */
import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Avatar from '@/components/profile/Avatar';
import constants from '@/constants';
import { useDispatch, useSelector } from 'react-redux';

import { parseHtml } from '@/utils/utils';
import { authActions } from '@/redux/auth/authSlice';
import UserSettingsInput from './UserSettingsInput';
import EditorToolbar, {
  modules,
  formats,
  preventEnter,
} from '../EditorToolbar';
import Button from '../basic/button';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');

    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
);

export default function MyDetails({ user }) {
  const [basePath, setBasePath] = useState();

  const urlRegex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  const settingsSchema = new yup.ObjectSchema({
    email: yup.string().email(),
    username: yup
      .string()
      .matches(
        /^[a-zA-Z0-9_]+$/,
        'Only alphanumeric characters are allowed for this field '
      )
      .max(15, 'Username must be at most 15 characters'),
    name: yup.string(),
    website: yup.string().nullable(true),
    about: yup.string(),
    profilePicture: yup.string(),
  });
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.updateProfileError);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isUsernameAvailable = useSelector(
    (state) => state.auth.isUsernameAvailable
  );
  const [about, setAbout] = useState();
  const [updateProfileLoading, setUpdateProfileLoading] = useState(false);
  const quillRef = useRef();

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
      setUpdateProfileLoading(true);
    } else {
      setError('website', {
        type: 'url',
        message: 'Please enter a valid url',
      });
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setUpdateProfileLoading(false);
    }
  }, [isLoading]);

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

  const handleAbout = (e) => {
    quillRef.current.editor.on('text-change', () => {
      if (quillRef.current.editor.getLength() > 200) {
        quillRef.current.editor.deleteText(
          200,
          quillRef.current.editor.getLength()
        );
      }
    });
    setAbout(e);
  };

  useEffect(() => {
    setBasePath(`${window.location.host}/`);
  }, []);
  useEffect(() => {
    setAbout(user?.about);
  }, [user]);
  return (
    <div id="my-details" className="mb-16">
      <div className="flex items-center gap-6 pb-6 mb-6 md:mb-12 border-b border-gray-200">
        <Avatar
          width={160}
          height={160}
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
              prefix={field.name === 'username' ? basePath : field.prefix ?? ''}
              className={field.className ?? ''}
              id={field.name}
              type={field.type ?? 'text'}
              defaultValue={user?.[field.name]}
              setValue={setValue}
              onBlur={field.name === 'username' ? checkUsername : null}
            />
          ))}

          <div className="settingsInput flex flex-col md:flex-row md:gap-32 md:items-start">
            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700 tracking-sm"
              >
                About me
              </label>
              <span className="text-slate-500 text-sm tracking-sm">
                Write a short introduction. <br />
                (Max 200 characters)
              </span>
            </div>
            <div>
              <EditorToolbar />
              <ReactQuill
                forwardedRef={quillRef}
                className="w-96"
                theme="snow"
                value={about}
                onChange={handleAbout}
                placeholder="You can start typing the forum you want to start."
                modules={{ ...modules, keyboard: preventEnter.keyboard }}
                formats={formats}
              />
              {parseHtml(about)?.length >= 200 && (
                <p className="text-red-500 text-xs py-2 ml-60">
                  Reached Max Characters
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 py-6 border-t border-gray-200">
          <Button
            type="submit"
            className="inline-flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            loading={updateProfileLoading}
          >
            Update Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
