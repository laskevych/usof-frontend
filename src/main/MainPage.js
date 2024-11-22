import React, {useEffect, useState} from 'react';
import PostList from '../post/PostList';
import Grid from "@mui/material/Grid2";
import {Box} from "@mui/material";
import Filters from "./Filters";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {Link as RouterLink} from "react-router-dom";
import axios from "axios";

function formatTimestamp(timestamp) {
    return (new Date(timestamp)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

const TopPostItem = ({post}) => {
    return (
        <ListItem alignItems="flex-start" component={RouterLink} to={`/posts/${post.id}/`} sx={{textDecoration: 'none', color: 'white'}}>
            <ListItemAvatar>
                <Avatar
                    alt={post.author.login}
                    key={post.author.id}
                    component={RouterLink} to={`/users/${post.author.id}/`}
                    src={'http://localhost:8080/profile-pictures/' + post.author.profilePicture}
                />
            </ListItemAvatar>
            <ListItemText primary={post.title} secondary={formatTimestamp(post.createdAt)}/>
        </ListItem>
    );
};


function MainPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchTopPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/posts/?isTop=1&sortBy=rating:desc&status=active`);
                setPosts(response.data.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchTopPosts();
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Grid container spacing={1}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <List sx={{ width: '100%'}}>
                        {posts.map((post, index) => (
                            (index === 0 || index === 1) && (<TopPostItem key={post.id} post={post} />)
                        ))}
                    </List>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <List sx={{ width: '100%'}}>
                        {posts.map((post, index) => (
                            (index === 2 || index === 3) && (<TopPostItem key={post.id} post={post} />)
                        ))}
                    </List>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Filters/>
                <PostList/>
            </Grid>
        </Box>

    );
}

export default MainPage;