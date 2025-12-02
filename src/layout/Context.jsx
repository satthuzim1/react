import React, { createContext, useState } from 'react';

// Tạo Context
export const Count = createContext();

// Thành phần cung cấp giá trị cho Context
export const MyContextProvider = ({ children }) => {
  const [value, setValue] = useState(0);

  // Hàm để cập nhật giá trị của Context
  const updateCountValue = (newValue) => {
    setValue(newValue);
  };


  return (

      <Count.Provider value={{ value, updateCountValue }}>
        {children}
      </Count.Provider>
  );
};


// Thành phần sử dụng giá trị của Context và cập nhật giá trị
// const MyComponent = () => {
//   const { value, updateContextValue } = useContext(MyContext);

//   const handleClick = () => {
//     // Cập nhật giá trị của Context khi click vào nút
//     updateContextValue('new value');
//   };

//   return (
//     <div>
//       <p>Value from Context: {value}</p>
//       <button onClick={handleClick}>Update Context Value</button>
//     </div>
//   );
// };

// // Ứng dụng chính
// const App = () => {
//   return (
//     <MyContextProvider>
//       <MyComponent />
//     </MyContextProvider>
//   );
// };

// export default App;



// //custom react hook tuong tu nhu tren?
// export const useUpdateCart = () => {
//   const { value, updateCountValue } = useContext(Count);

//   const updateCount = (val) => {
//       updateCountValue(val)
//   }
//   return [value, updateCount]
// }

//component con
// const [value, updateCount] = useUpdateCart([])


//redirect
// return <Redirect to="/login" />;

//another way
// response.status === 401
// const history = useHistory();
// history.push('/login');