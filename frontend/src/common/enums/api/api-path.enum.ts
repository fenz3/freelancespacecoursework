const ApiPath = {
  API_URL: import.meta.env.VITE_API_PATH || 'http://localhost:3000',

  // Auth routes
  AUTH: '/auth',
  AUTHENTICATED_USER: '/authenticated-user',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',

  // Users routes
  USERS: '/users',

  // Services routes
  SERVICES: '/services',

  // Images routes
  IMAGES: '/images',

  // Categories routes
  CATEGORIES: '/categories',

  // Orders routes
  ORDERS: '/orders',

  // Offers routes
  OFFERS: '/offers',
} as const;

export { ApiPath };
