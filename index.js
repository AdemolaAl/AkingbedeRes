const express = require('express');
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/public', express.static(process.cwd() + '/public'));
app.use('/pictures', express.static(process.cwd() + '/pictures'));


app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/contact', (req,res)=>{
    res.sendFile(__dirname + '/views/contact.html');
})
app.get('/product', (req,res)=>{
    res.sendFile(__dirname + '/views/productpage.html');
})
app.get('/res', (req,res)=>{
    res.sendFile(__dirname + '/views/resturnt.html');
})
app.get('/about', (req,res)=>{
    res.sendFile(__dirname + '/views/about.html');
})
app.get('/gallery', (req,res)=>{
    res.sendFile(__dirname + '/views/gallery.html');
})
app.get('/catering', (req,res)=>{
    res.sendFile(__dirname + '/views/catering.html');
})
app.get('/catalogue', (req,res)=>{
    res.sendFile(__dirname + '/views/catalogue.html');
})

  const transporter = nodemailer.createTransport({
    host: "mail.akhigbefoods.com",
    port: 587,
    secure: false, // STARTTLS
    auth: {
      user: "info@akhigbefoods.com",
      pass: "0.rvamDhp76Z"
    },
    tls: {
      rejectUnauthorized: false
    }
  });




/*

async function sendMail() {
  // 1. Create transporter
    const transporter = nodemailer.createTransport({
        host: "mail.akhigbefoods.com", // try with mail. prefix
        port: 587,
        secure: false, // must be false for 587
        auth: {
            user: "info@akhigbefoods.com",
            pass: "0.rvamDhp76Z"
        },
        tls: {
            rejectUnauthorized: false // in case SSL is self-signed
        }
    });


  // 2. Email options
  let mailOptions = {
    from: '"Your Name" <info@akhigbefoods.com>', // sender address
    to: "ademolaalameen86@gmail.com",                 // list of receivers
    subject: "Hello from Node.js",              // Subject line
    text: "This is a plain text message",       // plain text body
    html: "<b>This is a HTML message</b>"       // html body
  };

  // 3. Send mail
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

sendMail();

*/


app.post('/contact', async (req, res) => {
  const { Firstname, Lastname, email, message } = req.body;

  console.log(Firstname, Lastname, email, message);


  // 2. Define email options
  const mailOptions = {
    from: '"Akhigbefoods" <info@akhigbefoods.com>',
    to: "ademolaalameen86@gmail.com",
    subject: `Your request has been received`,
    html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Request Received</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f8f8f8;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 30px auto;
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      }
      .header {
        background: linear-gradient(90deg, #101014ff, #09041dff);
        padding: 20px;
        text-align: center;
        color: #fff;
      }
      .header img {
        max-width: 50px;
        margin-bottom: 10px;
      }
      .content {
        padding: 30px;
        color: #333;
        line-height: 1.6;
      }
      .content h2 {
        color: #2ECC71;
        margin-bottom: 15px;
      }
      .footer {
        background: #f4f4f4;
        padding: 15px;
        text-align: center;
        font-size: 14px;
        color: #555;
      }
      .footer a {
        color: #2ECC71;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://akhigbefoods.com/pictures/logo-akhigbe.png" alt="Akhigbe Foods Logo" />
        <h1>Akhigbe Foods</h1>
      </div>
      <div class="content">
        <h2>We’ve received your request!</h2>
        <p>Dear <strong>${Firstname  || "Customer"}</strong>,</p>
        <p>Thank you for reaching out to us. Your request has been successfully received and our team will get back to you shortly.</p>
        <p>If you need urgent assistance, please don’t hesitate to contact us directly at:</p>
        <p><strong>Email:</strong> <a href="mailto:info@akhigbefoods.com">info@akhigbefoods.com</a></p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Akhigbe Foods. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `,
    replyTo: email
  };

  // 3. Send mail
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send message." });
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});