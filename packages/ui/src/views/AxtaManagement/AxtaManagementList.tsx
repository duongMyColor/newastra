import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteWithConfirmButton,
} from 'react-admin';
import { BaseComponentProps } from '@repo/types/general';
import { validRole } from '../_core/permissions';
import { StatusChipField } from '@repo/ui/src/components/CustomField/StatusChipField';
import { ListToolBar } from '@repo/ui/src/components/ListToolBar';

const AxtaManagementList = ({ actions, resource }: BaseComponentProps) => {
  return (
    <List
      title="アクスタ管理　一覧"
      actions={<ListToolBar isShowCreate={validRole('create', actions)} />}
    >
      <Datagrid rowClick="show">
        <TextField source="id" label="No" />
        <TextField source="managementName" label="管理名" />
        <TextField source="acstaName" label="アクスタ名称" />
        <TextField source="acstaId" label="アクスタID" />
        <StatusChipField source="status" label="ステータス"></StatusChipField>

        <TextField source="dateStart" label="公開開始日" />
        <TextField source="dateEnd" label="公開終了日" />
        <TextField source="createdAt" label="登録日" />
        {validRole('delete', actions) && (
          <DeleteWithConfirmButton label="アカウント削除"></DeleteWithConfirmButton>
        )}
        {validRole('edit', actions) && <EditButton label="編集"></EditButton>}
      </Datagrid>
    </List>
  );
};

export default AxtaManagementList;
