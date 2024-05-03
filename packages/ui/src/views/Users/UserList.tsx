import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteWithConfirmButton,
  ShowButton,
  TopToolbar,
  CreateButton,
  useShowContext,
  useRecordContext,
} from 'react-admin';
import { Box } from '@mui/material';
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
      <Datagrid rowClick="show">
        <TextField source="no" label="No" />
        <TextField source="username" label="CMS-ID" />
        <TextField source="date" label="最縤ログイン" />
        <TextField source="role" label="筧昭" />
        <TextField source="email" label="メールアドレス" />
        {validRole('edit', actions) && <EditButton label="編集"></EditButton>}
        {validRole('delete', actions) && (
          <CustomButtonByRole label="データ削除">
            <DeleteWithConfirmButton
              confirmContent="よろしいですか?"
              confirmTitle="論理削除します"
              label="データ削除"
              confirmColor="warning"
            ></DeleteWithConfirmButton>
          </CustomButtonByRole>
        )}
      </Datagrid>
    </List>
  );
};

export default UserList;
