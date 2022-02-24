import React from 'react'

const ProductMeta = ({ total=0 }) => {
  return (
    <p style={{ opacity: 0 }} className="resp-w mx-auto flex justify-content-start">
        {`${total} ${total === 1 ? 'product' : 'products'} total`}
    </p>
  )
}

export default ProductMeta