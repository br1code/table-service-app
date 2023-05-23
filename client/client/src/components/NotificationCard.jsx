import React from 'react';
import { Card, CardContent } from '@mui/material';

const NotificationCard = ({ title, description }) => {
    return (
      <Card sx={{margin: 1}}>
        <CardContent>
          <h2>Mesa: {title}</h2>
          <p>{description}</p>
        </CardContent>
      </Card>
    );
  };

export default NotificationCard;