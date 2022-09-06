import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const constants = {
  SETTINGS_MENU: [
    {
      id: 0,
      name: 'My Details',
      href: '#my-details',
    },
    {
      id: 1,
      name: 'Password',
      href: '#password',
    },
    {
      id: 2,
      name: 'Change Email',
      href: '#change-email',
    },
    {
      id: 3,
      name: 'My Sessions',
      href: '#my-sessions',
    },
    {
      id: 4,
      name: 'My Plans',
      href: '#my-plans',
    },
  ],
  USER_SETTINGS_FIELDS: [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'Enter your username',
      prefix: 'altogic.com/',
    },
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter your name',
    },
    {
      name: 'website',
      label: 'Website',
      type: 'text',
      placeholder: 'Enter your website',
      prefix: 'https://',
    },
    {
      name: 'email',
      label: ' Contact email',
      placeholder: 'Enter your email',
      icon: faEnvelope,
      className: 'pl-10 text-base',
    },
  ],
};
export default constants;
