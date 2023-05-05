import React, { useState } from 'react'
import { useFilterContext } from '../context/filter_context'
import { BsFillGridFill, BsList } from 'react-icons/bs'
import styled from 'styled-components'
import { productsSortingMethods } from '../utils/constants'

const Sort = () => {

  
  const {filtered_products: products, setView, grid_view, sort, updateSort} = useFilterContext()
  
  /* Vanilla JS Solution */

  // const handleView = (e) => {

  //   e.preventDefault()

  //   /* Vanilla JS Button Active class toggle */

  //   // const btnContainer = document.getElementsByClassName('btn-container')[0]

  //   // const buttons = btnContainer.querySelectorAll("button")
  //   // const currentbutton = e.currentTarget

  //   // buttons.forEach(buttonItem => {

  //   //   buttonItem.classList.remove('active')
  //   //   currentbutton.classList.add('active')

  //   // });


  //   if (currentbutton.id === 'grid') {

  //     setView(true)

  //   } else if (currentbutton.id === 'list') {

  //     setView(false)
      
  //   }


  // }


  return (

    <Wrapper>

      <div className="btn-container">

      <button type="button" id="grid" onClick={() => setView(true)} className={grid_view ? "active" : null}> <BsFillGridFill/> </button>
      <button type="button" id="list" onClick={() => setView(false)} className={!grid_view ? "active" : null}> <BsList/> </button>

      </div>

      <p>

        {products.length} products found

      </p>

      <hr />

      <form>

        <label htmlFor='sort'>sort by</label>
        <select name='sort' id='sort' value={sort} className='sort-input' onChange={updateSort}>  

          {productsSortingMethods.map((productsSortingMethod) => {

            const {value, id, name} = productsSortingMethod
            return <option key={id}  value={value} >{name}</option>

          })}

        </select>

      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {

      background: var(--clr-black);
      color: var(--clr-white);

    }
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`

export default Sort
