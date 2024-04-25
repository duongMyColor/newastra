import {
  EventNote,
  EmojiNature,
  Widgets,
  Pets,
  Group,
  StackedBarChart,
  Timeline,
  Crop,
} from '@mui/icons-material/';

import type { ResourceIF, ResourceMapIF } from '@repo/types/general';
import {
  UserList,
  UserEdit,
  UserCreate,
  UserShow,
} from '@repo/ui/src/views/Users';

import {
  ApplicationMasterList,
  ApplicationMasterEdit,
  ApplicationMasterCreate,
  ApplicationMasterShow,
} from '@repo/ui/src/views/ApplicationMasters';

const Resources: ResourceIF[] = [
  {
    list: UserList,
    edit: UserEdit,
    create: UserCreate,
    show: UserShow,
    icon: Group,
    resource: 'users',
    label: '管理ユーザー管理 ',
  },
  {
    list: ApplicationMasterList,
    edit: ApplicationMasterEdit,
    create: ApplicationMasterCreate,
    show: ApplicationMasterShow,
    icon: Group,
    resource: 'application-masters',
    label: 'アプリケーションマスタ',
  },
];

export default Resources;
