import { useRecordContext } from 'react-admin';

interface CustomButtonByRoleProps {
  children: JSX.Element | JSX.Element[];
  condition?: any;
  source: string;
  label?: string;
}

/**
 *
 * @param children - JSX.Element | JSX.Element[]
 * @param condition - condition to match
 * @param source - source to match
 * @returns
 */
export const CustomButtonByRole = ({
  children,
  condition,
  source,
  label,
}: CustomButtonByRoleProps) => {
  const record = useRecordContext();

  const defaultCondition = record && record[source] !== 'ADMIN';
  let masterCondition = defaultCondition;
  if (condition) {
    masterCondition = record && record[source] !== condition;
  }

  return <>{masterCondition && children && <div>{children}</div>}</>;
};
