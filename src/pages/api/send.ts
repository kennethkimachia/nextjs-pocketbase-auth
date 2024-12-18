import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailTemplate } from '../../components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const {email, username} = req.body;

  try {
    const { data } = await resend.emails.send({
      from: 'EMBS <donotreply@e-bms.org>',
      to: ['kimachiakenneth@gmail.com'],
      subject: 'Hello world',
      react: EmailTemplate({ username}),
    });
    res.status(200).json(data);
    
  } catch (error) {
    return res.status(400).json(error);
    
  }
  
}
export default sendEmail;
