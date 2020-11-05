import React, { ChangeEvent, useContext, useState } from 'react';
import { CircularProgress, Container, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import NotFound from '../../components/NotFound';
import ToastContext from '../../contexts/Toast';
import api from '../../services/api';
import { ListUser } from '../../utils/types';

import HomeCard from './Card';
import HomeInput from './Input';

import { Progress } from './styles';

const Home: React.FC = () => {
  const [nick, setNick] = useState<string>('');
  const [users, setUsers] = useState<ListUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { handleToast, setMessage } = useContext<any>(ToastContext);

  const history = useHistory();

  const handleNick = (event: ChangeEvent<HTMLInputElement>): void => {
    setNick(event.target.value);
  };

  const searchUsers = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await api.get(`/search/users?q=${nick}&per_page=6`);
      setUsers(response.data.items);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setUsers([]);
      setMessage('Ocorreu um erro, tente novamente mais tarde.');
      handleToast(true);
    }
  };

  const selectUser = (login: string): void => {
    history.push(`/${login}`);
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HomeInput handleNick={handleNick} searchUsers={searchUsers} />
        </Grid>
        {loading && (
          <Progress>
            <CircularProgress />
          </Progress>
        )}
        {!loading &&
          users.length !== 0 &&
          users.map((user: ListUser) => (
            <Grid item xs={12} md={6} key={user.login}>
              <HomeCard user={user} selectUser={selectUser} />
            </Grid>
          ))}
        {!loading && users.length === 0 && <NotFound />}
      </Grid>
    </Container>
  );
};

export default Home;
