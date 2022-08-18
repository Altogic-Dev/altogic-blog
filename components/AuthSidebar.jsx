import React from 'react';

export default function AuthSidebar() {
  return (
    <div className="hidden xl:block relative">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="./login.png"
        alt=""
      />
    </div>
  );
}
