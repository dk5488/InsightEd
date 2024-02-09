const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  console.log(req.body)
  try {
    const adminRes = await mailSender(
      process.env.MAIL_USER,  
      "New Contact Form Submission",
      
      `
        <p>Email: ${email}</p>
        <p>Name: ${firstname} ${lastname}</p>
        <p>Message: ${message}</p>
        <p>Phone Number: ${countrycode} ${phoneNo}</p>
      `
    );
    console.log("Admin Email Response: ", adminRes)

    if(adminRes){
      const emailRes = await mailSender(
        email,
        "Your Data send successfully",
        contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
      )
    }
    else{
      return res(500).json({
        success:false,
        message:"Error in Sending mail to the Admin"
      })
    }
  
    console.log("Email Res ", emailRes)
    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}
