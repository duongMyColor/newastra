import { useRecordContext } from 'react-admin';

interface CustomButtonByRoleProps {
  label?: string;
  children: JSX.Element | JSX.Element[];
  condition?: any;
  source: string;
}
export const CustomButtonByRole = ({
  label,
  children,
  condition,
  source,
}: CustomButtonByRoleProps) => {
  const record = useRecordContext();

  const defaultCondition = record && record[source] !== 'ADMIN';
  let masterCondition = defaultCondition;
  if (condition) {
    masterCondition = record && record[source] !== condition;
  }

  return <>{masterCondition && children && <div>{children}</div>}</>;
};
