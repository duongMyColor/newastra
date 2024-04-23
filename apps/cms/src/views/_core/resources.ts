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
import {
  ProductList,
  ProductEdit,
  ProductCreate,
  ProductShow,
} from '@repo/ui/src/views/Products';
import {
  AnimalClassificationList,
  AnimalClassificationEdit,
  AnimalClassificationCreate,
  AnimalClassificationShow,
} from '@repo/ui/src/views/AnimalClassifications';

import {
  AnimalList,
  AnimalEdit,
  AnimalCreate,
  AnimalShow,
} from '@repo/ui/src/views/Animals';
import { MemoList, MemoShow } from '@repo/ui/src/views/Memos';
import {
  ProductChartList,
  ProductChartShow,
} from '@repo/ui/src/views/ProductCharts';
import { RealtimeChartShow } from '@repo/ui/src/views/RealtimeCharts';
import {
  ImgRecSelectionCreate,
  ImgRecSelectionEdit,
  ImgRecSelectionList,
  ImgRecSelectionShow,
} from '@repo/ui/src/views/ImgRecSelections';
import {
  TermsAndConditionsCreate,
  TermsAndConditionsEdit,
  TermsAndConditionsList,
  TermsAndConditionsShow,
} from '@repo/ui/src/views/TermsAndConditions';

const Resources: ResourceIF[] = [
  {
    list: UserList,
    edit: UserEdit,
    create: UserCreate,
    icon: Group,
    resource: 'users',
  },
  {
    list: ProductList,
    show: ProductShow,
    edit: ProductEdit,
    create: ProductCreate,
    icon: Widgets,
    resource: 'products',
  },
  {
    list: ProductChartList,
    show: ProductChartShow,
    icon: StackedBarChart,
    resource: 'product_charts',
  },
  {
    list: AnimalClassificationList,
    show: AnimalClassificationShow,
    edit: AnimalClassificationEdit,
    create: AnimalClassificationCreate,
    icon: EmojiNature,
    resource: 'animal_classifications',
  },
  {
    list: AnimalList,
    show: AnimalShow,
    edit: AnimalEdit,
    create: AnimalCreate,
    icon: Pets,
    resource: 'animals',
  },
  {
    list: MemoList,
    show: MemoShow,
    icon: EventNote,
    resource: 'memos',
  },
  {
    list: RealtimeChartShow,
    icon: Timeline,
    resource: 'realtime_chart',
  },
  {
    list: ImgRecSelectionList,
    show: ImgRecSelectionShow,
    edit: ImgRecSelectionEdit,
    create: ImgRecSelectionCreate,
    icon: Crop,
    resource: 'img_rec_selections',
  },
  {
    resource: 'terms_and_conditions',
    list: TermsAndConditionsList,
    show: TermsAndConditionsShow,
    edit: TermsAndConditionsEdit,
    create: TermsAndConditionsCreate,
    // icon: Crop,
  },
];

export default Resources;
