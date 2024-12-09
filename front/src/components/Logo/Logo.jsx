import { Typography } from '@mui/material';
import logo from '../../assets/logo.svg';

const Logo = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Food Detector Logo" style={{ marginRight: '8px', width: '48px', height: '48px' }} />
            <Typography variant="h6" component="div">
                Food Detector
            </Typography>
        </div>
    );
};

export default Logo;