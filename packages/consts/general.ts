const baseUploadFolder = 'src/app/api/_uploads/';

const REDIRECT_ROUTE = {
  list: 'list',
  show: 'show',
  create: 'create',
  edit: 'edit',
};

const UPLOAD_FOLDER_MAP = {
  termOfUse: 'term-of-use',
  license: 'license',
  applicationMaster: 'application-master',
  performance: 'performance',
  acstar: 'acstar',
};

export { baseUploadFolder, REDIRECT_ROUTE, UPLOAD_FOLDER_MAP };
