import React, { useContext } from 'react';
import { useGetManyReference, useGetList, useRecordContext } from 'react-admin';

type Order = 'ASC' | 'DESC';
interface GetChoiceProps {
  reference: string;
  through: string;
  record: any;
  source: string;
  filter: any;
  using: string;
}

const getEditChoices = ({
  reference,
  through,
  record,
  source,
  filter,
  using,
}: GetChoiceProps) => {
  console.log('getEditChoices');

  const [resourceId, referenceId] = using.split(',');
  const useGetManyReferenceParams = {
    target: resourceId,
    id: record[source],
    pagination: { page: 1, perPage: 25 },
    sort: { field: 'id', order: 'DESC' as Order },
    filter,
  };
  console.log('getEditChoices');

  const { data, isLoading, error } = useGetManyReference(
    through,
    useGetManyReferenceParams
  );

  if (data?.length == 0) return [];

  const targetIds = data?.map((item) => item[referenceId as string]);

  if (!targetIds) return [];

  const { data: choiceData, isLoading: choiceLoading } = useGetList(reference, {
    pagination: { page: 1, perPage: 25 },
    sort: { field: 'id', order: 'DESC' },
    filter: { id: targetIds },
  });
  console.log('choiceData', choiceData);

  return choiceData?.map((item) => ({
    id: item.id,
    name: item.name,
  }));
};

const getCreateChoices = ({ reference }: { reference: string }) => {
  console.log('getCreateChoices');

  const { data } = useGetList(reference, {
    pagination: { page: 1, perPage: 25 },
    sort: { field: 'id', order: 'DESC' },
  });

  return data?.map((item) => ({
    id: item.id,
    name: item.name,
  }));
};

const ReferenceManyToManyInput = ({
  children,
  reference,
  through,
  filter = {},
  filterChoices = {},
  perPage = 25,
  perPageChoices = 25,
  sort = { field: 'id', order: 'DESC' },
  sortChoices = { field: 'id', order: 'DESC' },
  source = 'id',
  using,
  ...rest
}: {
  children: React.ReactElement;
  reference: string;
  through: string;
  filter?: any;
  filterChoices?: any;
  perPage?: number;
  perPageChoices?: number;
  sort?: any;
  sortChoices?: any;
  source?: string;
  using: string;
  [key: string]: any;
}) => {
  const record = useRecordContext();
  console.log({ record });

  const choices = record
    ? getEditChoices({ reference, through, record, source, filter, using })
    : getCreateChoices({ reference });
  console.log({ choices });

  return React.cloneElement(children, {
    ...rest,
    choices,
    source: reference,
  });
};

export default ReferenceManyToManyInput;
