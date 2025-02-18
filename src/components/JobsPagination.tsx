'use client';

import React from 'react';
import { Pagination } from "@heroui/react";

interface JobsPaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  totalPages: number;
  initialPage?: number;
  onPageChange: (page: number) => void;
}

export default function JobsPagination(
  {totalPages,
    initialPage = 1,
    onPageChange,
    ...props
  }: JobsPaginationProps) {

  return (
    <div {...props}>
      <Pagination
        isCompact
        showControls
        initialPage={initialPage}
        total={totalPages}
        onChange={(page: number) => onPageChange(page)}
      />
    </div>
  )
}