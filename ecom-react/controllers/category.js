const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((error, category) => {
        if (error || !category) {
            return res.status(400).json({
                error: "Category does not exist"
            });
        }
        req.category = category;
        next();
    });
};

exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        res.json({ data });
    });
};


module.exports.read = async (req, res) => {
  try {
    const category = req.category; // if it's an instance of model
    // or if it's mongoose model comment line above
    // const category = await req.category.findOne({
    //                                     _id: req.params.categoryId,
    //                                     deleted: false
    //                                   });

    if (!category || category.deleted) {
      return res.status(404).json({
        error: 'Requested category does not exist'
      });
    }
    res.status(200).json(category);
  }
  catch (error) {
    res.status(400).json({
      error: errorHandler(error)
    });
  }
};
// exports.read = (req, res) => {
//     return res.json(req.category);
// };


exports.update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        res.json(data);
    });
};

module.exports.remove = async (req, res) => {
  try {
    const category = req.category; // if it's an instance of model
    // or if it's mongoose model comment line above
    // const category = await req.category.findOne({
    //                                     _id: req.params.categoryId,
    //                                     deleted: false
    //                                   });

    if (!category || category.deleted) {
      return res.status(404).json({
        error: 'Requested category does not exist'
      });
    }

    category.deleted = true;
    await category.save();

    res.status(200).json({
      message: "Category deleted"
    });
  }
  catch (error) {
    res.status(400).json({
      error: errorHandler(error)
    });
  }
};


// exports.remove = (req, res) => {
//     const category = req.category;
//     category.remove((error, data) => {
//         if (error) {
//             return res.status(400).json({
//                 error: errorHandler(error)
//             });
//         }
//         res.json({
//             message: "Category deleted"
//         });
//     });
// };


// Not working returning error
// module.exports.list = async (req, res) => {
//   try {
//     const categories = req.category.find({deleted: false, data});
//     res.status(200).json({categories});
//   }
//   catch (error) {
//     res.status(400).json({
//       error: errorHandler(error)
//     });
//   }
//   res.json(data);
// };


exports.list = (req, res) => {
    Category.find().exec((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        res.json(data);
    });
};
