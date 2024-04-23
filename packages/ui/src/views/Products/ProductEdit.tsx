import { ProductDetailPostIF, ProductPostFormIF } from '@repo/types/product';
import {
  ArrayInput,
  Edit,
  SimpleFormIterator,
  TextInput,
  useNotify,
  useRefresh,
  useUpdateMany,
  useUpdate,
  useEditContext,
  useDeleteMany,
  NumberInput,
  SelectInput,
  FormDataConsumer,
} from 'react-admin';
import { SubmitHandler, FieldValues } from 'react-hook-form';

import { Stack } from '@mui/material';
import { compareObjects } from '@repo/utils/objectUtils';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { validateProductEdition } from './formValidator';
import { BaseComponentProps } from '@repo/types/general';
import { masterCategories, subCategories } from '@repo/consts/product';

const EditContent = ({
  actions,
  resource,
  dataProvider,
}: BaseComponentProps) => {
  const { record } = useEditContext();
  const resourcePath = `/${resource}`;

  const [updateProduct] = useUpdate();
  const [updateDetails] = useUpdateMany();
  const [deleteDetails] = useDeleteMany();

  const notify = useNotify();
  const refresh = useRefresh();

  const insertDetails = (data: ProductDetailPostIF[]) => {
    return dataProvider.createMany('product_details', { data });
  };

  const handleSave = async (values: ProductPostFormIF) => {
    const { name, ProductDetail } = values;

    const productData = { name };

    const { added, removed, changed } = compareObjects(record.ProductDetail, ProductDetail);

    try {
      // Update the product
      await updateProduct(resource, {
        id: record.id,
        data: productData,
        previousData: record,
      });

      // Insert new ProductDetail
      if (added.length > 0) {
        const body = added.map((detail) => ({
          ...detail,
          productId: record.id,
        }));
        await insertDetails(body as ProductDetailPostIF[]);
      }

      // Update changed ProductDetail
      if (changed.length > 0) {
        await updateDetails('product_details', {
          ids: changed.map((detail) => detail.id),
          data: changed,
        });
      }

      // Delete removed ProductDetail
      if (removed.length > 0) {
        const ids = removed.map((detail) => detail.id);
        await deleteDetails('product_details', {
          ids,
        });
      }

      notify('Product and ProductDetail updated');
    } catch (err) {
      notify('Error: Product and ProductDetail not updated' + err, {
        type: 'warning',
      });
    }

    // Wait for all function above executed
    setTimeout(() => {
      refresh();
    }, 1000);
  };

  return (
    <CustomForm
      handleSave={handleSave as SubmitHandler<FieldValues>}
      pathTo={resourcePath}
      validate={validateProductEdition}
    >
      <Stack spacing={2}>
        <TextInput source="id" isRequired disabled />
        <TextInput source="name" isRequired />
      </Stack>
      <SelectInput
        source="masterCategory"
        choices={masterCategories}
        title="Master Category"
      />

      <FormDataConsumer>
        {({ formData, ...rest }) => (
          <SelectInput
            source="subCategory"
            choices={subCategories.filter((subCategories) => {
              return subCategories.masterId === formData.masterCategory;
            })}
            {...rest}
            title="Sub Category"
          />
        )}
      </FormDataConsumer>
      <ArrayInput source="ProductDetail" label="Parts">
        <SimpleFormIterator inline disableReordering disableClear>
          <TextInput source="detailName" label="Detail Name" isRequired />
          <NumberInput source="count" label="Detail count" isRequired />
        </SimpleFormIterator>
      </ArrayInput>
    </CustomForm>
  );
};

const ProductEdit = (props: BaseComponentProps) => {
  return (
    <Edit>
      <EditContent {...props} />
    </Edit>
  );
};

export default ProductEdit;
