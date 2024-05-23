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
import { PerformanceTypeMasterResponseIF } from '@repo/types/performanceTypeMaster';

const PerformanceManagementList = ({
  actions,
  resource,
}: BaseComponentProps) => {
  return (
    <List
      title="演出管理　一覧"
      actions={<ListToolBar isShowCreate={validRole('create', actions)} />}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="no" label="No" />
        <TextField source="name" label="演出名" />
        <TextField source="id" label="演出ID" />
        <FunctionField
          label="演出種別ID"
          render={({
            performanceTypeMaster,
          }: {
            performanceTypeMaster: PerformanceTypeMasterResponseIF;
          }) => {
            return `${performanceTypeMaster.id} : ${performanceTypeMaster.typeName}`;
          }}
        />

        <TextField source="createdAt" label="登録日" />
        {validRole('delete', actions) && (
          <DeleteWithConfirmButton
            confirmContent="よろしいですか?"
            confirmTitle="削除"
            label="削除"
            confirmColor="warning"
          ></DeleteWithConfirmButton>
        )}
        {validRole('edit', actions) && <EditButton label="編集"></EditButton>}
      </Datagrid>
    </List>
  );
};

export default PerformanceManagementList;
