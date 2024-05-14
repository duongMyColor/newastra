import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteWithConfirmButton,
  FunctionField,
} from 'react-admin';
import { BaseComponentProps } from '@repo/types/general';
import { validRole } from '../_core/permissions';
import { ListToolBar } from '@repo/ui/src/components/ListToolBar';
import { CustomButtonByRole } from '@repo/ui/src/components/CustomButtonByRole';
import { formatDateAcstar } from '@repo/utils/dateFormat';

const UserList = ({ actions, resource }: BaseComponentProps) => {
  return (
    <List
      title="管理ユーザー管理　一覧"
      actions={<ListToolBar isShowCreate={validRole('create', actions)} />}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="no" label="No" />
        <TextField source="username" label="CMS-ID" />
        <FunctionField
          label="公開開始日"
          render={({ lastLogin }: { lastLogin: string }) => {
            return formatDateAcstar(lastLogin);
          }}
        />
        <TextField source="role" label="権限" />
        <TextField source="email" label="メールアドレス" />
        {validRole('delete', actions) && (
          <CustomButtonByRole source="role">
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
