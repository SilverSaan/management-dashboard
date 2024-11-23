import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IconButton, Badge, Avatar, List, ListItem, ListItemAvatar, ListItemText, ListItemButton, Box } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { purple } from '@mui/material/colors';


function notificationsLabel(count: number) {
    if (count === 0) {
        return 'no notifications';
    }
    if (count > 99) {
        return 'more than 99 notifications';
    }
    return `${count} notifications`;
}

export default function Notifications() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>

      <IconButton aria-describedby={id} aria-label={notificationsLabel(100)} color='inherit' onClick={handleClick}>

        <Badge color="secondary" badgeContent={90} 
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}>
            <MailIcon />
        </Badge>
        
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
      >
        <List >
            <ListItemButton>
                <ListItemAvatar>
                <Avatar sx={{ bgcolor: purple[200] }}>
                    H
                </Avatar>
                </ListItemAvatar>
                <ListItemText
                primary="Single-line item"
                secondary={'Secondary text'}
                />
            </ListItemButton>
            <ListItemButton>
                <ListItemAvatar>
                <Avatar sx={{ bgcolor: purple[200] }}>
                    E
                </Avatar>
                </ListItemAvatar>
                <ListItemText
                primary="Single-line item 2"
                secondary={'Secondary text'}
                />
            </ListItemButton>
            <ListItemButton>
                <ListItemAvatar>
                <Avatar sx={{ bgcolor: purple[200] }}>
                    L
                </Avatar>
                </ListItemAvatar>
                <ListItemText
                primary="Single-line item 3"
                secondary={'Secondary text'}
                />
            </ListItemButton>
            <ListItemButton>
                <ListItemAvatar>
                <Avatar sx={{ bgcolor: purple[200] }}>
                    P
                </Avatar>
                </ListItemAvatar>
                <ListItemText
                primary="Single-line item 3"
                secondary={'Secondary text'}
                />
            </ListItemButton>
            
        </List>
        <Box sx={{display:'flex',justifyContent: 'center'}}>
        <Button fullWidth >See More</Button>
        </Box>
      </Popover>
    </div>
  );
}