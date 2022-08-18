import React from 'react';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

const override = css`
  display: block;
  margin-inline: 0.5rem;
`;

function Button({ label, className, loading, disabled, children, ...props }) {
  return (
    <button type="button" className={className} {...props} disabled={disabled}>
      {loading && (
        <ClipLoader color="#fff" loading={loading} size={20} css={override} />
      )}
      {children}
      <p className="mx-2"> {label}</p>
    </button>
  );
}

export default Button;
