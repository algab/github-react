import React, { useContext, useEffect, useState } from 'react';
import { Container, CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import NotFound from '../../components/NotFound';
import ToastContext from '../../contexts/Toast';
import api from '../../services/api';
import { UserGithub, Repository } from '../../utils/types';

import UserCard from './Card';
import UserModal from './Modal';

import { Progress } from './styles';

interface UserProps {
  name: string;
};

const User: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserGithub | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [stars, setStars] = useState<Repository[]>([]);
  const [dialogRepository, setDialogRepository] = useState(false);
  const [dialogStar, setDialogStar] = useState(false);

  const { handleToast, setMessage } = useContext<any>(ToastContext);

  const params = useParams<UserProps>();

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        const response = await api.get(`/users/${params.name}`);
        if (response.status === 200) {
          const result = await axios.all([
            api.get(`/users/${params.name}/repos`),
            api.get(`/users/${params.name}/starred`)
          ]);
          setRepositories(result[0].data);
          setStars(result[1].data);
        }
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);        
        setLoading(false);
        setMessage('Usuário não encontrado.');
        handleToast(true);
      }
    }
    getUser();
  }, [params, handleToast, setMessage]);

  const openLink = () => {
    if (user?.html_url) {
      window.open(user?.html_url, '_blank');
    }
  };

  return (
    <>
      <Container maxWidth="md">
        {loading && (
          <Progress>
            <CircularProgress />
          </Progress>
        )}
        {!loading && user === null && <NotFound />}
        {!loading && user !== null && (
          <UserCard
            user={user}
            openRepository={() => setDialogRepository(true)}
            openStar={() => setDialogStar(true)}
            openLink={openLink}
          />
        )}
      </Container>
      <UserModal
        name="Repositórios"
        open={dialogRepository}
        data={repositories}
        handleClose={() => setDialogRepository(!dialogRepository)}
      />
      <UserModal
        name="Stars"
        open={dialogStar}
        data={stars}
        handleClose={() => setDialogStar(!dialogStar)}
      />
    </>
  )
};

export default User;
