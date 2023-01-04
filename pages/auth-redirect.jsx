/* eslint-disable react/destructuring-assignment */
import { useEffect } from 'react';
import AuthService from '@/services/auth';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@/redux/auth/authSlice';
import { ClipLoader } from 'react-spinners';

export default function AuthRedirect(props) {
  const sessionUser = useSelector((state) => state.auth.user);

  const router = useRouter();
  const dispatch = useDispatch();
  async function checkProps() {
    if (!props?.error) {
      await fetch('/api/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ token: props?.session.token }),
        headers: { 'Content-Type': 'application/json' },
      });
      dispatch(
        authActions.getAuthGrantRequest({
          session: props?.session,
          user: props?.user,
          error: props?.error,
        })
      );
    }
  }
  useEffect(() => {
    checkProps();
    if (router.query.status === '401' || router.query.status === '400') {
      alert(router.query.error);
      router.push('/login');
    } else if (router.query.action === 'reset-pwd') {
      router.push({
        pathname: 'reset-password',
        query: { access_token: router.query.access_token },
      });
    } else if (router.query.action === 'change-email') {
      router.push({
        pathname: 'email-changed',
      });
    }
  }, []);

  useEffect(() => {
    if (sessionUser?.username) {
      router.push('/');
    } else if (sessionUser?._id && !sessionUser?.username)
      dispatch(
        authActions.getAuthGrantRequest({
          session: props?.session,
          user: props?.user,
          error: props?.error,
        })
      );
  }, [sessionUser]);
  if (
    router.query.action === 'change-email' ||
    router.query.action === 'email-confirm'
  )
    return (
      <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
        <ClipLoader color="#9333ea" size={100} />
        <p className="mt-3 text-md text-slate-500">Verifying Email</p>
      </div>
    );
}

export async function getServerSideProps(context) {
  const response = await AuthService.getAuthGrant(context.query.access_token);
  if (response.user) {
    return {
      props: {
        action: context.query.action,
        error: null,
        user: response.user,
        session: response.session,
      },
    };
  }
  return {
    props: {
      action: context.query.action,
      error: response.errors.items[0].message,
    },
  };
}
