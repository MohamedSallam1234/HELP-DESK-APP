const userModel = require("../models/userModel");
const sessionModel = require("../models/sessionModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const OtpModel = require("../models/otpModel");
const { Mail } = require("../lib/notification");
require("dotenv").config();

module.exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name)
    return res.json({ mssg: "Email and Password and Name are Required" });
  try {
    const userExist = await userModel.findOne({ email });
    if (userExist) return res.status(409).json({ mssg: "User already exists" });

    if (!validator.isEmail(email))
      return res.json({ mssg: "Wrong Email Format" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await userModel.create({ email, password: hashedPassword, name });

    return res.json({ mssg: "User Registerd" });
  } catch (err) {
    if (err.isjoi === true) return res.json({ mssg: err });
    console.log(err);
    return res.json({ mssg: err });
  }
};

// JWT => header()  payload(user data but not sensitve data)  signature(that token is valid)   header+payload hashed with secrete key => signature

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.json({ mssg: "All fields must be filled" });
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(403).send({ mssg: "Invalid email or password." });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(403).send({ mssg: "Invalid email or password." });
    const currentDateTime = new Date();
    const expiresAt = new Date(+currentDateTime + 180000000);
    const token = jwt.sign(
      { user: { _id: user._id, role: user.role } },
      process.env.SECRET,
      { expiresIn: 40000 }
    );
    const new_session = await sessionModel.create({
      userId: user._id,
      token,
      expiresAt,
    });
    return res
      .cookie("token", token, {
        expires: expiresAt,
        withCredentials: true,
        httpOnly: false,
        SameSite: "none",
      })
      .status(200)
      .json({ message: "login successfully", user });
  } catch (err) {
    console.log(err);
    res.json({ mssg: err });
  }
};

module.exports.otpLogin = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let otpCode, existingOtp;

    do {
      otpCode = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      existingOtp = await OtpModel.findOne({ code: otpCode });
    } while (existingOtp !== null);

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 2);

    const otp = new OtpModel({
      user: user._id,
      code: otpCode,
      createdAt: new Date(),
      expiryDate: expiresAt,
    });

    await otp.save();
    //TODO: send email
    const body = `Thank you for using Help-Desk you can find the OTP: \n ${otpCode}`;
    await Mail(email, "OTP verification", body);
    res.status(200).json({ message: "OTP sent" });
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.otpVerify = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(400).json("User not found.");
      return;
    }

    const otp = await OtpModel.findOne({
      user: user._id,
      code: code,
    });

    if (!otp) {
      res.status(400).json("Invalid OTP.");
      return;
    }

    const expiryTimestamp = new Date(otp.expiryDate).getTime();
    const currentTimestamp = new Date().getTime();

    if (expiryTimestamp < currentTimestamp) {
      res.status(400).json("OTP expired.");
      return;
    }
    const token = jwt.sign(
      { user: { _id: user._id, role: user.role } },
      process.env.SECRET,
      { expiresIn: 40000 }
    );
    const expiresAt = new Date(currentTimestamp + 180000000);
    const new_session = await sessionModel.create({
      userId: user._id,
      token,
      expiresAt,
    });
    await OtpModel.deleteOne({
      user: user._id,
      code: code,
    });
    return res
      .cookie("token", token, {
        expires: expiresAt,
        withCredentials: true,
        httpOnly: false,
        SameSite: "none",
      })
      .status(200)
      .json({ message: "login successfully", user });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
