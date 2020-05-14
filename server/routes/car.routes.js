import express from 'express'
import carCtrl from '../controllers/car.controller'
import authCtrl from '../controllers/auth.controller'
import rentalCtrl from '../controllers/rental.controller'

const router = express.Router()

router.route('/api/cars/by/:rentalId')
  .post(authCtrl.requireSignin, rentalCtrl.isOwner, carCtrl.create)
  .get(carCtrl.listByShop)

router.route('/api/cars/latest')
  .get(carCtrl.listLatest)

router.route('/api/cars/related/:carId')
  .get(carCtrl.listRelated)

router.route('/api/cars/categories')
  .get(carCtrl.listCategories)

router.route('/api/cars')
  .get(carCtrl.list)

router.route('/api/cars/:carId')
  .get(carCtrl.read)

router.route('/api/car/image/:carId')
  .get(carCtrl.photo, carCtrl.defaultPhoto)
router.route('/api/car/defaultphoto')
  .get(carCtrl.defaultPhoto)

router.route('/api/car/:rentalId/:carId')
  .put(authCtrl.requireSignin, rentalCtrl.isOwner, carCtrl.update)
  .delete(authCtrl.requireSignin, rentalCtrl.isOwner, carCtrl.remove)

router.param('rentalId', rentalCtrl.rentalByID)
router.param('carId', carCtrl.carByID)

export default router
