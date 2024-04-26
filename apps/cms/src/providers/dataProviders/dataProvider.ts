import { withLifecycleCallbacks } from 'react-admin';

import baseDataProvider from './baseDataProvider';
import fakeProvider from './fakeDataProvider';
import userCallbackHandler from './userCallbackHandlers';
import applicationMasterCallbackHandler from './applicationMasterCallbackHandlers';
import axtaManagementCallbackHandler from './axtaManagementCallbackHandlers';
import PerformanceTypeMasterCallbackHandler from './performanceTypeMasterCallbackHandlers';
import performanceManagementCallbackHandlers from './performanceManagementCallbackHandlers';
import termOfUseManagementCallbackHandlers from './termOfUseManagementCallbackHandlers';

/**
 * NOTE:Limitation of withLifecycleCallbacks
 * Ref: https://marmelab.com/react-admin/withLifecycleCallbacks.html#limitations
 * For some cases, withLifecycleCallbacks is hard to handle errors and can not guarantee data consistency. If needed, we can change business logic to handleSave function of Form: See `src\views\Animals\AnimalEdit.tsx`
 */
const dataProvider = withLifecycleCallbacks(fakeProvider, [
  userCallbackHandler,
  applicationMasterCallbackHandler,
  axtaManagementCallbackHandler,
  PerformanceTypeMasterCallbackHandler,
  performanceManagementCallbackHandlers,
  termOfUseManagementCallbackHandlers,
]);

export default dataProvider;
