import { User } from "../../models/index.js";

export default async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      throw new Error("not found user");
    } else if (user.pw == req.body.pw) {
      res.cookie("user", user.id, {
        maxAge: 1000 * 60 * 10,
        httpOnly: true,
        secure: true,
        signed: true,
      });
      res.json({ user, result: "ok" });
    } else {
      throw new Error("not match password");
    }
  } catch (err) {
    console.error(err);
    res.json({ error: err.message });
  }
};
