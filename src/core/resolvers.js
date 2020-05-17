const CommentController = require('../controllers/CommentController.js');
const FollowController = require('../controllers/FollowController.js');
const LikeController = require('../controllers/LikeController.js');
const PostController = require('../controllers/PostController.js');
const SavedPostController = require('../controllers/SavedPostController.js');
const UserController = require('../controllers/UserController.js');
const CommentValidator = require('../validators/CommentValidator.js');

const _CommentController = new CommentController.default();
const _FollowController = new FollowController.default();
const _LikeController = new LikeController.default();
const _PostController = new PostController.default();
const _SavedPostController = new SavedPostController.default();
const _UserController = new UserController.default();
const _CommentValidator = new CommentValidator.default();

module.exports = {
  Comment: {
    user: async (...params) => {
      return _UserController.getUserByComment(...params);
    }
  },
  Mutation: {
    createComment: async (...params) => {
      _CommentValidator.createComment &&
        (await _CommentValidator.createComment(...params));
      return _CommentController.createComment(...params);
    },
    updateComment: async (...params) => {
      _CommentValidator.updateComment &&
        (await _CommentValidator.updateComment(...params));
      return _CommentController.updateComment(...params);
    },
    deleteComment: async (...params) => {
      _CommentValidator.deleteComment &&
        (await _CommentValidator.deleteComment(...params));
      return _CommentController.deleteComment(...params);
    },
    createFollow: async (...params) => {
      return _FollowController.createFollow(...params);
    },
    deleteFollow: async (...params) => {
      return _FollowController.deleteFollow(...params);
    },
    createLike: async (...params) => {
      return _LikeController.createLike(...params);
    },
    deleteLike: async (...params) => {
      return _LikeController.deleteLike(...params);
    },
    createPost: async (...params) => {
      return _PostController.createPost(...params);
    },
    updatePost: async (...params) => {
      return _PostController.updatePost(...params);
    },
    deletePost: async (...params) => {
      return _PostController.deletePost(...params);
    },
    createSavedPost: async (...params) => {
      return _SavedPostController.createSavedPost(...params);
    },
    deleteSavedPost: async (...params) => {
      return _SavedPostController.deleteSavedPost(...params);
    },
    createUser: async (...params) => {
      return _UserController.createUser(...params);
    },
    updateUser: async (...params) => {
      return _UserController.updateUser(...params);
    },
    deleteUser: async (...params) => {
      return _UserController.deleteUser(...params);
    },
    setLocation: async (...params) => {
      return _UserController.setLocation(...params);
    }
  },
  Follow: {
    user: async (...params) => {
      return _UserController.getUserByFollow(...params);
    },
    userFollow: async (...params) => {
      return _UserController.getUserFollowByFollow(...params);
    }
  },
  Query: {
    listFollowers: async (...params) => {
      return _FollowController.listFollowers(...params);
    },
    listFollowing: async (...params) => {
      return _FollowController.listFollowing(...params);
    },
    getPost: async (...params) => {
      return _PostController.getPost(...params);
    },
    listPosts: async (...params) => {
      return _PostController.listPosts(...params);
    },
    listPostsFeed: async (...params) => {
      return _PostController.listPostsFeed(...params);
    },
    listPostsByLocation: async (...params) => {
      return _PostController.listPostsByLocation(...params);
    },
    getUser: async (...params) => {
      return _UserController.getUser(...params);
    },
    listUsers: async (...params) => {
      return _UserController.listUsers(...params);
    }
  },
  Like: {
    user: async (...params) => {
      return _UserController.getUserByLike(...params);
    }
  },
  Post: {
    author: async (...params) => {
      return _UserController.getAuthorByPost(...params);
    },
    likes: async (...params) => {
      return _LikeController.getLikesByPost(...params);
    },
    comments: async (...params) => {
      return _CommentController.getCommentsByPost(...params);
    }
  },
  SavedPost: {
    post: async (...params) => {
      return _PostController.getPostBySavedPost(...params);
    }
  },
  User: {
    savedPosts: async (...params) => {
      return _SavedPostController.getSavedPostsByUser(...params);
    }
  }
};
