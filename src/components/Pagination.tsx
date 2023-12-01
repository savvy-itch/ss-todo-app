import { useDispatch, useSelector } from 'react-redux'
import { TodosRootType } from '@/types';
import { onNextPage, onPageChange, onPrevPage } from '@/features/todos/todoSlice';

const visiblePages = 3;
const siblingCount = 1;

export default function Pagination({ pages }: { pages: number }) {
  const dispatch = useDispatch();
  const {currentPage} = useSelector((state: TodosRootType) => state.todos);

  let allPages: (number | string)[] = [];
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, pages);

  const shouldShowLeftDots = leftSiblingIndex > 2 && pages > visiblePages + 1;
  const shouldShowRightDots = rightSiblingIndex < pages - 1 && pages > visiblePages + 1;

  /* Case 1: If the number of pages is less than (equal to) the visible numbers to be shown in paginationComponent
  | < | 1 | 2 | 3 | > | */
  if (pages <= visiblePages + 1) {
    allPages = Array.from({ length: pages }, (_, i) => i + 1)
  }

  /* Case 2: No left dots to show, but rights dots to be shown */
  if (!shouldShowLeftDots && shouldShowRightDots) {
    // | < | 1 | 2 | 3 | ... | 6 | > |
    if (currentPage < visiblePages) {
      const leftRange = Array.from({ length: visiblePages }, (_, i) => i + 1);
      allPages = [...leftRange, '...', pages];
    } else if (currentPage === visiblePages) {
      // | < | 1 | 2 | 3 | 4 | ... | 6 | > |
      const leftRange = Array.from({ length: visiblePages + 1 }, (_, i) => i + 1);
      allPages = [...leftRange, '...', pages];
    }
  }

  /* Case 3: No right dots to show, but left dots to be shown */
  if (shouldShowLeftDots && !shouldShowRightDots) {
    // | < | 1 | ... | 6 | 7 | 8 | > |
    if (currentPage > pages - visiblePages + 1) {
      const rightRange = Array.from({ length: visiblePages }, (_, i) => pages - i).reverse();
      allPages = [1, '...', ...rightRange];
    } else if (currentPage <= pages - visiblePages + 1) {
      // | < | 1 | ... | 5 | 6 | 7 | 8 | > |
      const rightRange = Array.from({ length: visiblePages + 1}, (_, i) => pages - i).reverse();
      allPages = [1, '...', ...rightRange];
    }
  }

  /* Case 4: Both left and right dots to be shown 
  | < | 1 | ... | 6 | 7 | 8 | ... | 10 | > | */
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = [leftSiblingIndex, currentPage, rightSiblingIndex];
    allPages = [1, '...', ...middleRange, '...', pages];
  }

  return (
    <div className="flex justify-between sm:justify-center mt-8">
      {/* Left navigation arrow */}
      <button className="h-10 w-7 sm:w-10 rounded-lg font-bold bg-sky-300/75 border border-sky-300/75 mx-1 transition-colors hover:bg-sky-400/75 hover:border-sky-400-75 hover:cursor-pointer focus:bg-sky-400/75 focus:border-sky-400-75 disabled:cursor-default disabled:bg-sky-300/75 disabled:text-slate-600" 
        onClick={() => dispatch(onPrevPage())} 
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      
      {allPages.map((page, index) => {
        return (
        <button key={`${page}-${index}`} 
          className={`h-10 w-7 sm:w-10 rounded-lg font-bold bg-sky-300/75 border mx-1 transition-colors hover:bg-sky-400/75 hover:border-sky-400-75 hover:cursor-pointer focus:bg-sky-400/75 focus:border-sky-400-75 disabled:cursor-default disabled:bg-sky-300/75 disabled:text-slate-600 ${currentPage === page ? 'border-black' : 'border-sky-300/75'}`}
          onClick={() => dispatch(onPageChange({ currentPage: page}))}
          disabled={page === '...'}
        >
          {page}
        </button>
        )
      })}
      
      {/*  Right Navigation arrow */}
      <button className="h-10 w-7 sm:w-10 rounded-lg font-bold bg-sky-300/75 border border-sky-300/75 mx-1 transition-colors hover:bg-sky-400/75 hover:border-sky-400-75 hover:cursor-pointer focus:bg-sky-400/75 focus:border-sky-400-75 disabled:cursor-default disabled:bg-sky-300/75 disabled:text-slate-600"
        onClick={() => dispatch(onNextPage())}
        disabled={currentPage === pages}
      >
        &gt;
      </button>
    </div>
  )
}