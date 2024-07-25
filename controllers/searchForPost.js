const Post = require('../models/Post');

const searchForPost = async (req, res) => {

    try {
        
        // Extract the hashtag from the query string
        const { hashtag } = req.query;
        
        // Check if the hashtag is missing
        if (!hashtag) {
            return res.status(400).json({ message: 'Hashtag is required' });
        }
        
        // Search for posts that contain the hashtag
        const posts = await Post.find({ content: new RegExp(`#${hashtag}`, 'i') }).populate('author');
        
        // Return the posts
        return res.status(200).json({ 
            posts 
        });

        } 
        
        catch (error) {

            console.error('Error searching for posts:', error);
            return res.status(500).json({ 
                message: 'Server error. Please try again later.' 
            });

        }
  };


module.exports = { searchForPost };