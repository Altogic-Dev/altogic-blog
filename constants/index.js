import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const constants = {
  SETTINGS_MENU: [
    {
      id: 0,
      name: 'My Details',
      href: '#my-details',
      provider: () => true,
    },
    {
      id: 1,
      name: 'Profile Picture',
      href: '#change-profile-picture',
      provider: () => true,
    },
    {
      id: 2,
      name: 'Password',
      href: '#password',
      provider: (provider) => provider === 'altogic',
    },
    {
      id: 3,
      name: 'Change Email',
      href: '#change-email',
      provider: (provider) => provider === 'altogic',
    },
    {
      id: 4,
      name: 'My Sessions',
      href: '#my-sessions',
      provider: () => true,
    },
    {
      id: 5,
      name: 'My Plans',
      href: '#my-plans',
      provider: () => true,
    },
    {
      id: 6,
      name: 'My Subscribtions',
      href: '/settings/subscriptions',
      provider: () => true,
    },
  ],
  USER_SETTINGS_FIELDS: [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'Enter your username',
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
      name: 'contactEmail',
      label: ' Contact email',
      placeholder: 'Enter your email',
      icon: faEnvelope,
      className: 'pl-10 text-base',
    },
  ],
};
export default constants;
