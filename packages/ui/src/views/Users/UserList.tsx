import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteWithConfirmButton,
} from 'react-admin';
import { BaseComponentProps } from '@repo/types/general';
import { validRole } from '../_core/permissions';
import { ListToolBar } from '@repo/ui/src/components/ListToolBar';
import { CustomButtonByRole } from '@repo/ui/src/components/CustomButtonByRole';

const UserList = ({ actions, resource }: BaseComponentProps) => {
  return (
    <List
      title="管理ユーザー管理　一覧"
      actions={<ListToolBar isShowCreate={validRole('create', actions)} />}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="no" label="No" />
        <TextField source="username" label="CMS-ID" />
        <TextField source="date" label="最終ログイン" />
        <TextField source="role" label="権限" />
        <TextField source="email" label="メールアドレス" />
        {validRole('delete', actions) && (
          <CustomButtonByRole label="削除" source="role">
            <DeleteWithConfirmButton
              confirmContent="よろしいですか?"
              confirmTitle="削除"
              label="削除"
              confirmColor="warning"
            ></DeleteWithConfirmButton>
          </CustomButtonByRole>
        )}
        {validRole('edit', actions) && <EditButton label="編集"></EditButton>}
      </Datagrid>
    </List>
  );
};

export default UserList;
