
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

/**
 * Custom styled switch component for iOS-like toggle switch.
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.isSwitched - Current state of the switch.
 * @param {function} props.setIsSwitched - Function to update the state of the switch.
 * @returns {JSX.Element} - SwitchButton component.
 */
const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#1460d1' : '#1460d1',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));
/**
 * SwitchButton component.
 * @param {Object} props - Component props.
 * @param {boolean} props.isSwitched - Current state of the switch.
 * @param {function} props.setIsSwitched - Function to update the state of the switch.
 * @returns {JSX.Element} - SwitchButton component.
 */
const SwitchButton = ({ isSwitched, setIsSwitched }) => {
    return (<>
        <FormControlLabel
        
            control={<IOSSwitch checked={isSwitched} sx={{ mt: 1, mb: 0, mr: -2 }} />}
            label=""
            onClick={() => setIsSwitched(prev=>!prev)}
        />

    </>
    );
}

export default SwitchButton;