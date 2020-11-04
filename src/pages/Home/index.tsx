import React, { useState, ChangeEvent } from 'react';
import { CircularProgress, Container, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import { ListUser } from '../../utils/types';
import github from '../../assets/img/Octocat.png';

import HomeCard from './Card';
import HomeInput from './Input';

import { Progress, InfoSearch, LogoGithub } from './styles';

const Home: React.FC = () => {
  const [nick, setNick] = useState<string>('');
  const [users, setUsers] = useState<ListUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();

  const handleNick = (event: ChangeEvent<HTMLInputElement>) => {
    setNick(event.target.value);
  };

  const searchUsers = async () => {
    setLoading(true);
    const response = await api.get(`/search/users?q=${nick}&per_page=6`);
    setUsers(response.data.items);
    setLoading(false);
  };

  const selectUser = (login: string) => {
    history.push(`/${login}`);
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HomeInput handleNick={handleNick} searchUsers={searchUsers} />
        </Grid>
        {
          loading && (
            <Progress>
              <CircularProgress />
            </Progress>
          )
        }
        {
          !loading && users.length !== 0 && users.map((user: ListUser) => (
            <Grid item xs={12} md={6} key={user.login}>
              <HomeCard user={user} selectUser={selectUser} />
            </Grid>
          ))
        }
        {
          !loading && users.length === 0 && (
            <InfoSearch>
              <LogoGithub alt="Github Logo" src={github} />
              <p>Pesquise por um usuário válido do Github</p>
            </InfoSearch>
          )
        }
      </Grid>
    </Container>
  )
};

export default Home;
