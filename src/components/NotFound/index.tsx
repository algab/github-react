import React from 'react';

import github from '../../assets/img/Octocat.png';

import { DivNotFound, LogoGithub } from './styles';

const NotFound: React.FC = () => (
  <DivNotFound>
    <LogoGithub alt="Github Logo" src={github} />
    <p>Pesquise por um usuário válido do Github</p>
  </DivNotFound>
);

export default NotFound;
