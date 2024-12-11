import { Box, Typography, ImageList, ImageListItem } from '@mui/material';

const Result = ({ result }) => {
    if (!result) return null;

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Результат:</Typography>
            {result.processed_image_base64 && (
                <Box sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
                    <img
                        src={`data:image/jpeg;base64,${result.processed_image_base64}`}
                        alt="Processed Image"
                        style={{
                            width: '100%', // Занимает всю ширину контейнера
                            height: 'auto', // Автоматически подстраивает высоту
                            display: 'block', // Убирает лишние отступы
                        }}
                        loading="lazy"
                    />
                </Box>
            )}
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Детекции:</Typography>
                {result.detections.map((detection, index) => (
                    <Box key={index} sx={{ mb: 1 }}>
                        <Typography variant="body1">
                            Класс: {detection.class}, Уверенность: {detection.confidence.toFixed(2)}
                        </Typography>
                        <Typography variant="body2">
                            Координаты: xmin={detection.xmin}, ymin={detection.ymin}, xmax={detection.xmax}, ymax={detection.ymax}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Result;