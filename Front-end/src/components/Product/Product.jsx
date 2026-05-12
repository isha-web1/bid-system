import { useState } from 'react';
import { Link } from 'react-router';
import thumbnail from '../../assets/thumbnail-card.png';

const Product = ({ product }) => {
    const { _id, title, price_min, price_max, image } = product;
    const [imgSrc, setImgSrc] = useState(image || thumbnail);

    const handleImageError = () => {
        setImgSrc(thumbnail);
    };

    return (
        <div className="card bg-base-100 shadow-sm">
            <figure className="px-4 pt-4">
                <img
                    src={imgSrc}
                    onError={handleImageError}
                    alt="Product"
                    className="rounded-xl" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>Price: ${price_min} - {price_max}</p>
                <div className="card-actions ">
                    <Link to={`/productDetails/${_id}`} className="btn btn-purple-600 w-full">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default Product;