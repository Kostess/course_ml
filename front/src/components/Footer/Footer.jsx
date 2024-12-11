import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ p: 2, textAlign: 'center', backgroundColor: 'primary.main', color: 'white', mt: 'auto' }}>
            <Typography variant="body2">
                {`© ${new Date().getFullYear()} Food Detector. All rights reserved.`}
            </Typography>
        </Box>
    );
};

export default Footer;