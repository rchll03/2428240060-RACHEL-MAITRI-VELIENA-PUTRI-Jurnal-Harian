import mongoose from 'mongoose'

const laundrySchema = new mongoose.Schema(
  {
    nama_pelanggan: {
      type: String,
      required: true,
      trim: true,
    },
    berat_kg: {
      type: Number,
      required: true,
      min: 0.01,
    },
    status_selesai: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

const Laundry = mongoose.model('Laundry', laundrySchema)

export default Laundry