const router = require("express").Router();

const requireAuth = require("../middlewares/requireAuth");

const authRouter = require("../routes/auth.route");
const userRouter = require("../routes/user.route");
const {withAuthRouter: withAuthBlogRouter, withoutAuthRouter: withoutAuthBlogRouter} = require("../routes/blog.route");

router.use(authRouter);
router.use(withoutAuthBlogRouter);
router.use(requireAuth, userRouter);
router.use(requireAuth, withAuthBlogRouter);

module.exports = router;
