"use client"; 
import * as React from 'react';
import BotCard from './BotCard';
import { Box, Button, Container, Fade} from '@mui/material';
import Grid from '@mui/material/Grid2';


interface BotCardsProps {
    numberOfBotsAp: number;
  }

export default function BotCards({ numberOfBotsAp }: BotCardsProps) {
    const [numberOfBots, setNumberOfBots] = React.useState<number>(numberOfBotsAp);
    React.useEffect(() => {
        setNumberOfBots(numberOfBotsAp);
      }, [numberOfBotsAp]);



    return (
        <Box sx={{marginTop: "10px"}}>
          <Grid container spacing={2}>
            {Array.from({ length: numberOfBots }).map((_, index) => (

              <Grid size={4}  key={`bot-card-${index}`}>
                    <BotCard botName={`bot-card-${index}`}
                    online={Math.floor(Math.random() * 100) % 2 == 0? true:false} /> 
              </Grid>
            ))}
          </Grid>
          </Box>
    );


}
