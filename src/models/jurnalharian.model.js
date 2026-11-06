
import mongoose from 'mongoose'

const jurnalharianSchema = new mongoose.Schema(
  {
    entry_date: {
      type: Date,
      required: true,
    },
    mood: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

const jurnalharian = mongoose.model('jurnalharian', jurnalharianSchema)

export default jurnalharian
