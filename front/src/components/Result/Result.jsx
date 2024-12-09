import { Box, Typography } from '@mui/material';

const Result = ({ result }) => {
    if (!result) return null;

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Результат:</Typography>
            <Typography variant="body1">{result.message}</Typography>
        </Box>
    );
};

export default Result;