import { useFilterContext } from '../context/filter_context';
import styled from 'styled-components';
 
var Pagination = () => {

  // get page_number from context
  let { updatePage, max_page_number: max, page_number } = useFilterContext();
 
  let pageButtonArray = [];
  
  for (let index = 0; index < max; index++) {
    pageButtonArray.push(
      <button
        type='button'
        key={index}
        onClick={updatePage}
        // add active class to current page button
        className={page_number === index + 1 ? 'btn active' : 'btn'}
        data-page={index + 1}
      >
        {index + 1}
      </button>
    );
  }
 
  return (
    <Wrapper>
      <button
        type='button'
        onClick={updatePage}
        data-page='prev'
        // add generic button class
        className='btn'
      >
        prev
      </button>
      {pageButtonArray}
      <button
        type='button'
        onClick={updatePage}
        data-page='next'
        // add generic button class
 
        className='btn'
      >
        next
      </button>
    </Wrapper>
  );
};
 
const Wrapper = styled.section`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-wrap: wrap;
  gap: 0.5rem;
  .active {
    color: var(--clr-primary-1);
    background: var(--clr-primary-7);
  }
`;
 
export default Pagination;