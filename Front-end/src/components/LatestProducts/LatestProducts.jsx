import Product from '../Product/product';

const LatestProducts = ({ latestProducts }) => {
    const products = latestProducts || [];
    console.log(latestProducts);

    return (
        <div>
            <h2 className="text-5xl text-center font-extrabold mt-12 mb-8">Recent <span className='text-purple-600'>Products</span></h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                    ></Product>)
                }
            </div>
        </div>
    );
};

export default LatestProducts;