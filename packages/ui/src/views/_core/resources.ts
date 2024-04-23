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

import { UserList, UserEdit, UserCreate } from '../Users';
import {
  ProductList,
  ProductEdit,
  ProductCreate,
  ProductShow,
} from '../Products';
import {
  AnimalClassificationList,
  AnimalClassificationEdit,
  AnimalClassificationCreate,
  AnimalClassificationShow,
} from '../AnimalClassifications';

import { AnimalList, AnimalEdit, AnimalCreate, AnimalShow } from '../Animals';
import { MemoList, MemoShow } from '../Memos';
import { ProductChartList, ProductChartShow } from '../ProductCharts';
import { RealtimeChartShow } from '../RealtimeCharts';
import {
  ImgRecSelectionCreate,
  ImgRecSelectionEdit,
  ImgRecSelectionList,
  ImgRecSelectionShow,
} from '../ImgRecSelections';

import type { ResourceMapIF } from '@repo/types/general';

const ResourceMap: ResourceMapIF = {
  products: {
    list: ProductList,
    show: ProductShow,
    edit: ProductEdit,
    create: ProductCreate,
    icon: Widgets,
    resource: 'products',
  },
  product_charts: {
    list: ProductChartList,
    show: ProductChartShow,
    icon: StackedBarChart,
    resource: 'product_charts',
  },
  users: {
    list: UserList,
    edit: UserEdit,
    create: UserCreate,
    icon: Group,
    resource: 'users',
  },
  animal_classifications: {
    list: AnimalClassificationList,
    show: AnimalClassificationShow,
    edit: AnimalClassificationEdit,
    create: AnimalClassificationCreate,
    icon: EmojiNature,
    resource: 'animal_classifications',
  },
  animals: {
    list: AnimalList,
    show: AnimalShow,
    edit: AnimalEdit,
    create: AnimalCreate,
    icon: Pets,
    resource: 'animals',
  },
  memos: {
    list: MemoList,
    show: MemoShow,
    icon: EventNote,
    resource: 'memos',
  },
  realtime_chart: {
    list: RealtimeChartShow,
    icon: Timeline,
    resource: 'realtime_chart',
  },
  img_rec_selections: {
    list: ImgRecSelectionList,
    show: ImgRecSelectionShow,
    edit: ImgRecSelectionEdit,
    create: ImgRecSelectionCreate,
    icon: Crop,
    resource: 'img_rec_selections',
  },
};

export default ResourceMap;
