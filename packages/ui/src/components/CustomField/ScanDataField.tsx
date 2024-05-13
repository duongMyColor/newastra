import { ImageField, SimpleShowLayout } from 'react-admin';
import { Box, Button } from '@mui/material';
import { imageFieldStyles } from '@repo/styles';

export const ScanDataField = ({
  source,
  moveScanRange,
}: {
  source: string;
  moveScanRange?: () => void;
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <SimpleShowLayout spacing={3}>
        <ImageField
          source={source}
          label="スキャン用データ"
          sx={imageFieldStyles}
        />
      </SimpleShowLayout>

      <Button
        variant="contained"
        size="small"
        sx={{ height: '40px' }}
        onClick={moveScanRange}
      >
        スキャン範囲指定
      </Button>
    </Box>
  );
};
