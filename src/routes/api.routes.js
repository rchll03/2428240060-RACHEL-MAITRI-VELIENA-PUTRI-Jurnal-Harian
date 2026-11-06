import express from 'express'
import upload from '../config/upload.js'
import UploadController from '../controllers/upload.controller.js'
import UserController from '../controllers/user.controller.js'
import WelcomeController from '../controllers/welcome.controller.js'
import jurnalharianController from '../controllers/jurnalharian.controller.js'

const router = express.Router()

router.get('/welcome', WelcomeController.welcome)
router.post('/users', UserController.store)
router.post('/upload', upload.single('file'), UploadController.store)

// API Manajemen Data Jurnal Harian
router.post('/jurnalharian', jurnalharianController.store)
router.get('/jurnalharian', jurnalharianController.index)
router.get('/jurnalharian/:id', jurnalharianController.show)
router.put('/jurnalharian/:id', jurnalharianController.update)
router.delete('/jurnalharian/:id', jurnalharianController.destroy)

export default router
