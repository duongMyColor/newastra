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
import { StatusChipField } from '@repo/ui/src/components/CustomField/StatusChipField';
import { ListToolBar } from '@repo/ui/src/components/ListToolBar';
import { formatDateAcstar } from '@repo/utils/dateFormat';

const AcstaManagementList = ({ actions, resource }: BaseComponentProps) => {
  return (
    <List
      title="アクスタ管理　一覧"
      actions={<ListToolBar isShowCreate={validRole('create', actions)} />}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="no" label="No" />
        <TextField source="managementName" label="管理名" />
        <TextField source="acstaName" label="アクスタ名称" />
        <TextField source="id" label="アクスタID" />
        <StatusChipField source="status" label="ステータス"></StatusChipField>

        <FunctionField
          label="公開開始日"
          render={({ dateStart }: { dateStart: string }) => {
            return formatDateAcstar(dateStart);
          }}
        />
        <FunctionField
          label="公開終了日"
          render={({ dateEnd }: { dateEnd: string }) => {
            return formatDateAcstar(dateEnd);
          }}
        />
        <FunctionField
          label="登録日"
          render={({ createdAt }: { createdAt: string }) => {
            return formatDateAcstar(createdAt);
          }}
        />

        {validRole('delete', actions) && (
          <DeleteWithConfirmButton
            confirmContent="よろしいですか?"
            confirmTitle="論理削除します"
            label="削除"
            confirmColor="warning"
          ></DeleteWithConfirmButton>
        )}
        {validRole('edit', actions) && <EditButton label="編集"></EditButton>}
      </Datagrid>
    </List>
  );
};

export default AcstaManagementList;
