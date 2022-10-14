import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Button({
  primaryColor,
  children,
  loading,
  extraClasses,
  type,
  ...props
}) {
  const override = css`
    display: block;
    margin-inline: 0.5rem;
  `;

  const defaultButton =
    'inline-flex items-center justify-center px-[14px] py-2 text-sm font-medium tracking-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500';
  const purpleRounded = `${defaultButton} text-white bg-purple-600 hover:bg-purple-700`;
  const whiteRounded = `$${defaultButton} border border-gray-300 bg-white hover:bg-gray-50`;

  return (
    <button
      disabled={loading}
      className={
        props.className
          ? props.className
          : `${extraClasses} ${primaryColor ? whiteRounded : purpleRounded}`
      }
      type={type === 'button' ? 'button' : 'submit'}
      {...props}
    >
      {loading && (
        <ClipLoader color="#fff" loading={loading} size={20} css={override} />
      )}
      {children}
    </button>
  );
}
