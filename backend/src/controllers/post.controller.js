import { Post } from '../models/post.model.js';

export async function getAllPosts(req, res) {
    const posts = await Post.find();

    try {
        if (posts.length !== 0) {
            res.status(200).json({
                status: 'success',
                data: {
                    posts,
                    results: posts.length
                },
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}

export async function getPostById(req, res) {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                status: 'fail',
                data: {
                    message: 'No post found'
                }
            })
        }

        res.status(200).json({
            status: 'success',
            data: {
                post,
            },
        })
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({
                status: 'fail',
                data: {
                    message: 'Invalid post id'
                }
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}

export async function createPost(req, res) {
    try {
        const { name, description, age } = req.body;

        if (!name) {
            return res.status(400).json({
                status: 'fail',
                data: {
                    message: 'name is required'
                }
            });
        }

        if (!description) {
            return res.status(400).json({
                status: 'fail',
                data: {
                    message: 'description is required'
                }
            });
        }

        if (age === undefined || age === null) {
            return res.status(400).json({
                status: 'fail',
                data: {
                    message: 'age is required'
                }
            });
        }

        const post = await Post.create({
            name, description, age
        });

        return res.status(201).json({
            status: 'success',
            data: post
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}

export async function updatePost(req, res) {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'No data was provided to update the resource'
            });
        }

        const { id } = req.params;
        const post = await Post.findByIdAndUpdate(id, req.body, { new: true });

        if (!post) {
            return res.status(404).json({
                status: 'fail',
                data: {
                    message: 'No post found'
                }
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                post,
                message: 'Post updated successfully'
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}

export async function deletePost(req, res) {
    try {

        const { id } = req.params;
        const post = await Post.findByIdAndDelete(id);

        if (!post) {
            return res.status(404).json({
                status: 'fail',
                data: {
                    message: 'No post found'
                }
            });
        }

        res.status(204).send();
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({
                status: 'fail',
                data: {
                    message: 'Invalid post id'
                }
            });
        }
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}