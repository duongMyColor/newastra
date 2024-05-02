import { useRecordContext } from "react-admin";

export const CustomButtonByRole = ({
    label,
  children,
}: {
    label?:string
  children: JSX.Element | JSX.Element[];
}) => {
  const record = useRecordContext();
  return <>{record.role !== 'ADMIN' && <div>{children}</div>}</>;
};
