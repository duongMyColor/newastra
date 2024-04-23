import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteWithConfirmButton,
  ShowButton,
} from 'react-admin';

const UserList = () => {
  return (
    <List>
      <Datagrid rowClick="show">
        <TextField source="id" />
        <TextField source="username" />
        <TextField source="role" />
        <ShowButton label="Detail"></ShowButton>
        <EditButton label="Edit"></EditButton>
        <DeleteWithConfirmButton label="Delete"></DeleteWithConfirmButton>
      </Datagrid>
    </List>
  );
};

export default UserList;
