import { useCartCount } from "../context/store-context-selector";
      const CartCountSection = () => {
        const cartCount = useCartCount();
        return <div>Cart count: {cartCount}</div>;
      };
       export default CartCountSection;
      
      