import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@/redux/auth/authSlice';
import { formatDate } from '@/utils/utils';
import {
  DesktopComputerIcon,
  DeviceMobileIcon,
} from '@heroicons/react/outline';
import Button from '../basic/button';

export default function MySessions() {
  const dispatch = useDispatch();
  const sessions = useSelector((state) => state.auth.sessions);
  const loading = useSelector((state) => state.auth.isLoading);
  const [sessionLoading, setSessionLoading] = useState({});
  useEffect(() => {
    dispatch(authActions.getSessionsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      const loadings = _.mapValues(sessionLoading, () => false);
      setSessionLoading(loadings);
    }
  }, [loading]);

  const logout = () => {

    dispatch(authActions.logoutRequest());
  };

  const deleteSession = (token, isCurrent) => {
    setSessionLoading({
      [token]: true,
    });
    dispatch(authActions.deleteSessionRequest(token));

    if (isCurrent) logout();
  };

  return (
    <div id="my-sessions" className="mb-16">
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-3xl font-medium text-slate-800 tracking-[-0.8px]">
          Where you’re logged in
        </h3>
      </div>
      <div>
        <ul className="divide-y divide-gray-200 border-b border-gray-200">
          {sessions.map((session) => (
            <li
              key={session.token}
              className="flex sm:items-center justify-between gap-4 py-6"
            >
              <div className="flex gap-4">
                <span>
                  {session.userAgent.os.family
                    .toLowerCase()
                    .includes('android') ||
                  session.userAgent.os.family.toLowerCase().includes('ios') ? (
                    <DeviceMobileIcon className="w-6 h-6 text-gray-500" />
                  ) : (
                    <DesktopComputerIcon className="w-6 h-6 text-gray-500" />
                  )}
                </span>
                <div className="flex flex-col">
                  <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-1">
                    <h3 className="text-slate-800 text-sm font-medium tracking-sm">
                      {session.userAgent.family}
                    </h3>
                    {session.isCurrent && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <span className="-ml-0.5 mr-1.5 h-2 w-2 bg-green-400 rounded-full" />
                        Active Now
                      </span>
                    )}
                  </div>
                  <span className="text-slate-500 text-sm tracking-sm">
                    {session.userAgent.os.family} •{' '}
                    {formatDate(session.creationDtm)}
                  </span>
                </div>
              </div>
              <Button
                className="hidden sm:inline-flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                onClick={() => deleteSession(session.token, session.isCurrent)}
                loading={sessionLoading[session.token]}
              >
                Delete Session
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
