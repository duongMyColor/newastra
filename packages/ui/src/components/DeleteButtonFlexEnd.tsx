import { Stack } from '@mui/material';
import { DeleteWithConfirmButton } from 'react-admin';

/**
 * DeleteButtonFlexEnd component for delete button
 * @returns
 */
const DeleteButtonFlexEnd = ({ label }: { label: string }) => (
  <Stack
    direction="row"
    justifyContent="flex-end"
    alignItems="center"
    sx={{
      width: 'fit-content',
    }}
  >
    <DeleteWithConfirmButton label={label}></DeleteWithConfirmButton>
  </Stack>
);

export default DeleteButtonFlexEnd;
