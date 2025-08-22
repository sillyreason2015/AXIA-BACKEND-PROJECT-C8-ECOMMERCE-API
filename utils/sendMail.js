// Import Nodemailer for sending emails
import nodemailer from 'nodemailer'; 

// sendMail function takes an object with from, to, subject, and body
export const sendMail = async ({ mailFrom, mailTo, subject, body }) => {
    try {
        // Create a transporter object using SMTP settings from environment variables
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true, 
            auth: {
                user: process.env.EMAIL_USER, // sender email
                pass: process.env.EMAIL_PASS, // sender email password
            },
        });

        // Send the email
        const info = await transporter.sendMail({
            from: mailFrom,
            to: mailTo,
            subject,
            html: body, 
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
