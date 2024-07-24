import { useState, useContext } from "react";
import InfiniteScrollFeed from "../components/InfiniteScrollFeed";
import TopAppBar from "../components/TopAppBar";
import { Box, ButtonGroup, Button } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

export default function HomePage() {
    const [currentFeed, setCurrentFeed] = useState('forYou');
    const { user } = useContext(AuthContext);

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

    if (!user) {
        return <Box>Loading...</Box>;
    }

    return (
        <Box>
            <TopAppBar />
            <Box sx={{ paddingTop: '64px', backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button onClick={() => setCurrentFeed('forYou')}>For You</Button>
                        <Button onClick={() => setCurrentFeed('discover')}>Discover</Button>
                    </ButtonGroup>
                </Box>
                <InfiniteScrollFeed key={currentFeed} apiEndpoint={getApiEndpoint()} userId={user._id} />
            </Box>
        </Box>
    );
}
