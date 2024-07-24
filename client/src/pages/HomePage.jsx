import { useState, useContext } from "react";
import InfiniteScrollFeed from "../components/InfiniteScrollFeed";
import TopAppBar from "../components/TopAppBar";
import { Box, ButtonGroup, Button, Fab, Dialog, DialogTitle, DialogContent, TextField, DialogActions, CircularProgress } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    
    /* Define state */
    const [currentFeed, setCurrentFeed] = useState('forYou');
    const [open, setOpen] = useState(false);
    const [newPostContent, setNewPostContent] = useState('');

    const navigate = useNavigate();
    
    /* Get the context from the user */
    const { user, logout, loading } = useContext(AuthContext);

    /* Determies which api endpoint to use for the selected feed */
    const getApiEndpoint = () => {
        switch (currentFeed) {
            case 'forYou':
                return '/api/for-you-feed';
            case 'discover':
                return '/api/discover-feed';
            default:
                return '/api/for-you-feed';
        }
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
    }

    // If there is no user logout
    if (!user) {
        logout(navigate);
    }

    return (
        <Box>

            <TopAppBar />

            <Box sx={{ paddingTop: '64px', backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
                    
                    {/* Feed select buttons */}
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        
                        <Button onClick={() => setCurrentFeed('forYou')}>For You</Button>
                        <Button onClick={() => setCurrentFeed('discover')}>Discover</Button>
                   
                    </ButtonGroup>

                </Box>

                {/* Display the current selected feed */}
                <InfiniteScrollFeed key={currentFeed} apiEndpoint={getApiEndpoint()} userId={user._id} />

                {/* Floating Action Button */}
                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
                    onClick={() => setOpen(true)}
                >
                    <AddIcon />
                </Fab>

                {/* Dialog for creating a new post */}
                <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                    <DialogTitle>New Post</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="new-post"
                            label="What's on your mind?"
                            type="text"
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={4}
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={() => {}} color="primary">
                            Post
                        </Button>
                    </DialogActions>
                </Dialog>

            </Box>
        </Box>
    );
}
