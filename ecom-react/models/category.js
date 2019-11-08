const mongoose = require("mongoose");
const {Schema} = mongoose;

const categorySchema = new Schema(
    {
        name: {
          type: String,
          trim: true,
          required: true,
          maxlength: 32,
          unique: true
        },

        // deleted flag for soft delete feature
        deleted: {
          type: Schema.Types.Boolean,
          index: true,
          default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);



// const mongoose = require("mongoose");
//
// const categorySchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             trim: true,
//             required: true,
//             maxlength: 32
//         }
//     },
//     { timestamps: true }
// );
//
// module.exports = mongoose.model("Category", categorySchema);
