import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  EditButton,
  DeleteWithConfirmButton,
  TopToolbar,
  ExportButton,
  CreateButton,
  DateField,
  useNotify,
} from 'react-admin';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

import { validRole } from '../_core/permissions';

import { PostFilterForm } from './CustomFilter';
import { Actions } from '@repo/types/roles';
import { BaseComponentProps } from '@repo/types/general';
import { AnimalClassificationResponseIF } from '@repo/types/animal';

const ListActions = ({
  actions,
  classification,
}: {
  actions: Actions;
  classification: AnimalClassificationResponseIF[];
}) => {
  return (
    <Box width="100%">
      <TopToolbar>
        {validRole('edit', actions) ? <CreateButton /> : null}
        <ExportButton />
      </TopToolbar>
      <PostFilterForm classification={classification} />
    </Box>
  );
};

const AnimalClassificationList = ({
  actions,
  resource,
  dataProvider,
}: BaseComponentProps) => {
  const [classification, setClassification] = useState<
    AnimalClassificationResponseIF[]
  >([]);

  const notify = useNotify();

  useEffect(() => {
    const fetchClassification = async () => {
      try {
        const { data } = await dataProvider.getMany('animal_classifications', {
          ids: [],
        });
        setClassification(data);
      } catch (error) {
        notify('Error: Get Classification failed: ' + error, {
          type: 'warning',
        });
      }
    };
    fetchClassification();
  }, []);

  return (
    <List
      actions={
        <ListActions actions={actions} classification={classification} />
      }
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="classification.name" label="Classification" />
        <DateField source="created" />
        <ShowButton label="Detail"></ShowButton>
        {validRole('edit', actions) ? (
          <EditButton label="Edit"></EditButton>
        ) : null}{' '}
        {validRole('delete', actions) ? (
          <DeleteWithConfirmButton label="Delete"></DeleteWithConfirmButton>
        ) : null}{' '}
      </Datagrid>
    </List>
  );
};

export default AnimalClassificationList;
