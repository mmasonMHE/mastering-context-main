import { useState, useCallback, useEffect } from "react"; //Handles the useState and the callbacks from subscribers
import { createContext, useContextSelector } from "use-context-selector"; //Allows for only partial section updates

const userDataStore = () => { //Creates the store for user data
  //================== STATE OBJECTS ========================//
  const [user, setUser] = useState(""); //No User
  const [cartCount, setCartCount] = useState(0); //No count
  const [baseColor, setBaseColor] = useState("#ababab");

  //================== STATE OBJECTS ========================//


  return { //Callback accessors
    user, //Value stored in user
    cartCount, //Value stored in cartCount
    baseColor, //color to be used elsewhere
    setBaseColor : useCallback((color)=>{setBaseColor(color)},[]), //Sets color in another area
    login: useCallback(() => setUser("John Doe"), []), //login -> calls setUser useState hook via useCallback 
    logout: useCallback(() => setUser(null), []), //logout -> calls setUser useState hook via useCallback 
    addToCart: useCallback(() => setCartCount((v) => v + 1), []), //addToCart -> calls setCartCount useState hook via useCallback 
  };
};

const StoreContext = createContext(null); //Creates the new context

export const StoreContextProvider = ({ children }) => (
  <StoreContext.Provider value={userDataStore()}>{children}</StoreContext.Provider>
  //Sets the dataprovider and exposes returned object from userDataStore
);

//Keeps the context calls agnostic
export const useLogin = () => useContextSelector(StoreContext, (s) => s.login); //sets useLogin to useContextSelector(contextToUse, store as s => store.login)
export const useLogout = () =>  useContextSelector(StoreContext, (s) => s.logout);
export const useAddToCart = () =>  useContextSelector(StoreContext, (s) => s.addToCart);
export const useUser = () => useContextSelector(StoreContext, (s) => s.user);
export const useCartCount = () =>  useContextSelector(StoreContext, (s) => s.cartCount);
export const useBaseColor = () => useContextSelector(StoreContext, (s)=> s.baseColor)
export const setBaseColor = () => useContextSelector(StoreContext, (s)=> s.setBaseColor)
