import { Response } from "express";

const checkContent = (content: string, res: Response) => {
  if (typeof content !== "string" || content === "") {
    console.log("wrong type content or empty content!");
    res.status(500).send([]);
    return true;
  }
  return false;
};

export default checkContent;
