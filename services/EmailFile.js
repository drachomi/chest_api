module.exports = {
  resetpassword: function (code) {
    return `<!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
        
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <meta name="x-apple-disable-message-reformatting">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
            <title></title>
            <!--[if mso]>
          <noscript>
            <xml>
              <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          </noscript>
          <![endif]-->
            <style>
              table,
              td,
              div,
              h1,
              p {
                font-family: 'DM Sans', sans-serif;
              }
        
            </style>
          </head>
        
          <body style="margin:0;padding:0;">
            <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
              <tr>
                <td align="center" style="background:#052F3B;color:#ffffff">
                  <table role="presentation" style="width: 602px;border-collapse:collapse;border:0;border-spacing:0;">
                    <tr>
                      <td style="padding:60px 30px 40px 30px;">
                        <img src="https://i.ibb.co/b5F0gXb/cb-logo-white.png" alt="" width="140" style="height:auto;display:block;" />
                        <h1 style="padding: 30px 0 0 0; width: 400px; font-weight: 600; line-height: 1.1">
                          OTP HAS LANDED
                        </h1>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:0;">
                  <table role="presentation" style="width:602px;border-collapse:collapse;border-spacing:0;text-align:left;">
                    <tr>
                      <td style="padding:30px 30px 40px 30px;">
                        <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                          <tr>
                            <td style="padding:0 0 36px 0;color:#153643;">
                              <p style="font-weight:600">Hello,</p>
                              <p style="line-height:24px;">
                              You are receiving this email because you are attempting to use our application and we require an otp validation.<br /><br />
        Here is your otp: ${code} . <br /><br />
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:0;">
                            </td>
                          </tr>
                          <tr>
                          <td style="text-align:center;">
                          <a href='https://youtu.be/zrFBvnzHlQg' target='_blank' >
                          <img src="https://i.ibb.co/09zJzfH/WATCH-VIDEO.png" alt="cribstock"  width="460" height="379"/>
                          </a>
                          </td>
                      </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 0 30px 30px 30px;">
                        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                          <tr>
                            <td style="padding:30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="left">

                            </td>
                            <td style="padding: 30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="right">
                              <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                                <tr>
                                  <td style="padding:0 0 0 10px;width:38px;">
                                    <a href="https://twitter.com/cribstocks" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>
                                  </td>
                                  <td style="padding:0 0 0 10px;width:38px;">
                                    <a href="https://www.facebook.com/cribstocks" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        
        </html>
        `
  },
  welcome: function (name, url) {
    return `<!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
        
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <meta name="x-apple-disable-message-reformatting">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
            <title></title>
            <!--[if mso]>
          <noscript>
            <xml>
              <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          </noscript>
          <![endif]-->
            <style>
              table,
              td,
              div,
              h1,
              p {
                font-family: 'DM Sans', sans-serif;
              }
        
            </style>
          </head>
        
          <body style="margin:0;padding:0;">
            <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
              <tr>
                <td align="center" style="background:#052F3B;color:#ffffff">
                  <table role="presentation" style="width: 602px;border-collapse:collapse;border:0;border-spacing:0;">
                    <tr>
                      <td style="padding:60px 30px 40px 30px;">
                        <img src="https://i.ibb.co/b5F0gXb/cb-logo-white.png" alt="" width="140" style="height:auto;display:block;" />
                        <h1 style="padding: 30px 0 0 0; width: 400px; font-weight: 600; line-height: 1.1">
                          Welcome to Cribstock &#127881;
                        </h1>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:0;">
                  <table role="presentation" style="width:602px;border-collapse:collapse;border-spacing:0;text-align:left;">
                    <tr>
                      <td style="padding:30px 30px 40px 30px;">
                        <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                          <tr>
                            <td style="padding:0 0 36px 0;color:#153643;">
                              <p style="font-weight:600">Hello ${name},</p>
                              <p style="line-height:24px;">
                                Thank you and welcome to Cribstock.
        <br /><br />
        To invest into a property kindly follow these steps:<br /><br />
                              </p>
                              <ol>
                                <li>
                                  Login to your account
                                </li>
                                <li>
                                  Go to the Wallet tab and click the Fund Wallet button to reveal your unique account number.
                                </li>
                                <li>
                                 Fund your wallet by sending Naira into the unique account number via your banking mobile app. (Do not use USSD)
                                </li>
                                          <li>
                               Go to the Invest page and click on any property you like.
                                </li>
                                          <li>
                                Scroll down inside the property until you see the Buy Stock button to click and buy stock (you can select stock quantity before buying)
                                </li>
                                          <li>
                                 Track the growth of the stocks you just bought on the Portfolio dashboard.
                                </li>
                              </ol>
                               <a href="${url}" style="text-decoration: none; width:150px; margin: 40px auto; font-family: 'Raleway', sans-serif; color: hsl(215, 40%, 100%); background: hsl(350, 100%, 40%); border-radius: 5px; padding: 10px 20px;
                            font-size: 12px; letter-spacing: 1px; display: block; box-shadow: 0 0 30px rgba(0, 0, 0, 0.15); text-align:center;">
                           Buy Stock</a>
                           
                           <a href='https://youtu.be/zrFBvnzHlQg' target='_blank' >
                                          <img src="https://i.ibb.co/09zJzfH/WATCH-VIDEO.png" alt="welcome"  width="460" height="379"/></a>
                             
                                <p>
                                  Kindly let me know if you found this helpful.
                                  <br>
                                  If you need further assistance, I'm available here to help.
                                  <br><br>
                                  Sincerely
                                  <br>
                                  Oluwadamilola Shofarasin
                                  <br>
                                  Customer Success- Cribstock
                                </p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:0;">
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 0 30px 30px 30px;">
                        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                          <tr>
                           
                            <td style="padding: 30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="right">
                              <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                                <tr>
                                  <td style="padding:0 0 0 10px;width:38px;">
                                    <a href="https://twitter.com/cribstocks" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>
                                  </td>
                                  <td style="padding:0 0 0 10px;width:38px;">
                                    <a href="https://www.facebook.com/cribstocks" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        
        </html>
        `
  },
  newsletter: function () {
    return `<!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
        
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <meta name="x-apple-disable-message-reformatting">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
            <title></title>
            <!--[if mso]>
          <noscript>
            <xml>
              <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          </noscript>
          <![endif]-->
            <style>
              table,
              td,
              div,
              h1,
              p {
                font-family: 'DM Sans', sans-serif;
              }
        
            </style>
          </head>
        
          <body style="margin:0;padding:0;">
            <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
              <tr>
                <td align="center" style="background:#052F3B;color:#ffffff">
                  <table role="presentation" style="width: 602px;border-collapse:collapse;border:0;border-spacing:0;">
                    <tr>
                      <td style="padding:60px 30px 40px 30px;">
                        <img src="https://i.ibb.co/b5F0gXb/cb-logo-white.png" alt="" width="140" style="height:auto;display:block;" />
                        <h1 style="padding: 30px 0 0 0; width: 400px; font-weight: 600; line-height: 1.1">
                         Subscription Confirmed
                        </h1>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:0;">
                  <table role="presentation" style="width:602px;border-collapse:collapse;border-spacing:0;text-align:left;">
                    <tr>
                      <td style="padding:30px 30px 40px 30px;">
                        <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                          <tr>
                            <td style="padding:0 0 36px 0;color:#153643;">
                              <p style="font-weight:600">Hello,</p>
                              <p style="line-height:24px;">
                              You are receiving this email because you subscribed to our newsletter. You will be hearing from us soon.
                              </p>
                              <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
        
                                
                                  <br><br>
                                  Sincerely
                                  <br>
                                  Oluwadamilola Shofarasin
                                  <br>
                                  Customer Success- Cribstock
                                </p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:0;">
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 0 30px 30px 30px;">
                        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                          <tr>
                            <td style="padding:30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="left">
                             
                            </td>
                            <td style="padding: 30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="right">
                              <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                                <tr>
                                  <td style="padding:0 0 0 10px;width:38px;">
                                    <a href="https://twitter.com/cribstocks" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>
                                  </td>
                                  <td style="padding:0 0 0 10px;width:38px;">
                                    <a href="https://www.facebook.com/cribstocks" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        
        </html>
        `
  },
  sendOtp: function (code) {
    return `<!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
        
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <meta name="x-apple-disable-message-reformatting">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
            <title></title>
            <!--[if mso]>
          <noscript>
            <xml>
              <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          </noscript>
          <![endif]-->
            <style>
              table,
              td,
              div,
              h1,
              p {
                font-family: 'DM Sans', sans-serif;
              }
        
            </style>
          </head>
        
          <body style="margin:0;padding:0;">
            <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
              <tr>
                <td align="center" style="background:#052F3B;color:#ffffff">
                  <table role="presentation" style="width: 602px;border-collapse:collapse;border:0;border-spacing:0;">
                    <tr>
                      <td style="padding:60px 30px 40px 30px;">
                        <img src="https://i.ibb.co/b5F0gXb/cb-logo-white.png" alt="" width="140" style="height:auto;display:block;" />
                        <h1 style="padding: 30px 0 0 0; width: 400px; font-weight: 600; line-height: 1.1">
                          OTP HAS LANDED
                        </h1>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:0;">
                  <table role="presentation" style="width:602px;border-collapse:collapse;border-spacing:0;text-align:left;">
                    <tr>
                      <td style="padding:30px 30px 40px 30px;">
                        <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                          <tr>
                            <td style="padding:0 0 36px 0;color:#153643;">
                              <p style="font-weight:600">Hello,</p>
                              <p style="line-height:24px;">
                              You are receiving this email because you are attempting to use our application and we require an otp validation.<br /><br />
        Here is your otp: ${code} . <br /><br />
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:0;">
                            </td>
                          </tr>
                          <tr>
                          <td style="text-align:center;">
                          <a href='https://youtu.be/qi_nS4ZtvYE' target='_blank' >
                        <img src="https://i.ibb.co/5smQtMn/Trade-Center.png" alt="cribstock"  width="460" height="379"/>
                        </a>
                          </td>
                      </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 0 30px 30px 30px;">
                        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                          <tr>
                            <td style="padding:30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="left">

                            </td>
                            <td style="padding: 30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="right">
                              <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                                <tr>
                                  <td style="padding:0 0 0 10px;width:38px;">
                                    <a href="https://twitter.com/cribstocks" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>
                                  </td>
                                  <td style="padding:0 0 0 10px;width:38px;">
                                    <a href="https://www.facebook.com/cribstocks" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        
        </html>`
  },
  utils: function (message, subject) {

    return `<!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
        
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <meta name="x-apple-disable-message-reformatting">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
            <title></title>
            <!--[if mso]>
          <noscript>
            <xml>
              <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          </noscript>
          <![endif]-->
            <style>
              table,
              td,
              div,
              h1,
              p {
                font-family: 'DM Sans', sans-serif;
              }
        
            </style>
          </head>
        
          <body style="margin:0;padding:0;">
            <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
              <tr>
                <td align="center" style="background:#052F3B;color:#ffffff">
                  <table role="presentation" style="width: 602px;border-collapse:collapse;border:0;border-spacing:0;">
                    <tr>
                      <td style="padding:60px 30px 40px 30px;">
                        <img src="https://i.ibb.co/b5F0gXb/cb-logo-white.png" alt="" width="140" style="height:auto;display:block;" />
                        <h1 style="padding: 30px 0 0 0; width: 400px; font-weight: 600; line-height: 1.1">
                          ${subject}
                        </h1>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:0;">
                  <table role="presentation" style="width:602px;border-collapse:collapse;border-spacing:0;text-align:left;">
                    <tr>
                      <td style="padding:30px 30px 40px 30px;">
                        <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                          <tr>
                            <td style="padding:0 0 36px 0;color:#153643;">
                              <p style="font-weight:600">Hello,</p>
                              <p style="line-height:24px;">
                              ${message} <br /><br />
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:0;">
                            </td>
                          </tr>
                          <tr>
                         <td> <a href='https://youtu.be/iKFDspG9GVQ' target='_blank' >     
                                            <!--a href='https://youtu.be/qi_nS4ZtvYE' target='_blank' -->
                                  <img src="https://i.ibb.co/yYGgWkM/Cribstock-portfolio-1.png" alt="welcome"  width="460" height="379"/></a>
                                        </td>
                      </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 0 30px 30px 30px;">
                        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                          <tr>
                            <td style="padding:30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="left">

                            </td>
                            <td style="padding: 30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="right">
                              <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                                <tr>
                                  <td style="padding:0 0 0 10px;width:38px;">
                                    <a href="https://twitter.com/cribstocks" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>
                                  </td>
                                  <td style="padding:0 0 0 10px;width:38px;">
                                    <a href="https://www.facebook.com/cribstocks" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        
        </html>`
  },
  fundWithCard: function (name, url) {
    return `<!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
        
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <meta name="x-apple-disable-message-reformatting">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
            <title></title>
            <!--[if mso]>
            <noscript>
                <xml>
                    <o:OfficeDocumentSettings>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                </xml>
            </noscript>
            <![endif]-->
            <style>
              table,
              td,
              div,
              h1,
              p {
                font-family: 'DM Sans', sans-serif;
              }
        
            </style>
          </head>
        
          <body style="margin:0;padding:0;">
            <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
              <tr>
                <td align="center" style="background:#052F3B;color:#ffffff">
                  <table role="presentation" style="width: 602px;border-collapse:collapse;border:0;border-spacing:0;">
                    <tr>
                      <td style="padding:60px 30px 40px 30px;">
                        <img src="https://i.ibb.co/b5F0gXb/cb-logo-white.png" alt="" width="140" style="height:auto;display:block;" />
                        <h1 style="padding: 30px 0 0 0; width: 400px; font-weight: 600; line-height: 1.1">
                          Improved feature: Card Funding Options
                        </h1>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:0;">
                  <table role="presentation" style="width:602px;border-collapse:collapse;border-spacing:0;text-align:left;">
                    <tr>
                      <td style="padding:30px 30px 40px 30px;">
                        <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                          <tr>
                            <td style="padding:0 0 36px 0;color:#153643;">
                              <p style="font-weight:600">Hello ${name},</p>
                              <p style="line-height:24px;">
                                To improve the product experience and the ease of funding wallets;
                                We are pleased to announce that you can now fund your Cribstock wallet using your Naira Verve, Visa or Master card.<br /><br />
                                To fund your wallet via a debit/credit card kindly follow these steps:
                              </p>
                              <ol>
                                <li>
                                  Login and go to the Wallet page on your Cribstock account and tap the Fund Wallet button to see the two funding options.
                                </li>
                                <li>
                                  Choose the card funding option and enter a desired amount you wish to fund.
                                </li>
                                <li>
                                  Proceed to enter card details and fund your wallet instantly.
                                </li>
                              </ol>
                              <p>
                                Kindly let me know if you found this helpful.
                                <br>
                                If you need further assistance, I'm available here to help.
                                <br><br>
                                Sincerely
                                <br>
                                Oluwadamilola Shofarasin
                                <br>
                                Customer Success- Cribstock
                              </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0;">
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0 30px 30px 30px;">
                      <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                        <tr>
                         
                          <td style="padding: 30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="right">
                            <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                              <tr>
                                <td style="padding:0 0 0 10px;width:38px;">
                                  <a href="https://twitter.com/cribstocks" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>
                                </td>
                                <td style="padding:0 0 0 10px;width:38px;">
                                  <a href="https://www.facebook.com/cribstocks" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      
      </html>
      `
  },
  newsletter: function () {
    return `<!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
      
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width,initial-scale=1">
          <meta name="x-apple-disable-message-reformatting">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
          <title></title>
          <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
        <![endif]-->
          <style>
            table,
            td,
            div,
            h1,
            p {
              font-family: 'DM Sans', sans-serif;
            }
      
          </style>
        </head>
      
        <body style="margin:0;padding:0;">
          <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
            <tr>
              <td align="center" style="background:#052F3B;color:#ffffff">
                <table role="presentation" style="width: 602px;border-collapse:collapse;border:0;border-spacing:0;">
                  <tr>
                    <td style="padding:60px 30px 40px 30px;">
                      <img src="https://i.ibb.co/b5F0gXb/cb-logo-white.png" alt="" width="140" style="height:auto;display:block;" />
                      <h1 style="padding: 30px 0 0 0; width: 400px; font-weight: 600; line-height: 1.1">
                       Subscription Confirmed
                      </h1>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:0;">
                <table role="presentation" style="width:602px;border-collapse:collapse;border-spacing:0;text-align:left;">
                  <tr>
                    <td style="padding:30px 30px 40px 30px;">
                      <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                        <tr>
                          <td style="padding:0 0 36px 0;color:#153643;">
                            <p style="font-weight:600">Hello,</p>
                            <p style="line-height:24px;">
                            You are receiving this email because you subscribed to our newsletter. You will be hearing from us soon.
                            </p>
                            <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
      
                              
                                <br><br>
                                Sincerely
                                <br>
                                Oluwadamilola Shofarasin
                                <br>
                                Customer Success- Cribstock
                              </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0;">
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0 30px 30px 30px;">
                      <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                        <tr>
                          <td style="padding:30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="left">
                           
                          </td>
                          <td style="padding: 30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="right">
                            <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                              <tr>
                                <td style="padding:0 0 0 10px;width:38px;">
                                  <a href="https://twitter.com/cribstocks" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>
                                </td>
                                <td style="padding:0 0 0 10px;width:38px;">
                                  <a href="https://www.facebook.com/cribstocks" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      
      </html>
      `
  },
  sendOtp: function (code) {
    return `<!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
      
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width,initial-scale=1">
          <meta name="x-apple-disable-message-reformatting">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
          <title></title>
          <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
        <![endif]-->
          <style>
            table,
            td,
            div,
            h1,
            p {
              font-family: 'DM Sans', sans-serif;
            }
      
          </style>
        </head>
      
        <body style="margin:0;padding:0;">
          <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
            <tr>
              <td align="center" style="background:#052F3B;color:#ffffff">
                <table role="presentation" style="width: 602px;border-collapse:collapse;border:0;border-spacing:0;">
                  <tr>
                    <td style="padding:60px 30px 40px 30px;">
                      <img src="https://i.ibb.co/b5F0gXb/cb-logo-white.png" alt="" width="140" style="height:auto;display:block;" />
                      <h1 style="padding: 30px 0 0 0; width: 400px; font-weight: 600; line-height: 1.1">
                        OTP HAS LANDED
                      </h1>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:0;">
                <table role="presentation" style="width:602px;border-collapse:collapse;border-spacing:0;text-align:left;">
                  <tr>
                    <td style="padding:30px 30px 40px 30px;">
                      <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                        <tr>
                          <td style="padding:0 0 36px 0;color:#153643;">
                            <p style="font-weight:600">Hello,</p>
                            <p style="line-height:24px;">
                            You are receiving this email because you are attempting to use our application and we require an otp validation.<br /><br />
      Here is your otp: ${code} . <br /><br />
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0;">
                          </td>
                        </tr>
                        <tr>
                        <td style="text-align:center;">
                        <a href='https://youtu.be/qi_nS4ZtvYE' target='_blank' >
                      <img src="https://i.ibb.co/5smQtMn/Trade-Center.png" alt="cribstock"  width="460" height="379"/>
                      </a>
                        </td>
                    </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0 30px 30px 30px;">
                      <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                        <tr>
                          <td style="padding:30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="left">

                          </td>
                          <td style="padding: 30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="right">
                            <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                              <tr>
                                <td style="padding:0 0 0 10px;width:38px;">
                                  <a href="https://twitter.com/cribstocks" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>
                                </td>
                                <td style="padding:0 0 0 10px;width:38px;">
                                  <a href="https://www.facebook.com/cribstocks" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      
      </html>`
  },
  utils: function (message, subject) {

    return `<!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
      
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width,initial-scale=1">
          <meta name="x-apple-disable-message-reformatting">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
          <title></title>
          <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
        <![endif]-->
          <style>
            table,
            td,
            div,
            h1,
            p {
              font-family: 'DM Sans', sans-serif;
            }
      
          </style>
        </head>
      
        <body style="margin:0;padding:0;">
          <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
            <tr>
              <td align="center" style="background:#052F3B;color:#ffffff">
                <table role="presentation" style="width: 602px;border-collapse:collapse;border:0;border-spacing:0;">
                  <tr>
                    <td style="padding:60px 30px 40px 30px;">
                      <img src="https://i.ibb.co/b5F0gXb/cb-logo-white.png" alt="" width="140" style="height:auto;display:block;" />
                      <h1 style="padding: 30px 0 0 0; width: 400px; font-weight: 600; line-height: 1.1">
                        ${subject}
                      </h1>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:0;">
                <table role="presentation" style="width:602px;border-collapse:collapse;border-spacing:0;text-align:left;">
                  <tr>
                    <td style="padding:30px 30px 40px 30px;">
                      <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                        <tr>
                          <td style="padding:0 0 36px 0;color:#153643;">
                            <!--p style="font-weight:600">Hello,</p-->
                            <p style="line-height:24px;">
                            ${message} <br /><br />
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0;">
                          </td>
                        </tr>
                        <tr>
                       <td> <a href='https://youtu.be/iKFDspG9GVQ' target='_blank' >     
                                          <!--a href='https://youtu.be/qi_nS4ZtvYE' target='_blank' -->
                                <img src="https://i.ibb.co/yYGgWkM/Cribstock-portfolio-1.png" alt="welcome"  width="460" height="379"/></a>
                                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        
        </html>
        `
  },

  onboard_1: function (name) {

    return `<!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
      
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="x-apple-disable-message-reformatting">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
        <title></title>
        <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
        <![endif]-->
        <style>
          table,
          td,
          div,
          h1,
          p {
            font-family: 'DM Sans', sans-serif;
          }
        </style>
      </head>
      
      <body style="margin:0;padding:0;">
        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
          <tr>
            <td align="center" style="background:#052F3B;color:#ffffff">
              <table role="presentation" style="width: 602px;border-collapse:collapse;border:0;border-spacing:0;">
                <tr>
                  <td style="padding:60px 30px 20px 30px;">
                    <img src="https://i.ibb.co/b5F0gXb/cb-logo-white.png" alt="" width="140"
                      style="height:auto;display:block;" />
                    <h1 style="padding: 30px 0 0 0; width: 400px; font-weight: 500; line-height: 1.1">
                      Welcome to Cribstock
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0;">
              <table role="presentation" style="width:602px;border-collapse:collapse;border-spacing:0;text-align:left;">
                <tr>
                  <td style="padding:60px 30px 40px 30px;">
                    <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                      <tr>
                        <td style="color:#153643;">
                          <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;">
                            <span style="font-weight:600">Hello ${name}</span>,
                            <br><br>
                            Welcome to the community.
                            </br></br>
                            As it’s our mission to make real estate accessible to everyone, it’s also
                            our mission to keep you informed with all information you need to make
                            informed financial decisions,and to help you achieve your financial goals.
                            </br></br>
                            Now that you are part of our community, we will send you regular emails with
                            updates about new listed properties and other notifications.
                            </br></br>
                            If you would like more information about any notifications sent, do not
                            hesitate to reach out to us. We are always available and happy to discuss
                            changes to your financial requirements and answer your questions.
                          </p>
                        </td>
                      </tr>
      
                      <tr>
                        <td style="padding:30px 0 0;">
                          <a href="https://www.cribstock.com"
                            style="border: 0; background: #174d42; color: rgb(255, 255, 255); padding: 18px 36px; font-size: 16px; border-radius: 12px; cursor: pointer; text-decoration: none; display: inline-block; font-weight: 500;">
                            Start investing
                            </button>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 30px 30px 30px;">
                    <table role="presentation"
                      style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                      <tr>
                        <td style="padding:30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="left">
                          <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;">
                            &reg; Cribstock 2022<br /><a href="http://www.example.com"
                              style="text-decoration:underline;">Unsubscribe</a>
                          </p>
                        </td>
                        <td style="padding: 30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="right">
                          <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                            <tr>
                              <td style="padding:0 0 0 10px;width:38px;">
                                <a href="http://www.twitter.com/" style="color:#ffffff;"><img
                                    src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38"
                                    style="height:auto;display:block;border:0;" /></a>
                              </td>
                              <td style="padding:0 0 0 10px;width:38px;">
                                <a href="http://www.facebook.com/" style="color:#ffffff;"><img
                                    src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38"
                                    style="height:auto;display:block;border:0;" /></a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      
      </html>`
  },
  onboard_2: function (name) {

    return `<!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="x-apple-disable-message-reformatting">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
      <title></title>
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
      <style>
        table,
        td,
        div,
        h1,
        p {
          font-family: 'DM Sans', sans-serif;
        }
      </style>
    </head>
    
    <body style="margin:0;padding:0;">
      <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
        <tr>
          <td align="center" style="background:#052F3B;color:#ffffff">
            <table role="presentation" style="width: 602px;border-collapse:collapse;border:0;border-spacing:0;">
              <tr>
                <td style="padding:60px 30px 20px 30px;">
                  <img src="https://i.ibb.co/b5F0gXb/cb-logo-white.png" alt="" width="140"
                    style="height:auto;display:block;" />
                  <h1 style="padding: 30px 0 0 0; width: 400px; font-weight: 500; line-height: 1.1">
                    Fund your wallet to get started
                  </h1>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:0;">
            <table role="presentation" style="width:602px;border-collapse:collapse;border-spacing:0;text-align:left;">
              <tr>
                <td style="padding:60px 30px 40px 30px;">
                  <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                    <tr>
                      <td style="color:#153643;">
                        <p style="font-weight:600">
                          Hello ${name}
                        </p>
                        <p>
                          You’ve opened an account, now comes the cool part - funding to buy any
                          property of your choice
                        </p>
                        <p>
                          Funding on the platform has been made easy and accessible for you from instant credit to a bank
                          transfer.
                        </p>
                        <p>
                          You can fund your wallet with the means below:
                        </p>
                        <ol>
                          <li style="margin-bottom: 10px;">
                            Bank transfer: where a dedicated account is automatically opened for you to fund your wallet
                            using the mobile bank app.
                            <br />
                            Note: do not use the ussd code or bank counter.
                          </li>
                          <li style="margin-bottom: 10px;">
                            Through your CREDIT/DEBIT card: our payment partners has made it easy for you to fund your
                            wallet using the debit or credit card by putting in your card details and pin and your wallet
                            gets credited.
                            <br />
                            Note: some banks have card restrictions, please contact your bank to assist in sorting.
                          </li>
                        </ol>
                        <p>
                          How to:
                        </p>
                        <ul>
                          <li>Click on the wallet options</li>
                          <li>Click on fund wallet</li>
                          <li>
                            Click on either the mobile bank transfer option or the credit card option and follow the
                            instructions
                          </li>
                        </ul>
                        <p>
                          Interesting times right ?
                        </p>
                        <p>
                          Start with a little or a lot, we have got you covered.
                        </p>
                        <p>
                          If you would like more information about any notifications sent, do not hesitate to reach out to
                          us. We are always available and happy to discuss changes to your financial requirements and answer
                          your questions.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:30px 0 0;">
                        <a href="https://www.cribstock.com/dashboard/wallet"
                          style="border: 0; background: #174d42; color: rgb(255, 255, 255); padding: 18px 36px; font-size: 16px; border-radius: 12px; cursor: pointer; text-decoration: none; display: inline-block; font-weight: 500;">
                          Fund your wallet
                          </button>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 0 30px 30px 30px;">
                  <table role="presentation"
                    style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                    <tr>
                      <td style="padding:30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="left">
                        <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;">
                          &reg; Cribstock 2022<br /><a href="http://www.example.com"
                            style="text-decoration:underline;">Unsubscribe</a>
                        </p>
                      </td>
                      <td style="padding: 30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="right">
                        <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                          <tr>
                            <td style="padding:0 0 0 10px;width:38px;">
                              <a href="http://www.twitter.com/" style="color:#ffffff;"><img
                                  src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38"
                                  style="height:auto;display:block;border:0;" /></a>
                            </td>
                            <td style="padding:0 0 0 10px;width:38px;">
                              <a href="http://www.facebook.com/" style="color:#ffffff;"><img
                                  src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38"
                                  style="height:auto;display:block;border:0;" /></a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    
    </html>`
  },
  onboard_3: function (name) {

    return `<!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="x-apple-disable-message-reformatting">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
      <title></title>
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
      <style>
        table,
        td,
        div,
        h1,
        p {
          font-family: 'DM Sans', sans-serif;
        }
      </style>
    </head>
    
    <body style="margin:0;padding:0;">
      <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
        <tr>
          <td align="center" style="background:#052F3B;color:#ffffff">
            <table role="presentation" style="width: 602px;border-collapse:collapse;border:0;border-spacing:0;">
              <tr>
                <td style="padding:60px 30px 20px 30px;">
                  <img src="https://i.ibb.co/b5F0gXb/cb-logo-white.png" alt="" width="140"
                    style="height:auto;display:block;" />
                  <h1 style="padding: 30px 0 0 0; width: 400px; font-weight: 500; line-height: 1.1">
                    Don't sleep on these properties 🥱
                  </h1>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:0;">
            <table role="presentation" style="width:602px;border-collapse:collapse;border-spacing:0;text-align:left;">
              <tr>
                <td style="padding:60px 30px 40px 30px;">
                  <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                    <tr>
                      <td style="color:#153643;">
                        <p style="font-weight:600">
                          Hello ${name}
                        </p>
                        <p>
                          We hope signing up on the platform was easy for you, know what would be more fun? Browsing through
                          different interesting properties to make a choice.
                        </p>
                        <p>
                          To select a property of your choice to invest in;
                        </p>
                        <p>
                          Click on “invest” on the page footer
                        </p>
                        <p>
                          Select any properties of your choice and click on it
                        </p>
                        <p>
                          Read through the description page to get details on the property.
                        </p>
                        <p>
                          Click “buy stock” to purchase property
                        </p>
                        <p>
                          Select the quantity you want to purchase and click purchase .
                        </p>
                        <p>
                          Your wallet will be debited and stock will be added to your portfolio.
                        </p>
                        <p>
                          If you would like more information about any notifications sent, do not hesitate to reach out to
                          us. We are always available and happy to discuss changes to your financial requirements and answer
                          your questions.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:30px 0 0;">
                        <a href="https://www.cribstock.com"
                          style="border: 0; background: #174d42; color: rgb(255, 255, 255); padding: 18px 36px; font-size: 16px; border-radius: 12px; cursor: pointer; text-decoration: none; display: inline-block; font-weight: 500;">
                          Buy stock
                          </button>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 0 30px 30px 30px;">
                  <table role="presentation"
                    style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                    <tr>
                      <td style="padding:30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="left">
                        <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;">
                          &reg; Cribstock 2022<br /><a href="http://www.example.com"
                            style="text-decoration:underline;">Unsubscribe</a>
                        </p>
                      </td>
                      <td style="padding: 30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="right">
                        <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                          <tr>
                            <td style="padding:0 0 0 10px;width:38px;">
                              <a href="http://www.twitter.com/" style="color:#ffffff;"><img
                                  src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38"
                                  style="height:auto;display:block;border:0;" /></a>
                            </td>
                            <td style="padding:0 0 0 10px;width:38px;">
                              <a href="http://www.facebook.com/" style="color:#ffffff;"><img
                                  src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38"
                                  style="height:auto;display:block;border:0;" /></a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    
    </html>`
  },
  onboard_4:function(name){
    return `<!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="x-apple-disable-message-reformatting">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
      <title></title>
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
      <style>
        table,
        td,
        div,
        h1,
        p {
          font-family: 'DM Sans', sans-serif;
        }
      </style>
    </head>
    
    <body style="margin:0;padding:0;">
      <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
        <tr>
          <td align="center" style="background:#052F3B;color:#ffffff">
            <table role="presentation" style="width: 602px;border-collapse:collapse;border:0;border-spacing:0;">
              <tr>
                <td style="padding:60px 30px 20px 30px;">
                  <img src="https://i.ibb.co/b5F0gXb/cb-logo-white.png" alt="" width="140"
                    style="height:auto;display:block;" />
                  <h1 style="padding: 30px 0 0 0; width: 400px; font-weight: 500; line-height: 1.1">
                    Do you know about the trade center?
                  </h1>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:0;">
            <table role="presentation" style="width:602px;border-collapse:collapse;border-spacing:0;text-align:left;">
              <tr>
                <td style="padding:60px 30px 40px 30px;">
                  <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                    <tr>
                      <td style="color:#153643;">
                        <p style="font-weight:600">
                          Hello ${name}
                        </p>
                        <p>
                          We have great news for you.
                        </p>
                        <p>
                          You’ve bought stock on the platform and now the experience just got even better.
                        </p>
                        <p>
                          We have the pleasure of introducing the CRIBSTOCK TRADE CENTER to you, the easy way to sell or buy
                          a property that’s already been sold out on the listing page.
                        </p>
                        <p>
                          It’s easy, safe and secure.
                        </p>
                        <p>
                          Ensure you read the terms and conditions before you start your trade journey.
                        </p>
                        <p>
                          How to use:
                        </p>
                        <p>
                          <span style="font-weight: bold;">
                            Creating a buy order:
                          </span>
                          this option allows you to buy a stock that’s sold out on the listing page already.
                        </p>
                        <ul>
                          <li>
                            Click on the trade center
                          </li>
                          <li>
                            Select the property you want to purchase
                          </li>
                          <li>
                            Click on the “buy” button,
                          </li>
                          <li>
                            Select order from any merchant of choice
                          </li>
                          <li>
                            Click on the “ buy now” option
                          </li>
                          <li>
                            Read the buy order summary properly and ensure you have sufficient balance in your wallet before
                            you purchase.
                          </li>
                        </ul>
                        <p>
                          <span style="font-weight: bold;">
                            Creating a sell order:
                          </span>
                          this option allows you to sell a stock you own ( easy liquidation)
                        </p>
                        <ul>
                          <li>Click on your portfolio </li>
                          <li>Select the property you want to sell</li>
                          <li>Click on the “buy/sell” button in your portfolio summary</li>
                          <li>Click on the “sell” option</li>
                          <li>Input the details and information needed </li>
                          <li>Click on the “continue” option to complete the process.</li>
                        </ul>
                        <p>
                          We hope this helps you on your financial journey.If you would like more information about any
                          notifications sent, do not hesitate to reach out to us. We are always available and happy to
                          discuss changes to your financial requirements and answer your questions.
                        </p>
                        <p>
                          Cheers to achieving greatness at a go.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:30px 0 0;">
                        <a href="https://www.cribstock.com"
                          style="border: 0; background: #174d42; color: rgb(255, 255, 255); padding: 18px 36px; font-size: 16px; border-radius: 12px; cursor: pointer; text-decoration: none; display: inline-block; font-weight: 500;">
                          Start trading
                          </button>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 0 30px 30px 30px;">
                  <table role="presentation"
                    style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                    <tr>
                      <td style="padding:30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="left">
                        <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;">
                          &reg; Cribstock 2022<br /><a href="http://www.example.com"
                            style="text-decoration:underline;">Unsubscribe</a>
                        </p>
                      </td>
                      <td style="padding: 30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="right">
                        <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                          <tr>
                            <td style="padding:0 0 0 10px;width:38px;">
                              <a href="http://www.twitter.com/" style="color:#ffffff;"><img
                                  src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38"
                                  style="height:auto;display:block;border:0;" /></a>
                            </td>
                            <td style="padding:0 0 0 10px;width:38px;">
                              <a href="http://www.facebook.com/" style="color:#ffffff;"><img
                                  src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38"
                                  style="height:auto;display:block;border:0;" /></a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    
    </html>`
  },
  onboard_5:function(name){
    return `<!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="x-apple-disable-message-reformatting">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
      <title></title>
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
      <style>
        table,
        td,
        div,
        h1,
        p {
          font-family: 'DM Sans', sans-serif;
        }
      </style>
    </head>
    
    <body style="margin:0;padding:0;">
      <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
        <tr>
          <td align="center" style="background:#052F3B;color:#ffffff">
            <table role="presentation" style="width: 602px;border-collapse:collapse;border:0;border-spacing:0;">
              <tr>
                <td style="padding:60px 30px 20px 30px;">
                  <img src="https://i.ibb.co/b5F0gXb/cb-logo-white.png" alt="" width="140"
                    style="height:auto;display:block;" />
                  <h1 style="padding: 30px 0 0 0; width: 400px; font-weight: 500; line-height: 1.1">
                    Liquidate your funds hasslefree
                  </h1>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:0;">
            <table role="presentation" style="width:602px;border-collapse:collapse;border-spacing:0;text-align:left;">
              <tr>
                <td style="padding:60px 30px 40px 30px;">
                  <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                    <tr>
                      <td style="color:#153643;">
                        <p style="font-weight:600">
                          Hello ${name}
                        </p>
                        <p>
                          As much as we love this journey we have started with you and hate to see you go.
                        </p>
                        <p>
                          To withdraw your earnings kindly follow the process below:
                        </p>
                        <ul>
                          <li>Click on the “wallet” option</li>
                          <li>Click on the “withdrawal” option</li>
                          <li>Click on the account details already pre filled or </li>
                          <li>Fill in the necessary account details on the bank account request page that comes up, if you
                            haven’t filled your account details.</li>
                          <li>Click the “continue” button</li>
                          <li>Input your 4 digit codes and click withdrawals.</li>
                          <li>Wait 24 hours to get credited.</li>
                        </ul>
                        <p>
                          If you would like more information about any notifications sent, do not hesitate to reach out to
                          us. We are always available and happy to discuss changes to your financial requirements and answer
                          your questions.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:30px 0 0;">
                        <a href="https://www.cribstock.com"
                          style="border: 0; background: #174d42; color: rgb(255, 255, 255); padding: 18px 36px; font-size: 16px; border-radius: 12px; cursor: pointer; text-decoration: none; display: inline-block; font-weight: 500;">
                          View wallet
                          </button>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 0 30px 30px 30px;">
                  <table role="presentation"
                    style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                    <tr>
                      <td style="padding:30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="left">
                        <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;">
                          &reg; Cribstock 2022<br /><a href="http://www.example.com"
                            style="text-decoration:underline;">Unsubscribe</a>
                        </p>
                      </td>
                      <td style="padding: 30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="right">
                        <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                          <tr>
                            <td style="padding:0 0 0 10px;width:38px;">
                              <a href="http://www.twitter.com/" style="color:#ffffff;"><img
                                  src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38"
                                  style="height:auto;display:block;border:0;" /></a>
                            </td>
                            <td style="padding:0 0 0 10px;width:38px;">
                              <a href="http://www.facebook.com/" style="color:#ffffff;"><img
                                  src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38"
                                  style="height:auto;display:block;border:0;" /></a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    
    </html>`
  },
  onboard_6:function(name){
    return `<!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="x-apple-disable-message-reformatting">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
      <title></title>
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
      <style>
        table,
        td,
        div,
        h1,
        p {
          font-family: 'DM Sans', sans-serif;
        }
      </style>
    </head>
    
    <body style="margin:0;padding:0;">
      <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
        <tr>
          <td align="center" style="background:#052F3B;color:#ffffff">
            <table role="presentation" style="width: 602px;border-collapse:collapse;border:0;border-spacing:0;">
              <tr>
                <td style="padding:60px 30px 40px 30px;">
                  <img src="https://i.ibb.co/b5F0gXb/cb-logo-white.png" alt="" width="140"
                    style="height:auto;display:block;" />
                  <h1 style="padding: 30px 0 0 0; width: 400px; font-weight: 500; line-height: 1.1">
                    Just a recap
                  </h1>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:0;">
            <table role="presentation" style="width:602px;border-collapse:collapse;border-spacing:0;text-align:left;">
              <tr>
                <td style="padding:60px 30px 40px 30px;">
                  <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                    <tr>
                      <td style="color:#153643;">
                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;">
                          <span style="font-weight:600">Hi ${name}</span>,<br> We hope you enjoy our series of emails this past few days.</br>
                          Real estate investment has historically driven higher returns with lower
                          volatility. Investors have made more money with a lot less risks.
                          Unfortunately, this investments require higher capital and not too many
                          people can do this.
                        </p>
    
                        <p style="margin:0;font-size:16px;line-height:24px;">
                          With Cribstock, you can invest in premium real estate for as low as 10,000.
                          Building a portfolio of high returns and low risk investment.
                          Since our launch we have helped over 10,000 users invest in high performing
                          real estate with high interest.
                        </p>
                      </td>
                    </tr>
    
                    <tr>
                      <td style="padding:30px 0 0;">
                        <h4>
                          How it works:
                        </h4>
                        <table role="presentation"
                          style="width:100%;border-collapse:collapse;border-spacing:0;text-align:left;">
                          <tr>
                            <td width="20px">
                              1.
                            </td>
                            <td width="30px" style="padding: 10px 0;">
                              <img src="https://res.cloudinary.com/cribstock/image/upload/v1664525236/email-templates/log-in-sharp_dmnxq0.svg" alt="">
                            </td>
                            <td style="padding: 5px 20px">
                              <p style="margin: 0">Sign in and fund your wallet</p>
                            </td>
                          </tr>
                          <tr>
                            <td width="20px">
                              2.
                            </td>
                            <td width="30px" style="padding: 10px 0;">
                              <img src="https://res.cloudinary.com/cribstock/image/upload/v1664525237/email-templates/basket-sharp_pxzqqj.svg" alt="">
                            </td>
                            <td style="padding: 5px 20px">
                              <p style="margin: 0">
                                Go to market section and choose a property you would want to
                                start with
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td width="20px">
                              3.
                            </td>
                            <td width="30px" style="padding: 10px 0;">
                              <img src="https://res.cloudinary.com/cribstock/image/upload/v1664525236/email-templates/checkmark-circle-sharp_d27qyg.svg" alt="">
                            </td>
                            <td style="padding: 5px 20px">
                              <p style="margin: 0">
                                Select the amount and submit
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:30px 0 0;">
                        <a href="https://www.cribstock.com"
                          style="border: 0; background: #174d42; color: rgb(255, 255, 255); padding: 18px 36px; font-size: 16px; border-radius: 12px; cursor: pointer; text-decoration: none; display: inline-block; font-weight: 500;">
                          Start investing
                          </button>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:36px 0 0;color:#153643;">
                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;">
                          For more information, respond to this email.
                          
                          Thank you.
                                            </br>Dami.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 0 30px 30px 30px;">
                  <table role="presentation"
                    style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                    <tr>
                      <td style="padding:30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="left">
                        <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;">
                          &reg; Cribstock 2022<br /><a href="http://www.example.com"
                            style="text-decoration:underline;">Unsubscribe</a>
                        </p>
                      </td>
                      <td style="padding: 30px 0 0 0;width:50%;border-top: 1px solid #ccc" align="right">
                        <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                          <tr>
                            <td style="padding:0 0 0 10px;width:38px;">
                              <a href="http://www.twitter.com/" style="color:#ffffff;"><img
                                  src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38"
                                  style="height:auto;display:block;border:0;" /></a>
                            </td>
                            <td style="padding:0 0 0 10px;width:38px;">
                              <a href="http://www.facebook.com/" style="color:#ffffff;"><img
                                  src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38"
                                  style="height:auto;display:block;border:0;" /></a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    
    </html>`
  }
  
}
