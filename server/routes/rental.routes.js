import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import rentalCtrl from '../controllers/rental.controller'

const router = express.Router()

router.route('/api/rentals')
  .get(rentalCtrl.list)

router.route('/api/rental/:rentalId')
  .get(rentalCtrl.read)

router.route('/api/rentals/by/:userId')
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.isSeller, rentalCtrl.create)
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, rentalCtrl.listByOwner)

router.route('/api/rentals/:rentalId')
  .put(authCtrl.requireSignin, rentalCtrl.isOwner, rentalCtrl.update)
  .delete(authCtrl.requireSignin, rentalCtrl.isOwner, rentalCtrl.remove)

router.route('/api/rentals/logo/:rentalId')
  .get(rentalCtrl.photo, rentalCtrl.defaultPhoto)

router.route('/api/rentals/defaultphoto')
  .get(rentalCtrl.defaultPhoto)

router.param('rentalId', rentalCtrl.rentalByID)
router.param('userId', userCtrl.userByID)

export default router
