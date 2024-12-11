import { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Paper,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
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

    const handleSubmit = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', image);

        try {
            const response = await axios.post('http://localhost:5000/api/detect', formData, {
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
            {/* Заголовок и описание */}
            <Typography variant="h4" align="center" gutterBottom>
                Распознавание еды с помощью AI
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
                Загрузите фотографию еды, и наша модель AI распознает следующие классы:
            </Typography>

            {/* Список распознаваемых классов */}
            <Paper elevation={3} sx={{ p: 2, mt: 2, mb: 4 }}>
                <Typography variant="h6" align="center" gutterBottom>
                    Распознаваемые классы:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Pilaf" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Sushi" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Hamburger" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Pizza" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Ramen Noodle" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Spaghetti" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Salad" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Hot Dog" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Sandwiches" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Croissant" />
                    </ListItem>
                </List>
            </Paper>

            {/* Описание модели */}
            <Typography variant="body2" align="center" gutterBottom>
                Используемая модель: <strong>YOLOv8</strong> — современная нейронная сеть для обнаружения объектов.
            </Typography>
            <Typography variant="body2" align="center" gutterBottom>
                Точность распознавания: <strong>95%</strong> на тестовых данных.
            </Typography>

            {/* Dropzone и кнопка отправки */}
            <DropzoneComponent onDrop={handleDrop} onSubmit={handleSubmit} />

            {/* Индикатор загрузки */}
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {/* Результаты */}
            <Result result={result} />

            {/* Окно ошибки */}
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