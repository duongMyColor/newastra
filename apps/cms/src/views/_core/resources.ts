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
import {
  AxtaManagementShowList,
  AxtaManagementCreate,
  AxtaManagementEdit,
  AxtaManagementShow,
} from '@repo/ui/src/views/AxtaManagement';

import {
  PerformanceTypeMasterList,
  PerformanceTypeMasterCreate,
  PerformanceTypeMasterEdit,
  PerformanceTypeMasterShow,
} from '@repo/ui/src/views/PerformanceTypeMaster';

import {
  PerformanceManagementList,
  PerformanceManagementCreate,
  PerformanceManagementEdit,
  PerformanceManagementShow,
} from '@repo/ui/src/views/PerformanceManagement';

import {
  TermsOfUseManagementList,
  TermsOfUseManagementCreate,
  TermsOfUseManagementShow,
} from '@repo/ui/src/views/TermsOfUseManagement';
import {
  LicenseManagementList,
  LicenseManagementCreate,
  LicenseManagementShow,
} from '@repo/ui/src/views/LicenseManagement';

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
    resource: 'application-masters',
    label: 'アプリケーションマスタ',
  },
  {
    list: AxtaManagementShowList,
    edit: AxtaManagementEdit,
    create: AxtaManagementCreate,
    show: AxtaManagementShow,
    resource: 'acstas',
    label: 'アクスタ管理',
  },
  {
    list: PerformanceTypeMasterList,
    edit: PerformanceTypeMasterEdit,
    create: PerformanceTypeMasterCreate,
    show: PerformanceTypeMasterShow,
    resource: 'performance-type-masters',
    label: '演出種別マスタ',
  },
  {
    list: PerformanceManagementList,
    edit: PerformanceManagementEdit,
    create: PerformanceManagementCreate,
    show: PerformanceManagementShow,
    resource: 'performances',
    label: '演出管理',
  },
  {
    list: TermsOfUseManagementList,
    // edit: '',
    create: TermsOfUseManagementCreate,
    show: TermsOfUseManagementShow,
    resource: 'term-of-uses',
    label: '利用規約管理',
  },
  {
    list: LicenseManagementList,
    create: LicenseManagementCreate,
    show: LicenseManagementShow,
    resource: 'licenses',
    label: 'ライセンス管理',
  },
];

export default Resources;
