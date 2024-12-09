import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Button, Card, CardMedia, CircularProgress } from '@mui/material';

const DropzoneComponent = ({ onDrop, onSubmit }) => {
    const [previewImage, setPreviewImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onDropCallback = useCallback(
        (acceptedFiles) => {
            onDrop(acceptedFiles);
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewImage(reader.result);
                };
                reader.readAsDataURL(file);
            }
        },
        [onDrop]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDropCallback });

    const handleSubmit = () => {
        setIsLoading(true);
        onSubmit(previewImage).finally(() => setIsLoading(false));
    };

    return (
        <Box>
            <Box
                {...getRootProps()}
                sx={{
                    border: '2px dashed #cccccc',
                    borderRadius: '4px',
                    padding: '40px', // Увеличиваем размер зоны загрузки
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: isDragActive ? '#f0f0f0' : 'transparent',
                }}
            >
                <input {...getInputProps()} />
                <Typography variant="body1">
                    {isDragActive ? 'Отпустите файлы здесь...' : 'Перетащите файлы сюда или кликните, чтобы выбрать'}
                </Typography>
                <Button variant="outlined" sx={{ mt: 2 }}>
                    Выбрать файл
                </Button>
            </Box>
            {previewImage && (
                <Card sx={{ mt: 4 }}>
                    <CardMedia component="img" src={previewImage} alt="Preview" />
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isLoading}>
                            Распознать
                        </Button>
                    </Box>
                </Card>
            )}
            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}
        </Box>
    );
};

export default DropzoneComponent;