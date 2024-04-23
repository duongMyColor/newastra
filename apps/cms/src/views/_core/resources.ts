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
import { UserList, UserEdit, UserCreate } from '@repo/ui/src/views/Users';


const Resources: ResourceIF[] = [
  {
    list: UserList,
    edit: UserEdit,
    create: UserCreate,
    icon: Group,
    resource: 'users',
  }
];

export default Resources;
