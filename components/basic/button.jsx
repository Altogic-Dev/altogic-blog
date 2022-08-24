import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Button({ primaryColor, children, loading, ...props }) {
  const override = css`
    display: block;
    margin-inline: 0.5rem;
  `;

  const purpleRounded =
    'inline-flex items-center justify-center px-[14px] py-2 text-sm font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500';
  const whiteRounded =
    'inline-flex items-center justify-center px-[14px] py-2 border border-gray-300 text-sm font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500';
 
    if (primaryColor) {
    return (
      <button
        type="button"
        className={props.className ? props.className : purpleRounded}
        {...props}
      >
        {loading && (
          <ClipLoader color="#fff" loading={loading} size={20} css={override} />
        )}
        {children}
      </button>
    );
  }

  return (
    <button
      {...props}
      type="button"
      className={props.className ? props.className : whiteRounded}
    >
      {loading && (
        <ClipLoader color="#fff" loading={loading} size={20} css={override} />
      )}
      {children}
    </button>
  );
}
