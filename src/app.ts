import express, { Request, Response } from 'express';
import PasswordGenerator from './PasswordGenerator';
import PasswordManager from './PasswordManager';
import path from 'path';
import crypto from 'crypto';

const app = express();

const secretKey = crypto.createHash('sha256').update('your-secret-key').digest('base64').substr(0, 32);
const passwordManager = new PasswordManager(secretKey);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/generate', (req: Request, res: Response) => {
  const length = parseInt(req.query.length as string, 10) || 12;
  const password = PasswordGenerator.generate(length);
  res.json({ password });
});

app.post('/store', (req: Request, res: Response) => {
  const { account, password } = req.body;
  passwordManager.store(account, password);
  res.json({ message: 'Password stored successfully.' });
});

app.get('/retrieve/:account', (req: Request, res: Response) => {
  const account = req.params.account;
  try {
    const password = passwordManager.retrieve(account);
    res.json({ password });
  } catch (error:any) {
    res.status(404).json({ error: error.message });
  }
});

const port = 8081;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});