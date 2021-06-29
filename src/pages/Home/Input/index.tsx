import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import Search from '@material-ui/icons/Search';

import { InputSearch } from './styles';

interface Props {
  handleNick(name: string): void;
}

const HomeInput: React.FC<Props> = ({ handleNick }) => {
  const [nick, setNick] = useState<string>('');

  const pressEnter = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      handleNick(nick);
    }
  };

  return (
    <InputSearch>
      <TextField
        label="Pesquisar Usuário"
        variant="outlined"
        onChange={(event: ChangeEvent<HTMLInputElement>) => setNick(event.target.value)}
        onKeyDown={pressEnter}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={() => handleNick(nick)}>
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
