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

const PerformanceManagementList = ({
  actions,
  resource,
}: BaseComponentProps) => {
  return (
    <List
      title="演出管理　一覧"
      actions={
        <ToolBarAxtaManagement isShowCreate={validRole('create', actions)} />
      }
    >
      <Datagrid rowClick="show">
        <TextField source="id" label="No" />
        <TextField source="performanceName" label="演出名" />
        <TextField source="productId" label="演出ID" />
        <TextField source="performanceTypeId" label="演出種別ID" />

        <TextField source="dateRegistration" label="登録日" />
        {validRole('delete', actions) && (
          <DeleteWithConfirmButton label="アカウント削除"></DeleteWithConfirmButton>
        )}
        {validRole('edit', actions) && <EditButton label="編集"></EditButton>}
      </Datagrid>
    </List>
  );
};

export default PerformanceManagementList;
