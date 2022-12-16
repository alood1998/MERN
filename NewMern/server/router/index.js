const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const PostController = require("../controllers/post-controller");
const router = new Router();
const authMiddleware = require("../middlewares/auth-middleware");
const {
  regValidation,
  logValidation,
  userDataChange,
  logChange,
  passwordChange,
} = require("../validation/userValidations");
const { postCreateValidation } = require("../validation/postValidation");

//USER_ROUTES
router.post("/registration", regValidation, userController.registration);
router.post("/login", logValidation, userController.login);
router.post("/google-registration", userController.googleRegistration);
router.post("/google-login", userController.googleLogin);

router.get("/auth/me", authMiddleware, userController.getUser);
router.get("/activate/:link", userController.activate);

router.post("/user-data-change", userDataChange, userController.userDataChange);
router.post("/change-email", logChange, userController.loginChange);
router.post("/change-password", passwordChange, userController.passwordChange);
router.post("/forgot-password", userController.sendPasswordLink);
router.post("/recovery-password", userController.recoveryPassword);
router.post("/avatar", userController.avatarUpload);

//POSTS_ROUTES
router.get("/posts", PostController.getAll);
router.get("/posts/my_posts/:id", PostController.getMyPosts);
router.get("/posts/:id", PostController.getOne);

router.get("/posts/viewed/:id", PostController.viewsCount);
router.post("/posts/like", authMiddleware, PostController.likePost);
router.post("/posts/unlike", authMiddleware, PostController.unlikePost);

router.post(
  "/posts",
  authMiddleware,
  postCreateValidation,
  PostController.create
);
router.patch("/posts/:id", authMiddleware, PostController.update);
router.delete("/posts/:id", authMiddleware, PostController.delete);

module.exports = router;
