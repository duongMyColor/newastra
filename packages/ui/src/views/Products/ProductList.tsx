import { BaseComponentProps } from '@repo/types/general';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  BulkDeleteButton,
  BulkExportButton,
  SearchInput,
} from 'react-admin';
import { validRole } from '../_core/permissions';

const productFilters = [
  <SearchInput key={1} source="name" alwaysOn placeholder="Search by name" />,
];

const ProductList = ({ actions, resource }: BaseComponentProps) => {
  const bulkActionButtons = validRole('delete', actions) ? (
    <>
      <BulkExportButton />
      <BulkDeleteButton />
    </>
  ) : (
    false
  );

  return (
    <List filters={productFilters}>
      <Datagrid rowClick="show" bulkActionButtons={bulkActionButtons}>
        <TextField source="id" />
        <TextField source="name" />
        <DateField source="created" showTime format="YYYY/MM/DD HH:mm" />
        <DateField source="updated" showTime format="YYYY/MM/DD HH:mm" />
      </Datagrid>
    </List>
  );
};

export default ProductList;
