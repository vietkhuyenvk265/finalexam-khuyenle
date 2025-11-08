export const UtilsHelper = {

    getCurrentDate(): string {
      const today = new Date();
      return today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },

}