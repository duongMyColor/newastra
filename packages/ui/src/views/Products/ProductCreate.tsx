import { BaseComponentProps } from '@repo/types/general';
import { TextInput, Create, SelectInput, FormDataConsumer } from 'react-admin';
import { validateProductCreation } from './formValidator';
import { masterCategories, subCategories } from '@repo/consts/product';
import CustomForm from '@repo/ui/src/components/CustomForm';

const ProductCreate = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Create redirect="list">
      <CustomForm
        pathTo={resourcePath}
        showDeleteButton={false}
        validate={validateProductCreation}
      >
        <TextInput source="name" isRequired />
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
      </CustomForm>
    </Create>
  );
};

export default ProductCreate;
