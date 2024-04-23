import { Stack } from '@mui/material';
import { DeleteWithConfirmButton } from 'react-admin';

/**
 * DeleteButtonFlexEnd component for delete button
 * @returns
 */
const DeleteButtonFlexEnd = () => (
  <Stack
    direction="row"
    justifyContent="flex-end"
    alignItems="center"
    width="100%"
  >
    <DeleteWithConfirmButton label="Delete"></DeleteWithConfirmButton>
  </Stack>
);

export default DeleteButtonFlexEnd;
