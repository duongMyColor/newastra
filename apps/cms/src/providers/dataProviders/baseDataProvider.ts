import { fetchUtils, withLifecycleCallbacks } from 'react-admin';
import type {
  CreateParams,
  CreateResult,
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
} from 'react-admin';
import removeEmptyProperties from '@repo/utils/removeEmptyProperties';
import { exclude } from '@repo/utils/excludeKey';

import { RecordValue } from '@repo/types/general';
import { MAP_RESOURE } from '@repo/consts/general';
import {
  MultipartUploadActions,
  MultipartUploadAllowMethods,
  MultipartUploadBody,
} from '@repo/types/upload';

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;
const httpClient = fetchUtils.fetchJson;

const baseDataProvider: DataProvider = {
  // get a list of records based on sort, filter, and pagination
  getList: async (
    resource: string,
    params: GetListParams
  ): Promise<GetListResult> => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${JSON.stringify(query)}`;

    const {
      json: { metadata, count },
    } = await httpClient(url);
    console.log('metadata: ', metadata?.length);

    let newMetaData = metadata.map((value: RecordValue, idx: number) => {
      value['no'] = (page - 1) * perPage + idx + 1;
      return value;
    });

    return {
      data: newMetaData,
      total: count,
    };
  },
  // get a single record by id
  getOne: async (
    resource: string,
    params: GetOneParams
  ): Promise<GetOneResult> => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const {
      json: { metadata },
    } = await httpClient(url);
    console.log('metadata: ', metadata);

    return {
      data: metadata,
    };
  },
  // get a list of records based on an array of ids
  getMany: async (
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult> => {
    const url = `${apiUrl}/${resource}?id=${params.ids}`;
    const {
      json: { metadata },
    } = await httpClient(url);

    return {
      data: metadata,
    };
  },
  // get the records referenced to another record, e.g. comments for a post
  getManyReference: async (
    resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult> => {
    const query = JSON.stringify(params);

    const url = `${apiUrl}/${resource}/refer?${query}`;
    const {
      json: { metadata },
    } = await httpClient(url);

    return metadata;
  },

  getAll: async (resource: string) => {
    const url = `${apiUrl}/${resource}/batch`;
    const {
      json: { metadata },
    } = await httpClient(url);

    return metadata;
  },
  // create a record
  create: async (
    resource: string,
    params: CreateParams
  ): Promise<CreateResult> => {
    console.log({ resource, params });
    const url = `${apiUrl}/${resource}`;

    let body;
    if (params.data instanceof FormData) {
      body = params.data;
    } else {
      body = JSON.stringify(params.data);
    }

    const response = await httpClient(url, {
      method: 'POST',
      body,
    });
    const {
      json: { metadata },
    } = response;

    console.log(':::metadata', metadata);
    return {
      data: metadata,
    };
  },

  createMany: async (
    resource: string,
    params: CreateParams
  ): Promise<CreateResult> => {
    const url = `${apiUrl}/${resource}/batch`;

    const body = JSON.stringify(params.data);

    const response = await httpClient(url, {
      method: 'POST',
      body,
    });
    const {
      json: { metadata },
    } = response;

    return {
      data: metadata,
    };
  },

  // update a record based on a patch
  update: async (
    resource: string,
    params: UpdateParams
  ): Promise<UpdateResult> => {
    const url = `${apiUrl}/${resource}/${params.id}`;

    let body;

    if (params.data instanceof FormData) {
      body = params.data;
    } else {
      body = JSON.stringify(
        exclude(removeEmptyProperties(params.data), [
          'createdAt',
          'updatedAt',
          'id',
        ])
      );
    }

    const response = await httpClient(url, {
      method: 'PUT',
      body,
    });
    const {
      json: { metadata },
    } = response;

    return {
      data: metadata,
    };
  },
  // update a list of records based on an array of ids and a common patch
  updateMany: async (
    resource: string,
    params: UpdateManyParams
  ): Promise<UpdateManyResult> => {
    const url = `${apiUrl}/${resource}/batch`;
    const body = JSON.stringify(params.data);

    const response = await httpClient(url, {
      method: 'PUT',
      body,
    });
    const {
      json: { metadata },
    } = response;

    return {
      data: metadata,
    };
  },
  // delete a record by id
  delete: async (
    resource: string,
    params: DeleteParams
  ): Promise<DeleteResult> => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const response = await httpClient(url, {
      method: 'DELETE',
    });
    const {
      json: { metadata },
    } = response;

    return {
      data: metadata,
    };
  },
  // delete a list of records based on an array of ids
  deleteMany: async (
    resource: string,
    params: DeleteManyParams
  ): Promise<DeleteManyResult> => {
    const url = `${apiUrl}/${resource}/batch`;
    const body = JSON.stringify(params.ids);

    const response = await httpClient(url, {
      method: 'DELETE',
      body,
    });

    const {
      json: { metadata },
    } = response;
    console.log('deleteMany');

    return {
      data: metadata,
    };
  },

  getObject: async (params: { key: string }) => {
    const url = `${apiUrl}/upload/get-object`;

    const response = await httpClient(url, {
      method: 'POST',
      body: JSON.stringify(params),
    });
    console.log(':::response', response);

    return {
      data: response,
    };
  },
  getIdLastest: async (resource: string) => {
    console.log({ resource });
    const url = `${apiUrl}/id-lastest?source=${MAP_RESOURE[resource]}`;
    const {
      json: { metadata },
    } = await httpClient(url);

    console.log(':::response', metadata);

    return {
      data: metadata,
    };
  },
  multipartUpload: async (
    method: MultipartUploadAllowMethods,
    action: MultipartUploadActions,
    params: { body: MultipartUploadBody }
  ) => {
    const url = `${apiUrl}/upload/multipart/${action}`;

    const response = await httpClient(url, {
      method: method,
      body: JSON.stringify(params),
    });

    return {
      data: response,
    };
  },
};

export default baseDataProvider;
