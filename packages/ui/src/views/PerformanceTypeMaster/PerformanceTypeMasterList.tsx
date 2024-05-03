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
import { formatDateAcstar } from '@repo/utils/dateFormat';

const PerformanceTypeMasterList = ({
  actions,
  resource,
}: BaseComponentProps) => {
  return (
    <List
      title="演出種別マスタ　一覧"
      actions={<ListToolBar isShowCreate={validRole('create', actions)} />}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="no" label="No" />
        <TextField source="typeName" label="演出種別名" />
        <TextField source="id" label="演出種別ID" />

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
            label="データ削除"
            confirmColor="warning"
          ></DeleteWithConfirmButton>
        )}
        {validRole('edit', actions) && <EditButton label="編集"></EditButton>}
      </Datagrid>
    </List>
  );
};

export default PerformanceTypeMasterList;
