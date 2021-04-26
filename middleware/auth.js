import jwt from "jsonwebtoken";
// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
// export function cookiesCleaner(req, res, next) {
//   if (req.cookies.user_sid && !req.session.user) {
//     res.clearCookie("user_sid");
//   }
//   next();
// }

// middleware function to check for logged-in users
export const tokenChecker = (req, res, next) => {
  if (req.meyhod === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Пользователь не авторизован" });
    }
    const decoder = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoder;
    next();
  } catch (error) {
    res.status(401).json({ message: "Пользователь не авторизован" });
  }
};
