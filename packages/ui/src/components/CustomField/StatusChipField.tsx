import { ChipField, useRecordContext } from 'react-admin';

export const StatusChipField = ({
  source,
  label,
  sortable = false,
}: {
  source: string;
  label: string;
  sortable: boolean;
}) => {
  const record = useRecordContext();
  return (
    <>
      {record && record[source] === 'アクティブ' && (
        <ChipField
          source={source}
          label={label}
          sx={{
            backgroundColor: '#41eb5d2b',
            color: 'green',
          }}
          sortable={sortable}
        />
      )}

      {record && record[source] === '非アクティブ' && (
        <ChipField
          source={source}
          label={label}
          sx={{
            backgroundColor: '#fcbaba78',
            color: 'red',
          }}
          sortable={sortable}
        />
      )}
    </>
  );
};
