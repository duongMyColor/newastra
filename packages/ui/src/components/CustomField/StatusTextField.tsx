import { TextInput, useRecordContext } from "react-admin";

export const StatusTextField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  return (
    <>
      {record && record[source] === 'active' && (
        <TextInput
          source={source}
          label="アクティブ"
          disabled
          sx={{
            '& .Mui-disabled': {
              WebkitTextFillColor: 'green',
            },
          }}
        />
      )}

      {record && record[source] === 'deActive' && (
        <TextInput
          source={source}
          label="非アクティブ"
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
