import MainComponent from "./components/maincomponent";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <MainComponent />;
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      ;
    </>
  );
}

export default App;
