const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pdf: { type: String, required: true }, // GridFS filename for the PDF
  image: { type: String, required: true }, // GridFS filename for the image
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
},
{ collection: "Library" }
);

module.exports = mongoose.model("Library", bookSchema);
