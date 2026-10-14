
import mongoose from 'mongoose'
import Laundry from '../models/laundry.model.js'
import { createLaundrySchema } from '../schemas/laundry.schema.js'
import {
  apiResponse,
  apiResponseValidation,
} from '../utils/response.js'

class LaundryController {
  // Menambahkan data laundry
  static async store(req, res) {
    const result = createLaundrySchema.safeParse(req.body)

    if (!result.success) {
      return apiResponseValidation({
        res,
        errors: result.error,
      })
    }

    try {
      const laundry = await Laundry.create(result.data)

      return apiResponse({
        res,
        status: 201,
        message: 'Data laundry berhasil ditambahkan',
        data: laundry,
      })
    } catch (error) {
      console.error(error)
      return apiResponse({
        res,
        status: 500,
        message: 'Gagal menambahkan data laundry',
        data: null,
      })
    }
  }

  // Menampilkan semua data laundry
  static async index(req, res) {
    try {
      const laundry = await Laundry.find()

      return apiResponse({
        res,
        status: 200,
        message: 'Data laundry berhasil diambil',
        data: laundry,
      })
    } catch (error) {
      console.error(error)
      return apiResponse({
        res,
        status: 500,
        message: 'Gagal mengambil data laundry',
        data: null,
      })
    }
  }

  // Menampilkan satu data laundry berdasarkan ID
  static async show(req, res) {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return apiResponse({
        res,
        status: 400,
        message: 'ID laundry tidak valid',
        data: null,
      })
    }

    try {
      const laundry = await Laundry.findById(id)

      if (!laundry) {
        return apiResponse({
          res,
          status: 404,
          message: 'Data laundry tidak ditemukan',
          data: null,
        })
      }

      return apiResponse({
        res,
        status: 200,
        message: 'Data laundry berhasil diambil',
        data: laundry,
      })
    } catch (error) {
      console.error(error)
      return apiResponse({
        res,
        status: 500,
        message: 'Gagal mengambil data laundry',
        data: null,
      })
    }
  }

  // Mengubah data laundry berdasarkan ID
  static async update(req, res) {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return apiResponse({
        res,
        status: 400,
        message: 'ID laundry tidak valid',
        data: null,
      })
    }

    const result = createLaundrySchema.safeParse(req.body)

    if (!result.success) {
      return apiResponseValidation({
        res,
        errors: result.error,
      })
    }

    try {
      const laundry = await Laundry.findByIdAndUpdate(
        id,
        result.data,
        { new: true, runValidators: true },
      )

      if (!laundry) {
        return apiResponse({
          res,
          status: 404,
          message: 'Data laundry tidak ditemukan',
          data: null,
        })
      }

      return apiResponse({
        res,
        status: 200,
        message: 'Data laundry berhasil diperbarui',
        data: laundry,
      })
    } catch (error) {
      console.error(error)
      return apiResponse({
        res,
        status: 500,
        message: 'Gagal memperbarui data laundry',
        data: null,
      })
    }
  }

  // Menghapus data laundry berdasarkan ID
  static async destroy(req, res) {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return apiResponse({
        res,
        status: 400,
        message: 'ID laundry tidak valid',
        data: null,
      })
    }

    try {
      const laundry = await Laundry.findByIdAndDelete(id)

      if (!laundry) {
        return apiResponse({
          res,
          status: 404,
          message: 'Data laundry tidak ditemukan',
          data: null,
        })
      }

      return apiResponse({
        res,
        status: 200,
        message: 'Data laundry berhasil dihapus',
        data: laundry,
      })
    } catch (error) {
      console.error(error)
      return apiResponse({
        res,
        status: 500,
        message: 'Gagal menghapus data laundry',
        data: null,
      })
    }
  }
}

export default LaundryController
