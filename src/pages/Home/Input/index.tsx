import React, { ChangeEvent, KeyboardEvent } from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import Search from '@material-ui/icons/Search';

import { InputSearch } from './styles';

interface Props {
  handleNick(event: ChangeEvent<HTMLInputElement>): void;
  searchUsers(): void;
}

const HomeInput: React.FC<Props> = ({ handleNick, searchUsers }) => {
  const pressEnter = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      searchUsers();
    }
  };

  return (
    <InputSearch>
      <TextField
        label="Pesquisar Usuário"
        variant="outlined"
        onChange={handleNick}
        onKeyDown={pressEnter}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={searchUsers}>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
      />
    </InputSearch>
  );
};

export default HomeInput;
