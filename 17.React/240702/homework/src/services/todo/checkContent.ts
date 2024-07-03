import { Response } from "express";

const checkContent = (content: string, res: Response) => {
  if (typeof content !== "string" || content === "") {
    res.send("wrong type content or empty content!");
    return true;
  }
  return false;
};

export default checkContent;
