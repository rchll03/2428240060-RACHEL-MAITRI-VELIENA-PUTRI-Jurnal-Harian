import mongoose from 'mongoose'
import express from 'express'
import jurnalharian from '../models/jurnalharian.model.js'
import { createjurnalharianSchema} from '../controller/jurnalharian.controller.js'
import { createjurnalharianSchema} from '../controller/jurnalharian.controller.js'
import {
  apiResponse,
  apiResponseValidation,
} from '../utils/response.js'

class jurnalharianController {
  static async store(req, res) {
    const result = createjurnalharianSchema.safeParse(req.body)

    if (!result.success) {
      return apiResponseValidation({
        res,
        errors: result.error,
      })
    }

    try {
      const jurnalharian = await jurnalharian.create(result.data)

      return apiResponse({
        res,
        status: 201,
        message: 'Data jurnalharian berhasil ditambahkan',
        data: jurnalharian,
      })
    } catch (error) {
      console.error(error)
      return apiResponse({
        res,
        status: 500,
        message: 'Gagal menambahkan data jurnalharian',
        data: null,
      })
    }
  }

  // Menampilkan semua data jurnalharian
  static async index(req, res) {
    try {
      const jurnalharian = await jurnalharian.find()

      return apiResponse({
        res,
        status: 200,
        message: 'Data jurnalharian berhasil diambil',
        data: jurnalharian,
      })
    } catch (error) {
      console.error(error)
      return apiResponse({
        res,
        status: 500,
        message: 'Gagal mengambil data jurnalharian',
        data: null,
      })
    }
  }

  static async show(req, res) {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return apiResponse({
        res,
        status: 400,
        message: 'ID jurnalharian tidak valid',
        data: null,
      })
    }

    try {
      const jurnalharian = await jurnalharian.findById(id)

      if (!jurnalharian) {
        return apiResponse({
          res,
          status: 404,
          message: 'Data jurnalharian tidak ditemukan',
          data: null,
        })
      }

      return apiResponse({
        res,
        status: 200,
        message: 'Data jurnalharian berhasil diambil',
        data: jurnalharian,
      })
    } catch (error) {
      console.error(error)
      return apiResponse({
        res,
        status: 500,
        message: 'Gagal mengambil data jurnalharian',
        data: null,
      })
    }
  }

  static async update(req, res) {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return apiResponse({
        res,
        status: 400,
        message: 'ID jurnalharian tidak valid',
        data: null,
      })
    }

    const result = createjurnalharianSchema.safeParse(req.body)

    if (!result.success) {
      return apiResponseValidation({
        res,
        errors: result.error,
      })
    }

    try {
      const jurnalharian = await jurnalharian.findByIdAndUpdate(
        id,
        result.data,
        { new: true, runValidators: true },
      )

      if (!jurnalharian) {
        return apiResponse({
          res,
          status: 404,
          message: 'Data jurnalharian tidak ditemukan',
          data: null,
        })
      }

      return apiResponse({
        res,
        status: 200,
        message: 'Data jurnalharian berhasil diperbarui',
        data: jurnalharian,
      })
    } catch (error) {
      console.error(error)
      return apiResponse({
        res,
        status: 500,
        message: 'Gagal memperbarui data jurnalhariany',
        data: null,
      })
    }
  }

  static async destroy(req, res) {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return apiResponse({
        res,
        status: 400,
        message: 'ID jurnalharian tidak valid',
        data: null,
      })
    }

    try {
      const jurnalharian = await jurnalharian.findByIdAndDelete(id)

      if (!jurnalharian) {
        return apiResponse({
          res,
          status: 404,
          message: 'Data jurnalharian tidak ditemukan',
          data: null,
        })
      }

      return apiResponse({
        res,
        status: 200,
        message: 'Data jurnalharian berhasil dihapus',
        data: jurnalharian,
      })
    } catch (error) {
      console.error(error)
      return apiResponse({
        res,
        status: 500,
        message: 'Gagal menghapus data jurnalharian',
        data: null,
      })
    }
  }
}

