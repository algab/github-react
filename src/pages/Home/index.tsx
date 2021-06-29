import React, { useContext, useState, useEffect } from 'react';
import { CircularProgress, Container, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import NotFound from '../../components/NotFound';
import ToastContext from '../../contexts/Toast';
import api from '../../services/api';
import { ListUser } from '../../utils/types';

import HomeCard from './Card';
import HomeInput from './Input';

import { Progress } from './styles';

const Home: React.FC = () => {
  const [nick, setNick] = useState<string>();
  const [users, setUsers] = useState<ListUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { handleToast, setMessage } = useContext<any>(ToastContext);

  const history = useHistory();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const searchUsers = async (): Promise<void> => {
      try {
        if (nick === undefined) {
          setUsers([]);
        } else {
          setLoading(true);
          const response = await api.get(`/search/users?q=${nick}&per_page=8`, {
            cancelToken: source.token,
          });
          setUsers(response.data.items);
          setLoading(false);
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          setLoading(false);
          setUsers([]);
          setMessage('Ocorreu um erro, tente novamente mais tarde.');
          handleToast(true);
        }
      }
    };
    searchUsers();
    return () => {
      source.cancel();
    };
  }, [nick, setMessage, handleToast]);

  const handleNick = (name: string): void => {
    setNick(name);
  };

  const selectUser = (login: string): void => {
    history.push(`/${login}`);
  };

  return (
    <Container maxWidth="md" style={{ height: '100%' }}>
      <Grid container spacing={3} style={{ height: '100%' }}>
        <Grid item xs={12}>
          <HomeInput handleNick={handleNick} />
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
