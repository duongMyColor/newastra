import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteWithConfirmButton,
} from 'react-admin';
import { BaseComponentProps } from '@repo/types/general';
import { validRole } from '../_core/permissions';
import { ListToolBar } from '@repo/ui/src/components/ListToolBar';

const PerformanceTypeMasterList = ({
  actions,
  resource,
}: BaseComponentProps) => {
  return (
    <List
      title="演出種別マスタ　一覧"
      actions={<ListToolBar isShowCreate={validRole('create', actions)} />}
    >
      <Datagrid rowClick="show">
        <TextField source="id" label="No" />
        <TextField source="performanceTypeName" label="演出種別名" />
        <TextField source="performanceTypeID" label="演出種別ID" />
        <TextField source="date" label="登録日" />
        {validRole('delete', actions) && (
          <DeleteWithConfirmButton label="アカウント削除"></DeleteWithConfirmButton>
        )}
        {validRole('edit', actions) && <EditButton label="編集"></EditButton>}
      </Datagrid>
    </List>
  );
};

export default PerformanceTypeMasterList;
