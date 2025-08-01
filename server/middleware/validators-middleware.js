const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    return next();
  } catch (err) {
    const status = 422;
    const message = "Fill the input properly";
    const extraDetails = err.issues?.map((curElem) => curElem.message) || [];

    const error = {
      status,
      message,
      extraDetails,
    };

    // ✅ Correct: pass entire error object to error middleware
    next(error);
  }
};

module.exports = validate;
