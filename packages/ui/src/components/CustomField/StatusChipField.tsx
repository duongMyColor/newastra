import { ChipField, useRecordContext } from "react-admin";

export const StatusChipField = ({
  source,
  label,
}: {
  source: string;
  label: string;
}) => {
  const record = useRecordContext();
  return (
    <>
      {record && record[source] === 'active' && (
        // <span style={{ color: 'green' }}>アクティブ</span>

        <ChipField
          source={source}
          label={label}
          sx={{
            backgroundColor: '#41eb5d2b',
            color: 'green',
          }}
        />
      )}

      {record && record[source] === 'deActive' && (
        <ChipField
          source={source}
          label={label}
          sx={{
            backgroundColor: '#fcbaba78',
            color: 'red',
          }}
        />
      )}
    </>
  );
};
