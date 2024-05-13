import { useShowContext, SimpleForm, useNotify, useRefresh } from 'react-admin';
import { Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';

import RectEditor from './RectEditor/RectEditor';

import dataProvider from '../../../../../apps/cms/src/providers/dataProviders/dataProvider';

import { RectData } from '@repo/types/rectangleEditor';
import extractColorDistribution from './scanImageUsingPica';

const RectEditorArea = ({
  moveScanRange,
  resource,
}: {
  moveScanRange: () => void;
  resource: string;
}) => {
  const { record } = useShowContext();
  const refresh = useRefresh();
  const notify = useNotify();
  const scanImageUrl = record.scanImageUrl.src;
  const pathTo = `/${resource}/${record.id}/show`;
  const [rectPosition, setRectPosition] = useState<RectData>();

  console.log({ record });

  const positionData: RectData = {
    originX: record.scanOriginX,
    originY: record.scanOriginY,
    width: record.scanWidth,
    height: record.scanHeight,
  };

  const saveRectData = async () => {
    let scanColors;
    try {
      scanColors = await extractColorDistribution(
        scanImageUrl,
        rectPosition?.originX,
        rectPosition?.originY,
        rectPosition?.width,
        rectPosition?.height
      );
    } catch (error) {
      console.error('Error extracting color distribution:', error);
      return;
    }

    try {
      await dataProvider.updateScanData(
        {
          data: { ...rectPosition, scanColors: scanColors },
        },
        record.id
      );
      notify('スキャン範囲を保存しました。', { type: 'success' });

      refresh();
      moveScanRange();
    } catch (error) {
      notify('スキャン範囲の保存に失敗しました。', { type: 'warning' });
    }
  };

  const onChange = (data: RectData) => {
    setRectPosition(data);
  };

  return (
    <SimpleForm warnWhenUnsavedChanges={true} toolbar={false}>
      <Stack
        direction="row"
        justifyContent="flex-end"
        width="100%"
        height="100%"
        gap={3}
        alignItems="center"
      >
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={saveRectData}
          disabled={
            !rectPosition || (!rectPosition.width && !rectPosition.height)
          }
        >
          保存
        </Button>
      </Stack>

      <RectEditor
        imagePath={scanImageUrl}
        data={positionData}
        onChange={onChange}
      ></RectEditor>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        width="100%"
        sx={{
          backgroundColor: '#f1f1f1',
          padding: '1rem',
          borderRadius: '4px',
          marginTop: '1rem',
        }}
      >
        <Link to={pathTo}>
          <Button
            type="button"
            variant="contained"
            color="error"
            onClick={moveScanRange}
          >
            戻る
          </Button>
        </Link>
      </Stack>
    </SimpleForm>
  );
};

export default RectEditorArea;
