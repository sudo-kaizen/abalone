import { createContext, useContext, useState } from 'react';
const defaultVal = {
  prop: 'val',
};
const UserSelectionContext = createContext();
export const useUserSelection = () => useContext(UserSelectionContext);
const UserSelectionProvider = ({ children }) => {
  const [val, setVal] = useState(defaultVal);

  return (
    <UserSelectionContext.Provider value={{ val, setVal }}>
      {children}
    </UserSelectionContext.Provider>
  );
};

export default UserSelectionProvider;
