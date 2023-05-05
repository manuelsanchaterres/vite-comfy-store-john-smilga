import React from 'react'
import styled from 'styled-components'
import { FaPlus, FaMinus } from 'react-icons/fa'

const AmountButtons = ({stock}) => {

  const [amount, setAmount] = React.useState(1)

  const handleAmountIncrease = () => {

    if (amount < stock) {

      setAmount(amount + 1)

    }
  }

  const handleAmountDecrease = () => {

    if (amount > 1) {

      setAmount(amount - 1)

    }
  }




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
