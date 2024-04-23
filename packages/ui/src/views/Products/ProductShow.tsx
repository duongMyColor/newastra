import {
  SimpleFormIterator,
  Show,
  TextInput,
  ArrayInput,
  NumberInput,
  SelectInput,
  FormDataConsumer,
  useShowContext,
} from 'react-admin';

import { Stack } from '@mui/material';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { masterCategories, subCategories } from '@repo/consts/product';

const ShowContent = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const { record } = useShowContext();

  return (
    <CustomForm
      pathTo={resourcePath}
      showDeleteButton={false}
      showSaveButton={false}
    >
      <Stack spacing={2}>
        <TextInput source="id" disabled />
        <TextInput source="name" disabled />
      </Stack>

      <SelectInput
        source="masterCategory"
        choices={masterCategories}
        title="Master Category"
        disabled
      />

      <FormDataConsumer>
        {({ formData, ...rest }) => (
          <SelectInput
            source="subCategory"
            choices={subCategories.filter((subCategories) => {
              return subCategories.masterId === record?.masterCategory;
            })}
            {...rest}
            title="Sub Category"
            disabled
          />
        )}
      </FormDataConsumer>
      <ArrayInput source="ProductDetail" label="Parts">
        <SimpleFormIterator
          inline
          disableReordering
          disableClear
          disableAdd
          disableRemove
        >
          <TextInput source="detailName" label="Detail Name" disabled />
          <NumberInput source="count" label="Detail count" disabled />
        </SimpleFormIterator>
      </ArrayInput>
    </CustomForm>
  );
};

const ProductShow = (props: BaseComponentProps) => {
  return (
    <Show>
      <ShowContent {...props} />
    </Show>
  );
};

export default ProductShow;
