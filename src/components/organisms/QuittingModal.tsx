import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  name: string;
  open: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
}

export default function QuittingModal({
  name,
  open,
  handleCancel,
  handleConfirm,
}: Props) {
  return (
    <Dialog open={open}>
      <DialogTitle>Quit {name}</DialogTitle>
      <DialogContent>Are you sure you want to quit?</DialogContent>
      <DialogActions>
        <Button color="primary" variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button color="primary" variant="outlined" onClick={handleConfirm}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
