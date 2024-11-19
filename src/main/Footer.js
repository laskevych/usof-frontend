import React from 'react';
import { Box, Typography } from '@mui/material';
import WebhookIcon from '@mui/icons-material/Webhook';

function Footer() {
    return (
        <Box sx={{ mt: 'auto', py: 2, textAlign: 'center', backgroundColor: '#f5f5f5', flex: 'row' }}>
            <WebhookIcon color="success" fontSize="large"/>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                © {new Date().getFullYear()} DevSync
            </Typography>
        </Box>
    );
}

export default Footer;