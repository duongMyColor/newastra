import { useRecordContext } from 'react-admin';

interface CustomButtonByRoleProps {
  label?: string;
  children: JSX.Element | JSX.Element[];
}
export const CustomButtonByRole = ({
  label,
  children,
}: CustomButtonByRoleProps) => {
  const record = useRecordContext();
  return <>{record?.role !== 'ADMIN' && children && <div>{children}</div>}</>;
};
