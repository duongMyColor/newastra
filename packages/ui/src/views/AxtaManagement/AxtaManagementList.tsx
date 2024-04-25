import {
  List,
  Datagrid,
  TextField,
  EditButton,
  TopToolbar,
  CreateButton,
  DeleteWithConfirmButton,
} from 'react-admin';
import { BaseComponentProps } from '@repo/types/general';
import { validRole } from '../_core/permissions';
import { StatusChipField } from '@repo/ui/src/components/CustomField/StatusChipField';

const ToolBarAxtaManagement = ({ isShowCreate }: { isShowCreate: boolean }) => (
  <TopToolbar>{isShowCreate && <CreateButton label="新规作成" />}</TopToolbar>
);

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
        <StatusChipField source="status" label="ステータス"></StatusChipField>

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
