export const clearLocalStorageItem = (item: string): void => {
  if (localStorage) localStorage.removeItem(item);
};
