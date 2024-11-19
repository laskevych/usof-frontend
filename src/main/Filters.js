import React, { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, TextField, Checkbox, ListItemText, OutlinedInput } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid2";
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink } from 'react-router-dom';


function Filters() {
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [status, setStatus] = useState('');
    const [createdAtStart, setcreatedAtStart] = useState('');
    const [createdAtEnd, setcreatedAtEnd] = useState('');
    const [sortBy, setSortBy] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/categories/');
                setCategories(response.data.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();

        const queryParams = new URLSearchParams(location.search);
        setStatus(queryParams.get('status') || '');
        setSelectedCategories(queryParams.get('categories') ? queryParams.get('categories').split(',') : []);
        setcreatedAtStart(queryParams.get('createdAtStart') || '');
        setcreatedAtEnd(queryParams.get('createdAtEnd') || '');
        setSortBy(queryParams.get('sortBy') || '');
    }, [location]);

    const handleFilterApply = () => {
        const queryParams = new URLSearchParams();

        if (status) queryParams.set('status', status);
        if (selectedCategories.length > 0) queryParams.set('categories', selectedCategories.join(','));
        if (createdAtStart) queryParams.set('createdAtStart', createdAtStart);
        if (createdAtEnd) queryParams.set('createdAtEnd', createdAtEnd);
        if (sortBy) queryParams.set('sortBy', sortBy);

        navigate(`/?${queryParams.toString()}`);
    };

    const handleFilterReset = () => {
        setStatus('');
        setSelectedCategories([]);
        setcreatedAtStart('');
        setcreatedAtEnd('');
        setSortBy('');
        navigate('/');
    };

    return (
        <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ mb: 2 }}>
                <Button fullWidth variant="contained" color="success" startIcon={<AddIcon />}
                        component={RouterLink}
                        to="/posts/create">
                    Create post
                </Button>
            </Box>
            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 2 }}>
                    <FormControl size="small" fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={status}
                            label="Status"
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value="">Any</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 2 }}>
                    <FormControl size="small" fullWidth>
                        <InputLabel>Categories</InputLabel>
                        <Select
                            multiple
                            value={selectedCategories}
                            onChange={(e) => setSelectedCategories(e.target.value)}
                            input={<OutlinedInput label="Categories" />}
                            renderValue={(selected) =>
                                categories
                                    .filter((cat) => selected.includes(String(cat.id)))
                                    .map((cat) => cat.title)
                                    .join(', ')
                            }
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={String(category.id)}>
                                    <Checkbox checked={selectedCategories.includes(String(category.id))} />
                                    <ListItemText primary={category.title} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 2 }}>
                    <FormControl size="small" fullWidth>
                        <TextField
                            label="Creation Date Start"
                            type="date"
                            value={createdAtStart}
                            onChange={(e) => setcreatedAtStart(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                    <FormControl size="small" fullWidth>
                        <TextField
                            label="Creation Date End"
                            type="date"
                            value={createdAtEnd}
                            onChange={(e) => setcreatedAtEnd(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <FormControl size="small" fullWidth>
                        <InputLabel>Sort</InputLabel>
                        <Select
                            value={sortBy}
                            label="Sort By"
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="createdAt:asc">Creation Date ↑</MenuItem>
                            <MenuItem value="createdAt:desc">Creation Date ↓</MenuItem>
                            <MenuItem value="likes:asc">Likes ↑</MenuItem>
                            <MenuItem value="likes:desc">Likes ↓</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button fullWidth variant="contained" color="success" onClick={handleFilterApply}>
                        Apply
                    </Button>
                    <Button fullWidth variant="outlined" color="success" onClick={handleFilterReset}>
                        Reset
                    </Button>
                </Box>
            </Box>
        </Grid>
    );
}

export default Filters;