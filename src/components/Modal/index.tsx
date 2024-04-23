type ModalProps = {
  open: boolean;
  children: React.ReactNode
}

export default function Modal({ open, children }: ModalProps) {
  return (
    <section className={`transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      w-screen h-screen flex items-center justify-center absolute top-0 left-0`}>
      <div className={`bg-black transition-opacity duration-300 ${open ? 'opacity-85 z-10' : 'opacity-0 -z-20'} w-screen h-screen absolute top-0 left-0`}>
      </div>
      <div className={`${open ? 'z-20' : '-z-20'}`}>
        {children}
      </div>
    </section>
  )
}