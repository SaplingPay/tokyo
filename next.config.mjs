import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  cacheOnNavigation: true,
  reloadOnOnline: true,
  disable: false,
});

export default withSerwist({
  env: {
    MAP_TOKEN: process.env.MAP_TOKEN,
    SERVER_URL: process.env.SERVER_URL,
  },
});