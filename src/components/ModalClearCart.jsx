import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useCartContext } from '../context/cart_context'
import styled from 'styled-components';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};

const BasicModal = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {clearCart} = useCartContext()

  return (
    <div>

      <button onClick={handleOpen} className='link-btn clear-btn'>clear shopping cart</button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Typography id="modal-modal-title" variant="h6" component="h2" style={{fontWeight: 600}}>
            Remove Cart Confirmation
          </Typography>
          <Typography id="modal-modal-description"  style={{fontWeight: 500}} sx={{ mt: 2 }}>

            Are you Sure you Want to Remove the Current Products Cart ?

          </Typography>

            <Wrapper>            
                
                <div className="link-container">

                  <button onClick={clearCart} className='link-btn remove-btn'> Remove Cart</button>

                  <button onClick={handleClose} className='link-btn back-cart-btn'> Back to Cart</button>

                </div>

            </Wrapper>

        </Box>
      </Modal>

    </div>

  );
}

const Wrapper = styled.div`

  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
    border: solid 2.5px var(--clr-grey-4);

  }

  .remove-btn {

    background:   var(--clr-red-light);
    font-weight: 700;
    border-radius: var(--radius);
    border: solid 2.5px var(--clr-grey-4);

  }
    .back-cart-btn {

    background:   var(--clr-green-dark);
    font-weight: 700;
    border-radius: var(--radius);
    border: solid 2.5px var(--clr-grey-4);
    );
    }

    
`


export default BasicModal