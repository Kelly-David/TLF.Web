export class Utilities {

    private static CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' as string;
    private static MONTHS = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    ///
    public static firestoreAutoId(): string {

        let autoId = ''
      
        for (let i = 0; i < 20; i++) {
          autoId += this.CHARS.charAt(
            Math.floor(Math.random() * this.CHARS.length)
          )
        }
        return autoId
      }

      ///
      public static getMonthNumberAsString(monthNumber: number): string {
        
        return monthNumber > 0 ? this.MONTHS[monthNumber - 1] : '';
      }
}