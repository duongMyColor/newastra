import { SimpleShowLayout, TextField, useRecordContext } from 'react-admin';
import { Box, Button } from '@mui/material';

export const ScanDataField = ({
  source,
  moveScanRange,
}: {
  source: string;
  moveScanRange?: () => void;
}) => {
  const record = useRecordContext();
  return (
    <Box sx={{ display: 'flex', gap: 10 }}>
      <SimpleShowLayout spacing={3}>
        <TextField source={source} label="スキャン用データ" disabled />
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
