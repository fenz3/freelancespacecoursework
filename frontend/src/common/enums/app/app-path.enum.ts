const AppPath = {
  ROOT: '/',
  SERVICES: '/services',
  SERVICE: '/service/:id',
  MY_SERVICES: '/my-services',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  PROFILE: '/profile',
  NOT_FOUND: '/not-found',
  ANY: '*',
} as const;

export { AppPath };
