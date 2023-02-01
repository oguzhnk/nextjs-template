export const persistOptions = {
  // Returning a promise from getItem is necessary to avoid issues with hydration
  getItem: (name: string): string | null => localStorage.getItem(name),
  setItem: (name: string, value: string): void => {
    localStorage.setItem(name, value)
  },
  removeItem: (name: string): void => {
    localStorage.removeItem(name)
  }
}
