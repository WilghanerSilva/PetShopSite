import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Pet {
    id: number;
    breed: string;
    name: string;
    specie: string;
    age: number;
    weight: number;
    user_id: string;
    user_name: string;
    created_at: string;
    updated_at: string;
}

export interface Service {
  id: number;
  date: string;
  type: string;
  is_done: boolean;
  customer_id: number;
  employee_id: number;
  pet_id: number;
  created_at: string;
  updated_at: string;
  customer_name: string;
  employee_name: string;
  pet_name: string;
}

export interface Link {
    active: boolean;
    label: string;
    url: string
}


export interface PaginationType {
    current_page: number;
    data: Array<Service | Pet>;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<Link>;
    nex_page_url: string;
    path:string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}

export interface User {
    id: number,
    name: string,
    email: string,
    role: string,
}

export interface Auth {
    user: User
}
