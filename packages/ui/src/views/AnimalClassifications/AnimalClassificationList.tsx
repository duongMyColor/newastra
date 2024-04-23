import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  EditButton,
  DeleteWithConfirmButton,
  BulkDeleteButton,
  BulkExportButton,
} from 'react-admin';
import { validRole } from '../_core/permissions';
import { BaseComponentProps } from '@repo/types/general';

const AnimalClassificationList = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const bulkActionButtons = validRole('delete', actions) ? (
    <>
      <BulkExportButton />
      <BulkDeleteButton />
    </>
  ) : (
    false
  );

  return (
    <List>
      <Datagrid rowClick="show" bulkActionButtons={bulkActionButtons}>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="animalCount" />
        <ShowButton label="Detail"></ShowButton>

        {validRole('edit', actions) ? (
          <EditButton label="Edit"></EditButton>
        ) : null}
        {validRole('delete', actions) ? (
          <DeleteWithConfirmButton label="Delete"></DeleteWithConfirmButton>
        ) : null}
      </Datagrid>
    </List>
  );
};

export default AnimalClassificationList;
