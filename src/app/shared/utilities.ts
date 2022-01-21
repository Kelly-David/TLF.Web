export class Utilities {

    private static CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' as string;

    public static firestoreAutoId(): string {

        let autoId = ''
      
        for (let i = 0; i < 20; i++) {
          autoId += this.CHARS.charAt(
            Math.floor(Math.random() * this.CHARS.length)
          )
        }
        return autoId
      }
}