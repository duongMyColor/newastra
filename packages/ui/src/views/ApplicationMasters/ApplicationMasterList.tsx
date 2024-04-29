import {
  List,
  Datagrid,
  TextField,
  EditButton,
} from 'react-admin';
import { BaseComponentProps } from '@repo/types/general';
import { validRole } from '../_core/permissions';
import { ListToolBar } from '@repo/ui/src/components/ListToolBar';

const MasterList = ({ actions, resource }: BaseComponentProps) => {
  return (
    <List
      title="アプリケーションマスタ　一覧"
      actions={<ListToolBar isShowCreate={validRole('create', actions)} />}
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
