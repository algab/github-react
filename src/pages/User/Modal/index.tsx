import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
} from '@material-ui/core';

import { Repository } from '../../../utils/types';

interface Props {
  name: string;
  open: boolean;
  handleClose(): void;
  data: Repository[];
}

const UserModal: React.FC<Props> = ({ name, open, handleClose, data }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{name}</DialogTitle>
      <DialogContent>
        {data.length !== 0 && (
          <List>
            {data.map((repo: Repository, index: number) => (
              <ListItem key={index} divider>
                <div>
                  <p>Nome: {repo.name}</p>
                  <p>Github: {repo.full_name}</p>
                  {repo.language !== null && <p>Linguagem: {repo.language}</p>}
                </div>
              </ListItem>
            ))}
          </List>
        )}
        {data.length === 0 && <p>Nenhum repositório disponível.</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
