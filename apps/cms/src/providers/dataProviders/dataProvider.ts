import { withLifecycleCallbacks } from 'react-admin';

import animalCallbackHandler from './animalCallbackHandlers';
import baseDataProvider from './baseDataProvider';
import termsAndConditionsCallbackHandler from './termsAndConditionsCallbackHandlers';

/**
 * NOTE:Limitation of withLifecycleCallbacks
 * Ref: https://marmelab.com/react-admin/withLifecycleCallbacks.html#limitations
 * For some cases, withLifecycleCallbacks is hard to handle errors and can not guarantee data consistency. If needed, we can change business logic to handleSave function of Form: See `src\views\Animals\AnimalEdit.tsx`
 */
const dataProvider = withLifecycleCallbacks(baseDataProvider, [
  animalCallbackHandler,
  termsAndConditionsCallbackHandler,
]);

export default dataProvider;
