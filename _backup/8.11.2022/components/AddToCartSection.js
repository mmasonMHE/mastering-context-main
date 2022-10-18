import { useAddToCart} from "../context/store-context-selector";
      const AddToCartSection = () => {
        const addToCart = useAddToCart();
        return (
          <div>
            <button onClick={addToCart}>Add To Cart</button>
          </div>
        );
      };
      export default AddToCartSection
     