export default () => ({
  expo: {
    name: 'MovieMatch',
    slug: 'MovieMatch',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/LogoSquare.png',
    splash: {
      image: './assets/LogoSquare.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/LogoSquare.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.rivalgarry.MovieMatch',
    },
    androidStatusBar: {
      backgroundColor: '#000',
      translucent: false,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: '84dffa94-f614-4d2a-be31-8e5fa50ec267',
        IMDB_API_KEY: process.env.IMDB_API_KEY || null,
      },
    },
  },
})
