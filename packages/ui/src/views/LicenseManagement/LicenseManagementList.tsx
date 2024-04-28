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

const LicenseManagementList = ({ actions, resource }: BaseComponentProps) => {
  return (
    <List
      title="ライセンス管理　一覧"
      actions={<ListToolBar isShowCreate={validRole('create', actions)} />}
    >
      <Datagrid rowClick="show">
        <TextField source="id" label="No" />
        <TextField source="licenseId" label="ライセンスID" />
        <TextField source="memo" label="メモ" />
        <TextField source="version" label="バージョン" />
        <TextField source="dateStart" label="公開開始日" />
        <TextField source="dateRegistration" label="登録日" />
      </Datagrid>
    </List>
  );
};

export default LicenseManagementList;
