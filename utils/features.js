import jwt from "jsonwebtoken";

export const setCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_DEV == "Development" ? "lax" : "none",
      secure: process.env.NODE_DEV == "Development" ? false : true,
    })
    .json({
      success: true,
      message: message,
    });
};
