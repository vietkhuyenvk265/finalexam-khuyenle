export const UtilsHelper = {

  isSortedHighToLow(data: number[]): boolean {
    for (let i = 1; i < data.length; i++) {
      if (data[i] > data[i - 1]) {
        return false;
      }
    }
    return true;
  },

  getRandomElement<T>(arr: T[]): T | undefined {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }
  
}