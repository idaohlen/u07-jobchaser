'use client';

import React from 'react';
import { Pagination } from '@heroui/react';

interface JobsPaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  totalPages: number;
  currentPage: number;
  initialPage?: number;
  onPageChange: (page: number) => void;
}

export default function JobsPagination(
  {totalPages,
    initialPage = 1,
    currentPage,
    onPageChange,
    ...props
  }: JobsPaginationProps) {

  return (
    <div {...props}>
      <Pagination
        isCompact
        showControls
        initialPage={initialPage}
        page={currentPage}
        total={totalPages}
        onChange={(page: number) => onPageChange(page)}
      />
    </div>
  )
}