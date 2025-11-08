export const UtilsHelper = {

  isSortedHighToLow(data: number[]): boolean {
    for (let i = 1; i < data.length; i++) {
      if (data[i] > data[i - 1]) {
        return false;
      }
    }
    return true;
  }
  
}