import React from 'react';
import { Button, Card, CardActions, Typography } from '@material-ui/core';

import { ListUser } from '../../../utils/types';

import { CardHeader, ImgUser, NickUser } from './styles';

interface Props {
  user: ListUser;
  selectUser(login: string): void;
};

const HomeCard: React.FC<Props> = ({ user, selectUser }) => {
  return (
    <Card>
      <CardHeader>
        <ImgUser alt="Profile Photo" src={user.avatar_url} />
        <NickUser>
          <Typography>{user.login}</Typography>
        </NickUser>
      </CardHeader>
      <CardActions>
        <Button size="small" color="primary" onClick={() => selectUser(user.login)}>
          Visualizar
        </Button>
      </CardActions>
    </Card>
  )
};

export default HomeCard;
