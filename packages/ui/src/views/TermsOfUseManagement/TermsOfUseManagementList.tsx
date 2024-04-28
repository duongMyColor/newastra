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
import { ListToolBar } from '@repo/ui/src/components/ListToolBar';

const TermsOfUseManagementList = ({
  actions,
  resource,
}: BaseComponentProps) => {
  return (
    <List
      title="利用規約管理　一覧"
      actions={<ListToolBar isShowCreate={validRole('create', actions)} />}
    >
      <Datagrid rowClick="show">
        <TextField source="id" label="No" />
        <TextField source="termOfUseId" label="利用規約ID" />
        <TextField source="memo" label="メモ" />
        <TextField source="version" label="バージョン" />
        <TextField source="dateStart" label="公開開始日" />
        <TextField source="dateRegistration" label="登録日" />
      </Datagrid>
    </List>
  );
};

export default TermsOfUseManagementList;
