import { useState } from 'react';
import { Container, Box, Typography, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import DropzoneComponent from '../DropzoneComponent/DropzoneComponent';
import Result from '../Result/Result';
import axios from 'axios';

const Main = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    const handleDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setImage(acceptedFiles[0]);
        }
    };

    const handleSubmit = async (imageData) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', imageData);

        try {
            const response = await axios.post('/api/detect', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(response.data);
        } catch (error) {
            setError(error.response?.data?.message || 'Произошла ошибка');
        } finally {
            setLoading(false);
        }
    };

    const handleCloseErrorDialog = () => {
        setError(null);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Загрузите фото еды
            </Typography>
            <DropzoneComponent onDrop={handleDrop} onSubmit={handleSubmit} />
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}
            <Result result={result} />
            <Dialog open={!!error} onClose={handleCloseErrorDialog}>
                <DialogTitle>Ошибка</DialogTitle>
                <DialogContent>
                    <DialogContentText>{error}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseErrorDialog} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Main;