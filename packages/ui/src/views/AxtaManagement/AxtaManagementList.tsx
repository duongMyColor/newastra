import {
  List,
  Datagrid,
  TextField,
  EditButton,
  TopToolbar,
  CreateButton,
  DeleteWithConfirmButton,
  BooleanField,
  useRecordContext,
} from 'react-admin';
import { BaseComponentProps } from '@repo/types/general';
import { validRole } from '../_core/permissions';

const ToolBarAxtaManagement = ({ isShowCreate }: { isShowCreate: boolean }) => (
  <TopToolbar>{isShowCreate && <CreateButton label="新规作成" />}</TopToolbar>
);

const StatusTextField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  return (
    <>
      {record && record[source] === 'active' ? (
        <span style={{ color: 'green' }}>アクティブ</span>
      ) : (
        <span style={{ color: 'red' }}>非アクティブ</span>
      )}
    </>
  );
};

const AxtaManagementList = ({ actions, resource }: BaseComponentProps) => {
  return (
    <List
      title="アクスタ管理　一覧"
      actions={
        <ToolBarAxtaManagement isShowCreate={validRole('create', actions)} />
      }
    >
      <Datagrid rowClick="show">
        <TextField source="id" label="No" />
        <TextField source="managementName" label="管理名" />
        <TextField source="acstaName" label="アクスタ名称" />
        <TextField source="acstaId" label="アクスタID" />
        <StatusTextField source="status"></StatusTextField>

        <TextField source="dateStart" label="公開開始日" />
        <TextField source="dateEnd" label="公開終了日" />
        <TextField source="dataRegistration" label="登録日" />
        {validRole('delete', actions) && (
          <DeleteWithConfirmButton label="アカウント削除"></DeleteWithConfirmButton>
        )}
        {validRole('edit', actions) && <EditButton label="編集"></EditButton>}
      </Datagrid>
    </List>
  );
};

export default AxtaManagementList;
