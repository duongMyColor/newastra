import { formatDateAcstar } from '@repo/utils/dateFormat';
import { useState } from 'react';
import { useRecordContext } from 'react-admin';
import { TextField } from '@mui/material';
import {
  disabledInputBackgroundStyle,
} from '@repo/styles';

const FormatInputDateShow = ({
  label,
  typeDate,
}: {
  label: string;
  typeDate: string;
}) => {
  const record = useRecordContext();
  const [date, setDate] = useState();

  let formatDate = record ? formatDateAcstar(record[typeDate]) : '';

  return (
    <TextField
      id="filled-basic"
      label={label}
      variant="filled"
      value={formatDate}
      disabled
      sx={{ marginTop: '22px', width: '100%', ...disabledInputBackgroundStyle }}
    />
  );
};

export default FormatInputDateShow