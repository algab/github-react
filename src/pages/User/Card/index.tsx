import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import BookIcon from '@material-ui/icons/Book';
import StarIcon from '@material-ui/icons/Star';
import GitHubIcon from '@material-ui/icons/GitHub';
import { format } from 'date-fns';

import { UserGithub } from '../../../utils/types';

import { DivCard, CardHeader, ImgUser, NickUser } from './styles';

interface Props {
  user: UserGithub;
  openRepository(): void;
  openStar(): void;
  openLink(): void;
}

const UserCard: React.FC<Props> = ({ user, openRepository, openStar, openLink }) => {
  return (
    <DivCard>
      <Card>
        <CardHeader>
          <ImgUser alt="Profile Photo" src={user?.avatar_url} />
          <NickUser>
            <Typography>{user?.login}</Typography>
          </NickUser>
        </CardHeader>
        <CardContent>
          <List>
            {user?.name !== null && (
              <ListItem divider>
                <ListItemText primary="Nome" secondary={user?.name} />
              </ListItem>
            )}
            {user?.email !== null && (
              <ListItem divider>
                <ListItemText primary="E-mail" secondary={user?.email} />
              </ListItem>
            )}
            {user?.location !== null && (
              <ListItem divider>
                <ListItemText primary="Local" secondary={user?.location} />
              </ListItem>
            )}
            <ListItem divider>
              <ListItemText primary="Seguidores" secondary={user?.followers} />
            </ListItem>
            <ListItem divider>
              <ListItemText primary="Seguindo" secondary={user?.following} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Conta Criada"
                secondary={format(new Date(user.created_at), 'dd/MM/yyyy')}
              />
            </ListItem>
          </List>
        </CardContent>
        <CardActions>
          <Button size="medium" startIcon={<BookIcon />} onClick={openRepository}>
            Repositórios
          </Button>
          <Button size="medium" startIcon={<StarIcon />} onClick={openStar}>
            Stars
          </Button>
          <Button size="medium" startIcon={<GitHubIcon />} onClick={openLink}>
            Github
          </Button>
        </CardActions>
      </Card>
    </DivCard>
  );
};

export default UserCard;
