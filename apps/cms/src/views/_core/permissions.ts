import { ReactComponent } from '@repo/types/general';
import { Actions, Permission, RoleCheckingProps } from '@repo/types/roles';
import { createElement, FunctionComponent } from 'react';

const ADMIN: Permission = {
  users: '*',
  products: '*',
  product_charts: '*',
  animal_classifications: '*',
  animals: '*',
  memos: '*',
  realtime_chart: '*',
  img_rec_selections: '*',
  terms_and_conditions: '*',
};
const USER: Permission = {
  users: [],
  products: ['list', 'create', 'edit', 'delete', 'show'],
  product_charts: ['list', 'create', 'edit', 'delete', 'show'],
  animal_classifications: ['list', 'create', 'edit', 'delete', 'show'],
  animals: ['list', 'create', 'edit', 'delete', 'show'],
  memos: ['list', 'create', 'edit', 'delete', 'show'],
  realtime_chart: ['list', 'create', 'edit', 'delete', 'show'],
  img_rec_selections: ['list', 'create', 'edit', 'delete', 'show'],
  terms_and_conditions: ['list', 'create', 'edit', 'delete', 'show'],
};
const VIEW: Permission = {
  users: [],
  products: ['show', 'list'],
  product_charts: ['show', 'list'],
  animal_classifications: ['show', 'list'],
  animals: ['show', 'list'],
  memos: ['show', 'list'],
  realtime_chart: ['show', 'list'],
  img_rec_selections: ['show', 'list'],
  terms_and_conditions: ['show', 'list'],
};

const ROLES_MAP: {
  [key: string]: Permission;
} = {
  ADMIN,
  USER,
  VIEW,
};

/**
 *
 * @param role role to check
 * @returns actions of pemission
 */
const generateRole = (role: string) => {
  return ROLES_MAP[role];
};

/**
 *
 * @param role role to check
 * @param actions actions of pemission to check
 * @returns boolean role is valid or not
 */
const validRole = (role: string, actions: Actions): boolean => {
  return actions === '*' || actions.includes(role);
};

/**
 *
 * @param actions actions of pemission to check
 * @param action action of screen to check
 * @param component component to render
 * @param props props to pass to component
 * @returns
 */
const checkRole = ({
  actions,
  action,
  component,
  props,
}: RoleCheckingProps): ReactComponent => {
  if (!component) return undefined;

  const resComponent = props
    ? createElement(component as FunctionComponent, props)
    : component;

  const isRender = validRole(action, actions);

  return isRender ? resComponent : undefined;
};

export { generateRole, checkRole, validRole };
