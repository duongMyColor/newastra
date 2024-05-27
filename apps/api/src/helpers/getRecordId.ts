import { BadRequestError, NotFoundError } from '@/core/error.response';
import { getBundleId } from '@/lib/globalObject';
import { getOneByAppId } from '@/repos/acsta.repo';
import { getOneByBundleId } from '@/repos/applicationMaster.repo';

export const getApplicationId = async (): Promise<number> => {
  const bundleId = getBundleId();

  if (!bundleId) {
    throw new BadRequestError('bundleId not found');
  }

  const application = await getOneByBundleId(bundleId);

  if (!application) {
    throw new BadRequestError('Application not found');
  }

  return application.id;
};

export const getAcstaIdByBundleId = async (): Promise<number | null> => {
  const applicationId = await getApplicationId();

  const acsta = await getOneByAppId(applicationId);

  if (!acsta) return null;

  return acsta.id;
};
