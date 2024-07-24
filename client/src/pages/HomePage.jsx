import { useState } from "react";
import InfiniteScrollFeed from "../components/InfiniteScrollFeed";
import TopAppBar from "../components/TopAppBar";
import { Box, ButtonGroup, Button } from '@mui/material';


export default function HomePage() {

    const [currentFeed, setCurrentFeed] = useState('forYou')

    const getApiEndpoint = () => {
        switch (currentFeed) {
            case 'forYou':
                return '/api/for-you-feed';
            case 'discover':
                return '/api/discover-feed';
            case 'profile':
                return '/api/for-you-feed';
            default:
                return '/api/for-you-feed';
        }
    };

    return( 

        <Box>
            <TopAppBar />
            <Box sx={{ paddingTop: '64px', backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button onClick={() => setCurrentFeed('forYou')}>For You</Button>
                        <Button onClick={() => setCurrentFeed('discover')}>Discover</Button>
                        <Button onClick={() => setCurrentFeed('profile')}>Profile</Button>
                    </ButtonGroup>
                </Box>
                <InfiniteScrollFeed apiEndpoint={getApiEndpoint()} userId='66a1082ad0be79de9f426e8a' />
            </Box>
        </Box>

    );

}