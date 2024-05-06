import {
  List,
  Datagrid,
  TextField,
  EditButton,
  FunctionField,
} from 'react-admin';
import { BaseComponentProps } from '@repo/types/general';
import { validRole } from '../_core/permissions';
import { ListToolBar } from '@repo/ui/src/components/ListToolBar';
import { formatDateAcstar } from '@repo/utils/dateFormat';

const MasterList = ({ actions, resource }: BaseComponentProps) => {
  return (
    <List
      title="アプリケーションマスタ　一覧"
      actions={<ListToolBar isShowCreate={validRole('create', actions)} />}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="no" label="No" />
        <TextField source="appName" label="アプリケーション名" />
        <TextField source="id" label="アプリケーションID" />
        <TextField source="packageName" label="バンドルID/パッケージ名" />

        <FunctionField
          label="登録日"
          render={({ createdAt }: { createdAt: string }) => {
            return formatDateAcstar(createdAt);
          }}
        />
        {validRole('edit', actions) && <EditButton label="編集"></EditButton>}
      </Datagrid>
    </List>
  );
};

export default MasterList;
