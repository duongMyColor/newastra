import { ReactComponent } from '@repo/types/general';
import { Actions, Permission, RoleCheckingProps } from '@repo/types/roles';
import { createElement, FunctionComponent } from 'react';

const ADMIN: Permission = {
  users: '*',
  'application-masters': '*',
  acstas: '*',
  'performance-masters': '*',
  performances: '*',
  'term-of-uses': '*',
  licenses: '*',
};
const GENERAL: Permission = {
  users: ['list', 'show'],
  'application-masters': ['create', 'list', 'show', 'edit', 'delete'],
  acstas: ['create', 'list', 'show', 'edit', 'delete'],
  'performance-masters': ['create', 'list', 'show', 'edit', 'delete'],
  performances: ['create', 'list', 'show', 'edit', 'delete'],
  'term-of-uses': ['create', 'list', 'show'],
  licenses: ['create', 'list', 'show'],

  // products: ['list', 'create', 'edit', 'delete', 'show'],
};
const READ_ONLY: Permission = {
  users: ['list', 'show'],
  'application-masters': ['list', 'show'],
  acstas: ['list', 'show'],
  'performance-masters': ['list', 'show'],
  performances: ['list', 'show'],
  'term-of-uses': ['list', 'show'],
  licenses: ['list', 'show'],
};

const ROLES_MAP: {
  [key: string]: Permission;
} = {
  ADMIN,
  GENERAL,
  READ_ONLY,
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
 * @param action role to check
 * @param actions actions of pemission to check
 * @returns boolean role is valid or not
 */
const validRole = (action: string, actions: Actions): boolean => {
  return actions === '*' || actions.includes(action);
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
