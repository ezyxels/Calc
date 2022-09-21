import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';

import './App.css';


import MultiRangeSlider from './components/multiRangeSlider/Slider';
import BasicRangeSlider from './components/basicRangeSlider/Slider';

function App() {
  return (
    <div className="App flex flex-col">  
      <Calculator />
	  </div>
	);
}

export default App;

function Calculator(){
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputData, setInputData] = useState({vaha:  {min: 0, max: 100}, vydelek: {min: 5000, max: 50000}, susenek: 0, rohliku: 0});

  function changeData(id: string, value: number, value1: number){
    if(value1 === undefined){
      setInputData(prevState => ({...prevState, [id] : value}));
   }
   else{
    setInputData(prevState => ({...prevState, [id] : {min: value, max: value1}}));
   }
  }

  return(
    <>
    <div className="flex flex-col">
      <div className='mt-24'>
        <MultiRangeSlider 
          changeData={changeData}
          id={"vaha"} 
          min={0} max={100} 
          title={"Kolik kilo vážím?"} unit={"kg"}
        />
        <MultiRangeSlider 
          changeData={changeData}
          id={"vydelek"} 
          min={5000} max={50000} 
          title={"Kolik chci vydělávat?"} unit={"kč"}
        />
        <BasicRangeSlider
          changeData={changeData}
          id={"susenek"}
          min={0} max={500} skip={10}
          title={"Kolik mi zbývá sušenek?"} unit={"kusů"}
        />
        <BasicRangeSlider
          changeData={changeData}
          id={"rohliku"} 
          min={0} max={150} skip={25}
          title={"Kolik mi zbývá rohlíků?"} unit={"kusů"}
        />
      </div>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="w-fit mx-auto rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Odeslat!
      </button>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} inputData={inputData}/>
    </div>
  </>
  )
}

interface ModalProps{
  isModalOpen: boolean;
  setIsModalOpen: any;
  inputData: any;
}

function Modal({ isModalOpen, setIsModalOpen, inputData } : ModalProps){
  const [isOpen, setIsOpen] = useState(Boolean)
  const [email, setEmail] = useState(String)
  const [emailVerified, setEmailVerified] = useState(Boolean)
  const [emailAlert, setEmailAlert] = useState(Boolean)

  useEffect(() => {
   setIsOpen(isModalOpen) 
  }, [isModalOpen])

  function verifyEmail(){
    if(/^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(email)){
      setEmailVerified(true)
    }
    else{
      setEmailAlert(true)
      setTimeout(() => {
        setEmailAlert(false);
      }, 2500)

    }
  }
  
  return(
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {!emailVerified ?
              <Dialog.Panel className="flex flex-col w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Prosím zadejte email
                </Dialog.Title>
                <p className="mt-2 text-sm text-gray-500">
                  Pro zobrazení vašich výsledků prosím zadejte Vaší emailovou adresu.
                </p>
                <p className='text-red-500'>{emailAlert && "Prosím zadejte platný email!"}</p>
                <input 
                  type="email"
                  name="email"
                  id="email"
                  className='mt-5 after:border-solid border-2 rounded-md border-blue-200'
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="button"
                  className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={() => verifyEmail()}
                >
                  Odeslat!
                </button>
              </Dialog.Panel>
             :  
              <Dialog.Panel className="flex flex-col w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Děkujeme za vyplnění dotazníku
                </Dialog.Title>
                <p className="mt-2 text-sm text-gray-500">
                  Vaše výsledky můžete naleznout níže
                </p>
                <div className="w-full flex flex-col">
                  {Object.entries(inputData).map((e:any, index:number) =>(
                    <div className="flex flex-row justify-between mt-5" key={index}>
                      <p>{e[0]}</p>
                      {(typeof e[1] === 'object' && e[1] !== null) ?
                        <div>
                          <p>Min {e[1].min}</p>
                          <p>Max {e[1].max}</p>
                        </div>
                      : 
                       <p>{e[1]}</p>}
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            }
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
