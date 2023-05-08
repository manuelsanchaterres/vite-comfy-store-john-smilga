import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {

  const {  
    
    filters: {

    text,
    company,
    category,
    color,
    min_price,
    max_price,
    actual_price,
    shipping,

  }, updateFilters, clearFilters, all_products} = useFilterContext()

  const categories = getUniqueValues(all_products, 'category')
  const companies = getUniqueValues(all_products, 'company')
  const colors = getUniqueValues(all_products, 'colors')

  return (
  
  <Wrapper>

    <div className="content">

      <form onSubmit={(e) => e.preventDefault()}>

        {/* search input */}

        <div className="form-control">

          <input type="text" name='text' placeholder='search' className='search-input' value={text} onChange={updateFilters} />

        </div>
        {/* end search input */}

        {/* categories select */}

        <div className="form-control">

          <h5>categories</h5>

          <select name='category' id='categories' className='search-input' onChange={updateFilters}>  

            {categories.map((categoryitem, index) => {

              return <option key={index} className={`${category === categoryitem.toLowerCase() ? 'active' : null}`}>{categoryitem}</option>

            })}

          </select>


        </div>

        {/* end of categories select */}

        {/* companies select */}

        <div className="form-control">

          <h5>companies</h5>

          <select name='company' id='company' className='search-input' onChange={updateFilters}>  

            {companies.map((companyitem, index) => {

              return <option key={index} className={`${company === companyitem.toLowerCase() ? 'active' : null}`}>{companyitem}</option>

            })}

          </select>


        </div>

        {/* end of companies select */}
        
        {/* colors buttons */}

        <div className="form-control">

          <h5>Price</h5>

          <div className="colors">


            {colors.map((coloritem, index) => {


              if (coloritem === "all") {

                return <button key={index} name='color' value={coloritem} className={`all-btn ${color === coloritem ? 'active' : ''}`} onClick={updateFilters}>All</button>

              }

              return <button key={index} name='color' value={coloritem} className={`color-btn ${color === coloritem ? 'active' : ''}`} onClick={updateFilters} style={{backgroundColor: coloritem}}>{color === coloritem ? <FaCheck/> : null}</button>




            })}

          </div>


        </div>


        {/* end colors buttons */}
        {/* price range */}

        <div className="form-control">

          <h5>Price</h5>


          <p className='price'>{formatPrice(actual_price)}</p>

          <input type="range" id="actual_price" value={actual_price} onChange={updateFilters} name="actual_price"

          min='0' max={max_price}/>



        </div>


        {/* end price range */}

        {/* free shipping checkbox */}

        <div className="form-control shipping">


          <label htmlFor="shipping">free Shipping</label>

          <input type="checkbox" id="shipping" name="shipping" checked={shipping} onChange={updateFilters}/>


        </div>


        {/* end free shipping checkbox */}

      </form>

      {/* clear filters button */}

      <button type="button" className ="clear-btn" onClick={clearFilters}>clear filters </button>

      {/* end clear filters button */}

    </div>

  </Wrapper>)
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
