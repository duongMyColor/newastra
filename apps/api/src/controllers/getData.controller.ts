import { OK } from '../core/success.response';
import LicenseService from '../services/license.service';
import TermOfUseService from '@/services/termOfUse.service';
import ApplicationMasterService from '@/services/applicationMaster.sercvice';
import AcstaService from '@/services/acsta.service';
import PerformanceService from '@/services/performance.service';
import { getDb } from '@/lib/globalObject';

async function getUpdatedTables(lastSyncDate: Date | string) {
  const prisma = getDb();

  const updatedTables = await prisma.bootUpdate.findMany({
    where: {
      updatedAt: {
        gt: lastSyncDate,
      },
    },
  });
  return updatedTables.map((entry: { tableName: string }) => entry.tableName);
}

class DataController {
  getInitData = async () => {
    return new OK({
      message: 'get all License success!',
      metadata: {
        license: await LicenseService.getCurrentLicense(),
        termOfUse: await TermOfUseService.getCurrentTermOfUse(),
        applicationMaster: await ApplicationMasterService.getAll(),
        acsta: await AcstaService.getAll(),
        performance: await PerformanceService.getAll(),
      },
    });
  };

  getUpdateData = async (lastSyncDate: Date | string) => {
    const updatedTables = await getUpdatedTables(lastSyncDate);
    if (!updatedTables.length) {
      return new OK({
        message: 'No updated data',
        metadata: {},
      });
    }

    let updatedData = {} as any;

    for (const table of updatedTables) {
      switch (table) {
        case 'license':
          updatedData.license = await LicenseService.getCurrentLicense();
          break;
        case 'termOfUse':
          updatedData.termOfUse = await TermOfUseService.getCurrentTermOfUse();
          break;
        case 'applicationMaster':
          updatedData.applicationMaster =
            await ApplicationMasterService.getUpdateData(lastSyncDate);
          break;
        case 'acsta':
          updatedData.acsta = await AcstaService.getUpdateData(lastSyncDate);
          break;
        case 'performance':
          updatedData.performance =
            await PerformanceService.getUpdateData(lastSyncDate);
          break;
      }
    }

    return new OK({
      message: 'get updated data success!',
      metadata: updatedData,
    });
  };
}

const licenseController = new DataController();
export default licenseController;
