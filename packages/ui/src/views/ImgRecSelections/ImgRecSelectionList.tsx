import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  EditButton,
  DeleteWithConfirmButton,
  BulkDeleteButton,
  SearchInput,
} from 'react-admin';

import { validRole } from '../_core/permissions';
import { BaseComponentProps } from '@repo/types/general';

const imgRecSelectionFilters = [
  <SearchInput key={1} source="name" alwaysOn placeholder="Search by name" />,
];

const ImgRecSelectionList = ({ actions, resource }: BaseComponentProps) => {
  const bulkActionButtons = validRole('delete', actions) ? (
    <BulkDeleteButton />
  ) : (
    false
  );

  return (
    <List filters={imgRecSelectionFilters}>
      <Datagrid rowClick="show" bulkActionButtons={bulkActionButtons}>
        <TextField source="id" />
        <TextField source="name" />
        <ShowButton label="Detail"></ShowButton>
        {validRole('edit', actions) ? (
          <EditButton label="Edit"></EditButton>
        ) : null}{' '}
        {validRole('delete', actions) ? (
          <DeleteWithConfirmButton label="Delete"></DeleteWithConfirmButton>
        ) : null}{' '}
      </Datagrid>
    </List>
  );
};

export default ImgRecSelectionList;
