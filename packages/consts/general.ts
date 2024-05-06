const baseUploadFolder = 'src/app/api/_uploads/';

const REDIRECT_ROUTE = {
  list: 'list',
  show: 'show',
  create: 'create',
  edit: 'edit',
};

const MAP_RESOURE: Record<string, string> = {
  'term-of-uses': 'termsOfUse',
  acstas: 'acstaManagement',
  licenses: 'license',
  performances: 'performaceManagement',
};

const UPLOAD_FOLDER_MAP = {
  termOfUse: 'term-of-use',
  license: 'license',
  applicationMaster: 'application-master',
  performance: 'performance',
  acstar: 'acstar',
};

export { baseUploadFolder, REDIRECT_ROUTE, UPLOAD_FOLDER_MAP, MAP_RESOURE };
