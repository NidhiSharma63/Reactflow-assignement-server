const errorHandle = (error, _req, res, next) => {
  if (
    error.message.includes("Missing") ||
    error.message.includes("already exists") ||
    error.message.includes("not found") ||
    error.message.includes("included")
  ) {
    return res.status(400).send(error.message);
  }
  return res.status(500).send("Something went wrong, try again later");
};
export default errorHandle;
