
const router = require('express').Router();
const thought_Routes = require('./thoughtsRoute');
const user_Routes = require('./userRoute');

router.use('/thoughts', thought_Routes);
router.use('/users', user_Routes);

module.exports = router;