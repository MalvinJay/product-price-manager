import React from 'react'
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';

const CofirmPopUp = ({
  modal=false,
  setModal=()=>{},
  handleDelete=()=>{}
}) => {

  return (
    <PureModal
        header=""
        footer={
            <div className="px-5 flex justify-content-between align-items-center">
              <button className="outlined" onClick={() => setModal(false)}>Cancel</button>
              <button className="danger" onClick={handleDelete}>Delete!</button>
            </div>
        }
        isOpen={modal}
        closeButton="X"
        closeButtonPosition="header"
        onClose={() => {
            setModal(false);
            return true;
        }}
    >
      <section>
        <img src="" alt="" />
        <h1 className="Display">Are you sure?</h1>
        <p>You will not be able to recover this product back</p>
      </section>
    </PureModal>
  )
}

export default CofirmPopUp