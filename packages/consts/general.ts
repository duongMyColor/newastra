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
  'forced-update-managements': 'forcedUpdateManagements',
  'application-masters': 'aplicationMaster',
};

const UPLOAD_FOLDER_MAP = {
  termOfUse: 'term-of-use',
  license: 'license',
  applicationMaster: 'application-master',
  performance: 'performance',
  acsta: 'acsta',
};

const OPERATE_SYSTEM = [
  { id: '0', name: 'IOS' },
  { id: '1', name: 'Android' },
];

export {
  baseUploadFolder,
  REDIRECT_ROUTE,
  UPLOAD_FOLDER_MAP,
  MAP_RESOURE,
  OPERATE_SYSTEM,
};
