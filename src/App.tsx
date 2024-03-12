// import { useTranslation } from "react-i18next";

import RadialProgress from "./components/RadialProgress"


function App() {
  // const { t } = useTranslation();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="text-gold text-3xl flex flex-col">
        <p>Protein</p>
        <p className="pl-12">Tracker</p>
      </h1>
      <RadialProgress currentValue={30} maxValue={86} />
    </div>
  )
}

export default App
