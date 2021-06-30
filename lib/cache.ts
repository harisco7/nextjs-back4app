import { InMemoryCache } from '@apollo/client/cache';

export const cache = new InMemoryCache({
  typePolicies: {
    // Type policy map
    Viewer: {
      fields: {
        // Field policy map for the Viewer type
        selectedLanguage(): string | null {
          return typeof window !== 'undefined' ? localStorage.getItem('selectedLanguage') : null;
        },
      },
    },
  },
});

export default cache;
