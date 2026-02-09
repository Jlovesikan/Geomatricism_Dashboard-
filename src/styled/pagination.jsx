import React from 'react';
import Pagination from '@mui/material/Pagination';

export default function PaginationStyle(props) {
  const { page, onPageChange } = props;

  return (
    <Pagination
      count={10}
      page={page + 1}
      onChange={(e, value) => onPageChange(e, value - 1)}
      variant="outlined"
      color="primary"
      shape="rounded"
      
    />
  );
}
