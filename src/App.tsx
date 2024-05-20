import { useReducer } from "react"
import { FaCalculator } from 'react-icons/fa';

import MyHeader from "./components/MyHeader";
import RadialProgress from "./components/RadialProgress"
import ButtonsPanel from "./components/ButtonsPanel";
import LastWeek from "./components/LastWeek";
import MyFooter from "./components/MyFooter";
import DailyCalculator from "./components/DailyCalculator";
import Modal from "./components/Modal";

import { modalReducer } from "./reducers/modalReducer";

function App() {
  const [calculatorModal, dispatchModal] = useReducer(modalReducer, { open: false });

  return (
    <>
      <main className="w-screen h-screen flex flex-col items-center justify-start pt-10 gap-10 bg-black z-0">
        <MyHeader />
        <FaCalculator
          className="text-silver absolute text-2xl right-10 top-10
            cursor-pointer hover:text-gold transition-all"
          onClick={() => dispatchModal({ type: 'open' })} />
        <RadialProgress />
        <ButtonsPanel />
        <Modal open={calculatorModal.open}>
          <DailyCalculator closeModal={() => dispatchModal({ type: "close" })} />
        </Modal>
        <LastWeek />
      </main>
      <MyFooter />
    </>
  )
}

export default App
