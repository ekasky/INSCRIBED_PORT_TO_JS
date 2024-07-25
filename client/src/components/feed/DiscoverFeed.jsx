import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '@chakra-ui/react';
import PostCard from './PostCard';
import InfiniteScroll from 'react-infinite-scroll-component';


export default function DiscoverFeed() { 

    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const { user } = useAuth();
    const toast = useToast();

    // function to get the discover feed
    const getDiscoverFeed = async () => {

        try {

            // Get the token from the local storage
            const token = localStorage.getItem('token');

            // Make a GET request to the server to get the discover feed
            const response = await fetch('/api/discover-feed', {

                method: 'GET',

                headers: {

                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                }

            });

            // Check if the response is not okay
            if (!response.ok) {
                throw new Error('Failed to load posts');
            }

            // Get the posts from the server
            const data = await response.json();

            // check if we have more posts
            if (data.posts.length < 10) {
                setHasMore(false);
            }

            // set the posts
            setPosts((prevPosts) => [...prevPosts, ...data.posts]);
            setPage((prevPage) => prevPage + 1);

        }

        catch(error) {

            // Show a toast message if there is an error
            toast({
                title: 'An error occurred.',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true
            }); 

        }

        

    }

    // function to handle liking a post
    const handleLike = async (postId) => { 

    };


    // function to handle unliking a post
    const handleUnlike = async (postId) => {

    };

    // function to handle deleting a post
    const handleDelete = async (postId) => {

    };

    // get the user id from the useAuth hook
    const { userId, loading } = useAuth();


    useEffect(() => {
        if (!loading && user) {
            getDiscoverFeed();
        }
    }, [loading, user]);

    if (loading) {
        return <h4>Loading...</h4>;
    }

    return (
        
        <InfiniteScroll
            dataLength={posts.length}
            next={getDiscoverFeed}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
        >

            {posts.map((post) => (

                <PostCard post={post} handleLike={handleLike} handleUnlike={handleUnlike} handleDelete={handleDelete} userId={user.userId} />
                
            ) )}

        </InfiniteScroll>

    )

}