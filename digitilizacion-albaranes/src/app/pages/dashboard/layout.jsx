'use client';
import LayoutDashboard from '../../components/LayoutDashboard';
import { NextUIProvider } from '@nextui-org/react';

export default function DashboardLayout({ children }) {
  return (
      <LayoutDashboard>{children}</LayoutDashboard>

  );
}
