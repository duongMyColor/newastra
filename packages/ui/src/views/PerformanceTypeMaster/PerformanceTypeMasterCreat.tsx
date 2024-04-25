import { userRoles } from '@repo/consts/user';
import {
  TextInput,
  Create,
} from 'react-admin';

import { validateUserCreation } from './formValidator';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';

const PerformanceTypeMasterCreate = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Create redirect="list" title="演出種別マスタ　新规作成">
      <CustomForm
        pathTo={resourcePath}
        validate={validateUserCreation}
        showSaveButton={true}
        showCancelButton={true}
      >
        <TextInput
          source="performanceTypeName"
          label="演出種別名"
          isRequired
          fullWidth
        />
      </CustomForm>
    </Create>
  );
};

export default PerformanceTypeMasterCreate;
