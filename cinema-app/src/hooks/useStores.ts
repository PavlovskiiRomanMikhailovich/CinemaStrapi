import React from 'react';
import { RootStore } from '../stores/RootStore';

const StoresContext = React.createContext<RootStore | null>(null);

export const StoresProvider: React.FC<{ store: RootStore; children: React.ReactNode }> = 
  ({ store, children }) => {
    return React.createElement(StoresContext.Provider, { value: store }, children);
  };

export const useStores = () => {
  const stores = React.useContext(StoresContext);
  if (!stores) {
    throw new Error('useStores must be used within a StoresProvider');
  }
  return stores;
};

export const useFilmsStore = () => useStores().filmsStore;
export const useCategoriesStore = () => useStores().categoriesStore;
export const useAuthStore = () => useStores().authStore;
export const useFavoritesStore = () => useStores().favoritesStore;