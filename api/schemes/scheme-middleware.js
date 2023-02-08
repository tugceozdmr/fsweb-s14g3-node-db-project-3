const db = require("../../data/db-config");
const schememodel = require("./scheme-model");

/*
  Eğer `scheme_id` veritabanında yoksa:
  durum 404
  {
    "message": "scheme_id <gerçek id> id li şema bulunamadı"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const presentscheme = await db("schemes")
      .where("scheme_id", req.params.scheme_id)
      .first();
    if (!presentscheme) {
      next({
        status: 404,
        message: `scheme_id ${req.params.scheme_id} id li şema bulunamadı`,
      });
    } else {
      req.scheme = presentscheme;
      next();
    }
  } catch (error) {
    next(error);
  }
};

/*
  Eğer `scheme_name` yoksa, boş string ya da string değil:
  durum 400
  {
    "message": "Geçersiz scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  try {
    const { scheme_name } = req.body;
    if (
      scheme_name === undefined ||
      typeof scheme_name !== "string" ||
      scheme_name.trim() === ""
    ) {
      next({
        status: 400,
        message: "Geçersiz scheme_name",
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

/*
  Eğer `instructions` yoksa, boş string yada string değilse, ya da
  eğer `step_number` sayı değilse ya da birden küçükse:
  durum 400
  {
    "message": "Hatalı step"
  }
*/
const validateStep = (req, res, next) => {
  try {
    const { instructions, step_number } = req.body;
    if (
      instructions === undefined ||
      typeof instructions !== "string" ||
      instructions.trim() === ""
    ) {
      next({
        status: 400,
        message: "Hatalı step",
      });
    } else if (
      typeof step_number !== "number" ||
      isNaN(step_number) ||
      step_number < 1
    ) {
      next({
        status: 400,
        message: "Hatalı step",
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
