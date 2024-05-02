import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteWithConfirmButton,
  ShowButton,
  TopToolbar,
  CreateButton,
} from 'react-admin';
import { Box } from '@mui/material';
import { BaseComponentProps } from '@repo/types/general';
import { validRole } from '../_core/permissions';
import { ListToolBar } from '@repo/ui/src/components/ListToolBar';

const UserList = ({ actions, resource }: BaseComponentProps) => {
  return (
    <List
      title="管理ユーザー管理　一覧"
      actions={<ListToolBar isShowCreate={validRole('create', actions)} />}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="id" label="No" />
        <TextField source="username" label="CMS-ID" />
        <TextField source="date" label="最縤ログイン" />
        <TextField source="role" label="筧昭" />
        <TextField source="email" label="メールアドレス" />
        {validRole('edit', actions) && <EditButton label="編集"></EditButton>}
        {validRole('delete', actions) && (
          <DeleteWithConfirmButton label="アカウント削除"></DeleteWithConfirmButton>
        )}
      </Datagrid>
    </List>
  );
};

export default UserList;
