import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const CategorySchema = new Schema(
  {
    // Replace here with multiple types respondednt to categorical
    name: {
      type: String,
    },
    count: {

    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

const Category = mongoose.model("Category", CategorySchema);

export default Category;
