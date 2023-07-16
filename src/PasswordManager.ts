import crypto from 'crypto';

interface Passwords {
  [account: string]: string;
}

class PasswordManager {
  private passwords: Passwords;
  private secretKey: string;
  private iv: Buffer;

  constructor(secretKey: string) {
    this.passwords = {};
    this.secretKey = secretKey;
    this.iv = crypto.randomBytes(16); // Generate a random initialization vector
  }

  public store(account: string, password: string): void {
    const cipher = crypto.createCipheriv('aes-256-cbc', this.secretKey, this.iv);
    let encryptedPassword = cipher.update(password, 'utf8', 'hex');
    encryptedPassword += cipher.final('hex');

    this.passwords[account] = encryptedPassword;
  }

  public retrieve(account: string): string {
    if (account in this.passwords) {
      const encryptedPassword = this.passwords[account];
      const decipher = crypto.createDecipheriv('aes-256-cbc', this.secretKey, this.iv);
      let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf8');
      decryptedPassword += decipher.final('utf8');

      return decryptedPassword;
    } else {
      throw new Error('Account not found.');
    }
  }
}

export default PasswordManager;