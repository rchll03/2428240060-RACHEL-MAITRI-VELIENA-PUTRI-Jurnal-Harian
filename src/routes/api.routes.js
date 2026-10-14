
import express from 'express'
import upload from '../config/upload.js'
import UploadController from '../controllers/upload.controller.js'
import UserController from '../controllers/user.controller.js'
import WelcomeController from '../controllers/welcome.controller.js'
import LaundryController from '../controllers/laundry.controller.js'

const router = express.Router()

router.get('/welcome', WelcomeController.welcome)
router.post('/users', UserController.store)
router.post('/upload', upload.single('file'), UploadController.store)

// API Manajemen Data Laundry
router.post('/laundry', LaundryController.store)
router.get('/laundry', LaundryController.index)
router.get('/laundry/:id', LaundryController.show)
router.put('/laundry/:id', LaundryController.update)
router.delete('/laundry/:id', LaundryController.destroy)

export default router
