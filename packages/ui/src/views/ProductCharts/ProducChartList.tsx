import { List, Datagrid, TextField, DateField, SearchInput } from 'react-admin';

const productFilters = [<SearchInput key={1} source="name" alwaysOn />];

const ProductChartList = () => {
  return (
    <List filters={productFilters}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="id" />
        <TextField source="name" />
        <DateField source="created" showTime format="YYYY/MM/DD HH:mm" />
        <DateField source="updated" showTime format="YYYY/MM/DD HH:mm" />
      </Datagrid>
    </List>
  );
};

export default ProductChartList;
