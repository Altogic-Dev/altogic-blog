/* eslint-disable react/destructuring-assignment */
import { useEffect } from 'react';
import AuthService from '@/services/auth';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { authActions } from '@/redux/auth/authSlice';
import { ClipLoader } from 'react-spinners';

export default function AuthRedirect(props) {
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
      router.push('/');
    }
  }
  useEffect(() => {
    checkProps();
    if (router.query.status === '401') {
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
  if (router.query.action === 'change-email')
    return (
      <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
        <ClipLoader />
        Verifying Email
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
