class PasswordGenerator {
    private static characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?<>./-=';
  
    public static generate(length: number = 12): string {
      let password = '';
      for (let i = 0; i < length; i++) {
        password += this.characters.charAt(Math.floor(Math.random() * this.characters.length));
      }
      return password;
    }
  }
  
  export default PasswordGenerator;