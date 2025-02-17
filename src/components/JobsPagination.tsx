'use client';

import { Pagination } from "@heroui/react";

interface JobsPaginationProps {
  totalPages: number;
  initialPage?: number;
  onChange: (page: number) => void;
}

export default function JobsPagination({totalPages, initialPage = 1, onChange}: JobsPaginationProps) {

  return (
    <div className="my-8 flex justify-center">
      <Pagination isCompact showControls initialPage={initialPage} total={totalPages} onChange={onChange} />
    </div>
  )
}