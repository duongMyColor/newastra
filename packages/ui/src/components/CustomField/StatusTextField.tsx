import { TextInput, useRecordContext } from 'react-admin';

export const StatusTextField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  return (
    <>
      {record && record[source] === 'アクティブ' && (
        <TextInput
          source={source}
          label="ステータス"
          disabled
          sx={{
            '& .Mui-disabled': {
              WebkitTextFillColor: 'green',
            },
          }}
        />
      )}

      {record && record[source] === '非アクティブ' && (
        <TextInput
          source={source}
          // label="非アクティブ"
          label="ステータス"
          disabled
          sx={{
            '& .Mui-disabled': {
              WebkitTextFillColor: 'red',
            },
          }}
        />
      )}
    </>
  );
};
