import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Academia MIRZAKHANI',
  },
  {
    displayName: 'Inicio',
    iconName: 'home',
    route: '/inicio',
    bgcolor: 'primary',
  },
  {
    displayName: 'Cursos',
    iconName: 'layout-dashboard',
    route: '/cursos-public',
    bgcolor: 'secondary',
  },
  {
    navCap: 'Acceso',
  },
  {
    displayName: 'Login Estudiante',
    iconName: 'login',
    route: '/authentication/login',
    bgcolor: 'success',
  },
  {
    displayName: 'Admin',
    iconName: 'admin_panel_settings',
    route: '/admin/dashboard',
    bgcolor: 'error',
  },
];
