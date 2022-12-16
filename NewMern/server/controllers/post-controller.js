const PostModel = require("../models/post-model.js");
const { validationResult } = require("express-validator");

class PostController {
  async create(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некоректные данные при создании поста",
        });
      }
      const post = new PostModel({
        title: req.body.title,
        body: req.body.body,
        picture: req.body.picture,
        user: req.userId,
      });

      await post.save();
      res.json({ message: "Пост создан", post });
    } catch (e) {
      res.status(500).json({ message: "Не удалось создать пост" });
    }
  }

  async getAll(req, res) {
    try {
      const posts = await PostModel.find().populate("user").exec();
      res.json(posts);
    } catch (e) {
      res.status(500).json({ message: "Не удалось загрузить посты" });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(500).json({ message: "Пост не найден" });
      }

      const post = await PostModel.findById(id);
      return res.json(post);
    } catch (e) {
      res.status(500).json({ message: "Пост не найден" });
    }
  }

  async getMyPosts(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(500).json({ message: "Пользователь не найден" });
      }
      const post = await PostModel.find({ user: id });
      return res.json(post);
    } catch (e) {
      res.status(500).json({ message: "Пост не найден" });
    }
  }

  async viewsCount(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(500).json({ message: "Пост не найден" });
      }

      const post = await PostModel.findOneAndUpdate(
        { _id: id },
        { $inc: { viewsCount: 1 } },
        { new: true }
      );
      return res.json(post);
    } catch (e) {
      res.status(500).json({ message: "Пост не найден" });
    }
  }

  async likePost(req, res) {
    try {
      const { postId } = req.body;
      if (!postId) {
        return res.status(500).json({ message: "Пост не найден" });
      }

      const post = await PostModel.findOneAndUpdate(
        { _id: postId },
        { $push: { likesCount: { id: req.body.userId, like: true } } },
        { new: true }
      );

      return res.json(post);
    } catch (e) {
      res.status(500).json({ message: "Пост не найден" });
    }
  }

  async unlikePost(req, res) {
    try {
      const { postId } = req.body;
      if (!postId) {
        return res.status(500).json({ message: "Пост не найден" });
      }

      const post = await PostModel.findOneAndUpdate(
        { _id: postId },
        { $pull: { likesCount: { id: req.body.userId, like: true } } },
        { new: true }
      );

      return res.json(post);
    } catch (e) {
      res.status(500).json({ message: "Пост не найден" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(500).json({ message: "Пост не найден" });
      }
      const updatePost = await PostModel.updateOne(
        {
          _id: id,
        },
        {
          title: req.body.title,
          body: req.body.body,
          picture: req.body.picture,
          user: req.userId,
        }
      );
      res.json({ message: "Пост обновлен", updatePost });
    } catch (e) {
      res.status(500).json({ message: "Не удалось обновить пост" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(500).json({ message: "Пост не найден" });
      }

      const post = await PostModel.findByIdAndDelete(id);
      return res.json({ post, message: "Пост удален" });
    } catch (e) {
      res.status(500).json({ message: "Не удалось удалить пост" });
    }
  }
}

module.exports = new PostController();
