import { StoreContextProvider } from "../../context/store-context-selector";
import { MenuContextProvider } from "../../context/menu-context-selector";
import AddToCartSection from '../../components/AddToCartSection'
import CartCountSection from "../../components/CartCountSection";
import ColorSection  from "../../components/ColorSection";
import LoginSection from "../../components/LoginSection";
import UserSection from "../../components/UserSection";
import PrimaryMenu from "../../components/PrimaryMenu"; 
import Footer from "../../components/Footer";
import { useState } from "react";
import SecondaryMenu from "../../components/SecondaryMenu";
function ContextPage() {
  const [menu,setMenu] = useState(null)
  return (
    <div>
      <PrimaryMenu/>
      <LoginSection />
      <UserSection />
      <AddToCartSection />
      <CartCountSection />
      <ColorSection/> 
      <SecondaryMenu/>
    </div>
  );
}

export default function ContextPageWrapper() {
  return (
    <StoreContextProvider>
      <MenuContextProvider>        
         <ContextPage />
      </MenuContextProvider>     
    </StoreContextProvider>
  );
}
