const eventMemberModel = require("./event-member.model");
const userModel = require("../User/user.model");
const eventModel = require("../Event/event.model");
const eventLocationModel = require("../EventLocation/event-location.model");
const eventImageModel = require("../EventImage/event-image.model");

const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");

// GET route to send the users invitation for the event
exports.sendEventInvitation = async (req, res) => {
  const userId = req.params.user;
  const eventId = req.params.event;

  try {
    // Check if the user and event exist
    const user = await userModel.findById(userId);
    const event = await eventModel.findById(eventId);
    const eventMember = await eventMemberModel.findOne({
      event: eventId,
      user: userId,
    });
    const eventLocation = await eventLocationModel.findOne({ event: eventId });
    const eventImages = await eventImageModel.find({ event: eventId });

    if (!user || !event) {
      return res.status(404).json({ error: "User or event not found" });
    }

    await eventMemberModel.findByIdAndUpdate(eventMember._id, {
      $set: { isApproved: true },
    });

    // Generate QR code
    const qrCodeData = `User: ${user.userName}\nEvent: ${event.eventName}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);
    const qrCodeBase64 = qrCodeImage.replace(
      /^data:image\/(png|jpg|jpeg);base64,/,
      ""
    );

    // Create a new PDF document
    const pdf = new PDFDocument();

    // Write content to the PDF document
    pdf.fontSize(20).text("Event Invitation");
    pdf.moveDown();

    pdf.image(qrCodeImage, { width: 200 });
    pdf.moveDown();

    pdf.fontSize(16).text("Event Details:");
    pdf.text(`Event Name: ${event.eventName}`);
    pdf.text(`Event Date: ${event.eventStartDate} - ${event.eventEndDate}`);
    pdf.text(`Event Description: ${event.eventDescription}`);
    pdf.moveDown();

    pdf.fontSize(16).text("User Details:");
    pdf.text(`User Name: ${user.userName}`);
    pdf.text(`User Email: ${user.email}`);
    // Add more user details as needed

    // Create a buffer from the PDF document
    const pdfBuffer = await new Promise((resolve, reject) => {
      const chunks = [];
      pdf.on("data", (chunk) => chunks.push(chunk));
      pdf.on("end", () => resolve(Buffer.concat(chunks)));
      pdf.end();
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "betta.auction.co@gmail.com",
        pass: "qqnsisdextwqrshf",
      },
    });

    // Compose the confirmation email message
    const invitationMailOptions = {
      from: "betta.auction.co@gmail.com",
      to: "rihenhoulii@gmail.com",
      subject: `${event.eventName} : You've been invited!`,
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Event Invitation </title>
        <style>
          /* CSS styles for the email template */
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f2f2f2;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
            font-size: 24px;
            margin-bottom: 20px;
          }
          p {
            color: #555;
            font-size: 16px;
            margin-bottom: 10px;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #007bff;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 30px;
            font-size: 18px;
            transition: background-color 0.3s ease;
          }
          .button:hover {
            background-color: #0056b3;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
          }
          .footer p {
            color: #888;
            font-size: 14px;
          }
          .footer a {
            color: #007bff;
            text-decoration: none;
            font-weight: bold;
          }
          .event_location_image{
            width: 10vw;
            height: 10vw;
          }
          .invitation_qrc{
            width: 20vw;
            height: 20vw;
          }
          .event_main_image{
            width: 20vw;
            height: 20vw;
          }
        </style>
      </head>
      <body>
        <div class="container">
           <h1>Event Invitation</h1>
           <p>Dear ${user.userName.toUpperCase()},</p>
           <p>You are invited to an exclusive event:</p>
           <h2>${event.eventName.toUpperCase()}</h2>
           <p>Date: From : ${event.eventStartDate} </p>
           <p>      To   : ${event.eventEndDate} </p>
           <p> ${event.eventDescription} </p>
           <p> Address : ${eventLocation.eventAddress} </p>
           <p>Join us for a memorable experience!</p>
           <p>Please confirm your presence by clicking the button below:</p>
           <a href="http://localhost:3080/event-member/confirm-presence/${userId}/${eventId}" class="button" >Confirm Presence</a>
           <p>Please find the invitation attached.</p>
        <div class="footer">
           <p>If you have any questions or need further information, please feel free to <a href="[Contact Link]">contact us</a>.</p>
           <p>We look forward to seeing you at the event!</p>
           <p>Best regards,</p>
          <p>The Event Team</p>
          <p>Betta Co. </p>
        </div>
      </body>
      </html>
      `,
      //           <img src="cid:{$qrCodeImage}" alt="QR Code" class="invitation_qrc" />
      //           <img src="${eventLocation.eventLocationImage}" alt="event-location" class="event_location_image" />

      attachments: [
        {
          filename: `${event.eventName}-invitation.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
        {
          filename: "qrCodeImage.png",
          content: qrCodeImage.split("base64,")[1],
          cid: "qrCodeImage",
        },
      ],
    };

    // Send the invitation email
    transporter.sendMail(invitationMailOptions, (error, info) => {
      if (error) {
        console.error("Error sending invitation email:", error);
        return res
          .status(500)
          .json({ error: "Failed to send invitation email" });
      }
      console.log("invitation email sent:", info.response);
      res.json({
        message: "invitation email sent successfully",
      });
    });
  } catch (error) {
    console.error("Error sending invitation:", error);
    res.status(500).json({ error: "Failed to send invitation" });
  }
};

exports.approveEventPresence = async (req, res) => {
  const userId = req.params.user;
  const eventId = req.params.event;

  try {
    // Check if the user and event exist
    const user = await userModel.findById(userId);
    const event = await eventModel.findById(eventId);
    const eventMember = await eventMemberModel.findOne({
      event: eventId,
      user: userId,
    });

    if (!user || !event) {
      return res.status(404).json({ error: "User or event not found" });
    }

    await eventMemberModel.findByIdAndUpdate(eventMember._id, {
      $set: { isApproved: true },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "betta.auction.co@gmail.com",
        pass: "qqnsisdextwqrshf",
      },
    });

    const approvalMailOptions = {
      from: "betta.auction.co@gmail.com",
      to: "rihenhoulii@gmail.com",
      subject: `${event.eventName} : You have been approved for the Event`,
      html: `
      <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Event Joining Request Approval</title>
  <style>
    /* CSS styles for the email template */
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      background-color: #f2f2f2;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      border: 1px solid #ccc;
    }
    h1 {
      color: #333;
    }
    p {
      color: #555;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 3px;
    }
    .li a[href] {
      color: #ffffff !important;
  }
    .button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Event Approval</h1>
    <p>Dear ${user.userName.toUpperCase()} ,</p>
    <p>Congratulations! You have been approved to participate in the following event:</p>
    <h2>${event.eventName.toUpperCase()}</h2>
    <p>Date: From : ${event.eventStartDate} </p>
    <p>      To   : ${event.eventEndDate} </p>
    <p> ${event.eventDescription} </p>
    <p>Please confirm your presence by clicking the button below:</p>
    <a href="http://localhost:3080/event-member/confirm-presence/${userId}/${eventId}" class="button" >Confirm Presence</a>
    <p>If you have any questions or need further assistance, please feel free to contact us.</p>
    <p>We look forward to seeing you at the event!</p>
    <p>Best regards,</p>
    <p>The Event Team</p>
    <p>Betta Co. </p>
  </div>
</body>
</html>

        `,
    };

    // Send the approval email
    transporter.sendMail(approvalMailOptions, (error, info) => {
      if (error) {
        console.error("Error sending approval email:", error);
        return res.status(500).json({ error: "Failed to send approval email" });
      }
      console.log("Approval email sent:", info.response);
      res.json({
        message: "User approved and approval email sent successfully",
      });
    });
  } catch (error) {
    console.error("Error approving user:", error);
    res.status(500).json({ error: "Failed to approve user" });
  }
};

// GET route to confirm the user's presence for the event
exports.confirmEventPresence = async (req, res) => {
  const userId = req.params.user;
  const eventId = req.params.event;

  try {
    // Check if the user and event exist
    const user = await userModel.findById(userId);
    const event = await eventModel.findById(eventId);
    const eventMember = await eventMemberModel.findOne({
      event: eventId,
      user: userId,
    });

    if (!user || !event) {
      return res.status(404).json({ error: "User or event not found" });
    }

    await eventMemberModel.findByIdAndUpdate(eventMember._id, {
      $set: { isConfirmed: true },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "betta.auction.co@gmail.com",
        pass: "qqnsisdextwqrshf",
      },
    });

    // Compose the confirmation email message
    const confirmationMailOptions = {
      from: "betta.auction.co@gmail.com",
      to: "rihenhoulii@gmail.com",
      subject: `${event.eventName} : Your presence has been confirmed for the event`,
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Event Confirmation Received</title>
        <style>
          /* CSS styles for the email template */
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f2f2f2;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            border: 1px solid #ccc;
          }
          h1 {
            color: #333;
          }
          p {
            color: #555;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 3px;
          }
          .button:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Confirmation Received!</h1>
          <p>Dear ${user.userName.toUpperCase()},</p>
          <p>Your presence has been confirmed for the following event:</p>
          <h2>${event.eventName.toUpperCase()}</h2>
          <p>Date: From : ${event.eventStartDate} </p>
          <p>      To   : ${event.eventEndDate} </p>
          <p> ${event.eventDescription} </p>
          <p>Thank you for confirming your presence!</p>
          <p>We look forward to seeing you at the event. If you have any further questions or need any additional information, please feel free to contact us.</p>
          <p>Best regards,</p>
          <p>The Event Team</p>
          <p>Betta Co. </p>
        </div>
      </body>
      </html>
      `,
    };

    // Send the confirmation email
    transporter.sendMail(confirmationMailOptions, (error, info) => {
      if (error) {
        console.error("Error sending confirmation email:", error);
        return res
          .status(500)
          .json({ error: "Failed to send confirmation email" });
      }
      console.log("Confirmation email sent:", info.response);
      res.json({
        message:
          "User presence confirmed and confirmation email sent successfully",
      });
    });
  } catch (error) {
    console.error("Error confirming presence:", error);
    res.status(500).json({ error: "Failed to confirm presence" });
  }
};

// list event Members
exports.listData = async (req, res, next) => {
  try {
    const list = await eventMemberModel.find();
    if (list.length > 0) {
      res.status(200).json(list);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      eventMember: error.eventMember,
      error: error,
    });
  }
};

// get event Member by _id
exports.getData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventMember = await eventMemberModel.findOne({ _id: id });
    if (eventMember) {
      res.status(200).json(eventMember);
    } else {
      res.status(404).json("Event Member doesn't exist Found");
    }
  } catch (error) {
    res.json({
      eventMember: error.eventMember,
      error: error,
    });
  }
};

// list event Member by user
exports.listDataByUser = async (req, res, next) => {
  try {
    const { user } = req.params;
    const eventMemberList = await eventMemberModel.find({
      user: user,
    });
    if (eventMemberList) {
      res.status(200).json(eventMemberList);
    } else {
      res.status(404).json("Event Member doesn't exist");
    }
  } catch (error) {
    res.json("error", {
      eventMember: error.eventMember,
      error: error,
    });
  }
};

// list event Member by event
exports.listDataByEvent = async (req, res, next) => {
  try {
    const { event } = req.params;
    const eventMemberList = await eventMemberModel.find({
      event: event,
    });
    if (eventMemberList) {
      res.status(200).json(eventMemberList);
    } else {
      res.status(404).json("Event Member doesn't exist");
    }
  } catch (error) {
    res.json("error", {
      eventMember: error.eventMember,
      error: error,
    });
  }
};

// list event by event approved members
exports.listDataByEventApprovedMembers = async (req, res, next) => {
  try {
    const eventList = await eventModel.find({
      isApproved: true,
      event: req.params.event,
    });
    if (eventList.length > 0) {
      res.status(200).json(eventList);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      event: error.event,
      error: error,
    });
  }
};

// list event by user approved events
exports.listDataByUserApprovedEvents = async (req, res, next) => {
  try {
    const eventList = await eventModel.find({
      isApproved: true,
      user: req.params.user,
    });
    if (eventList.length > 0) {
      res.status(200).json(eventList);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      event: error.event,
      error: error,
    });
  }
};

// list event member by joining date range
exports.listDataByEventJoinPeriod = async (req, res, next) => {
  try {
    let list = [];
    if (req.body.joinDate !== undefined && req.body.leaveDate !== undefined) {
      list = await eventMemberModel.find({
        event: req.body.event,
        eventJoinDate: { $gte: req.body.joinDate },
        eventLeaveDate: { $lte: req.body.leaveDate },
      });
    } else {
      if (req.body.leaveDate === undefined) {
        list = await eventMemberModel.find({
          event: req.body.event,
          eventJoinDate: { $gte: req.body.joinDate },
        });
      } else {
        list = await eventMemberModel.find({
          event: req.body.event,
          eventLeaveDate: { $lte: req.body.leaveDate },
        });
      }
    }
    if (list.length > 0) {
      res.status(200).json(list);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      event: error.event,
      error: error,
    });
  }
};

// list event member by user joining date range
exports.listDataByMemberJoinPeriod = async (req, res, next) => {
  try {
    let list = [];
    if (req.body.joinDate !== undefined && req.body.leaveDate !== undefined) {
      list = await eventMemberModel.find({
        user: req.body.user,
        eventJoinDate: { $gte: req.body.joinDate },
        eventLeaveDate: { $lte: req.body.leaveDate },
      });
    } else {
      if (req.body.leaveDate === undefined) {
        list = await eventMemberModel.find({
          user: req.body.user,
          eventJoinDate: { $gte: req.body.joinDate },
        });
      } else {
        list = await eventMemberModel.find({
          user: req.body.user,
          eventLeaveDate: { $lte: req.body.leaveDate },
        });
      }
    }
    if (list.length > 0) {
      res.status(200).json(list);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      event: error.event,
      error: error,
    });
  }
};

// list event by event confirmed members
exports.listDataByEventConfirmedMembers = async (req, res, next) => {
  try {
    const eventList = await eventModel.find({
      isConfirmed: true,
      event: req.params.event,
    });
    if (eventList.length > 0) {
      res.status(200).json(eventList);
    } else {
      res.status(404).json("No data Found");
    }
  } catch (error) {
    res.json({
      event: error.event,
      error: error,
    });
  }
};

// add event Member
exports.addData = async (req, res, next) => {
  try {
    if (
      req.body.event !== undefined ||
      req.body.user !== undefined ||
      req.body.createdBy !== undefined
    ) {
      const existingEventMember = await eventMemberModel.findOne({
        event: req.body.event,
        user: req.body.user,
      });
      if (!existingEventMember) {
        const eventMember = new eventMemberModel({
          ...req.body,
        });
        eventMember.save();
        res.json(eventMember._id);
      } else {
        res.status(500).json({ error: "Event Member already exists" });
      }
    } else {
      res
        .status(400)
        .json({ error: "BAD REQUEST : No Data has been inserted " });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete event Member
exports.deleteData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingEventMember = await eventMemberModel.findOne({
      isDeleted: false,
      _id: id,
    });
    if (existingEventMember) {
      const eventMember = await eventMemberModel.findByIdAndUpdate(id, {
        $set: { isDeleted: true },
      });
      if (eventMember) {
        res.status(200).json("Event Member deleted successfully");
      } else {
        res.json({ error: "Error while deleting the event Member" });
      }
    } else {
      res.status(404).json({ error: "Event Member doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};

// restore event Member

exports.restoreData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingEventMember = await eventMemberModel.findOne({
      isDeleted: true,
      _id: id,
    });
    if (existingEventMember) {
      const eventMember = await eventMemberModel.findByIdAndUpdate(id, {
        $set: { isDeleted: false },
      });
      if (eventMember) {
        res.status(200).json("Event Member restored successfully");
      } else {
        res.json({ error: "Error while restoring the event Member" });
      }
    } else {
      res.status(404).json({ error: "Event Member doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error responding to your request" });
  }
};
