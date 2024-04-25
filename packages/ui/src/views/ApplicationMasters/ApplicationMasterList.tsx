import {
  List,
  Datagrid,
  TextField,
  EditButton,
  TopToolbar,
  CreateButton,
} from 'react-admin';
import { BaseComponentProps } from '@repo/types/general';
import { validRole } from '../_core/permissions';

const ToolBarMaster = ({ isShowCreate }: { isShowCreate: boolean }) => (
  <TopToolbar>{isShowCreate && <CreateButton label="新规作成" />}</TopToolbar>
);

const MasterList = ({ actions, resource }: BaseComponentProps) => {
  return (
    <List
      title="アプリケーションマスタ　一覧"
      actions={<ToolBarMaster isShowCreate={validRole('create', actions)} />}
    >
      <Datagrid rowClick="show">
        <TextField source="id" label="No" />
        <TextField source="appName" label="アプリケーション名" />
        <TextField source="appId" label="アプリケーションID" />
        <TextField source="packageName" label="バンドルID/パッケージ名" />
        <TextField source="date" label="登録日" />
        {validRole('edit', actions) && <EditButton label="編集"></EditButton>}
      </Datagrid>
    </List>
  );
};

export default MasterList;
