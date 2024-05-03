const baseUploadFolder = 'src/app/api/_uploads/';

const REDIRECT_ROUTE = {
  list: 'list',
  show: 'show',
  create: 'create',
  edit: 'edit',
};

const MAP_RESOURE :Record<string, string> = {
  'term-of-uses': 'termsOfUse',
  'acstas': 'acstaManagement',
  'license': 'license',
  'performances': 'performaceManagement',
};

export { baseUploadFolder, REDIRECT_ROUTE, MAP_RESOURE };