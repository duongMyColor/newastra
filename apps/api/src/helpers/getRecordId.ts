import { BadRequestError, NotFoundError } from '@/core/error.response';
import { getBundleId } from '@/lib/globalObject';
import { getOneByAppId } from '@/repos/acsta.repo';
import { getOneByBundleId } from '@/repos/applicationMaster.repo';
import { AcstaApiResponseIF } from '@repo/types/acsta';

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

export const getAcstaIdByBundleId =
  async (): Promise<number[] | null> => {
    const applicationId = await getApplicationId();

    let acsta = await getOneByAppId(applicationId);
    let arrayAcstaId = acsta.map((value: AcstaApiResponseIF) => value.id);

    if (!acsta) return null;

    return arrayAcstaId;
  };
