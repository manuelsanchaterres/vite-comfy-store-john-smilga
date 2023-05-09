import React, { useEffect } from 'react'
import styled from 'styled-components'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
const AmountButtons = ({id, stock, amount, setAmount}) => {

  const {toggleAmount} = useCartContext()

  let newAmount = 0

  const handleAmountIncrease = () => {

    if (amount < stock) {

      newAmount = amount + 1
      setAmount (newAmount)

    }

  }

  const handleAmountDecrease = () => {

    if (amount > 1) {

      newAmount = amount - 1

      setAmount(newAmount)

    }

  }

  useEffect(() => {

    toggleAmount({id, amount})

  }, [amount])



  return (
  
    <Wrapper className='amount-btns'>


      <button type='button' onClick={handleAmountDecrease} className='amount-btn'><FaMinus/></button>

      <h2>{amount}</h2>

      <button type='button' onClick={handleAmountIncrease} className='amount-btn'><FaPlus/></button>


    </Wrapper>
  
  )
}

const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
`

export default AmountButtons
