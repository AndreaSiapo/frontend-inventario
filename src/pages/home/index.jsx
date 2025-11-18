import IconRowRight from "../../components/icons/actions/row-right";

const Index = () => {
    return (
        <>
          <div className="text-gray-400 body-font container px-5 pb-24 mx-auto flex flex-col">
            <div className="lg:w-4/6 mx-auto">
              <div className="rounded-lg h-20 overflow-hidden">
                <img alt="content" className="object-cover object-center h-20 w-full" src="https://i.pinimg.com/736x/f9/7b/cd/f97bcdf5afe8474461c40f955ce0ec4d.jpg"/>
              </div>
              <div className="flex flex-col sm:flex-row mt-10">
                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                  <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-900 text-gray-600">
                    <img className="w-18 h-18 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user" />
                  </div>
                  <div className="flex flex-col items-center text-center justify-center">
                    <h2 className="font-medium title-font mt-4 text-white text-lg">Persona Temporal</h2>
                    <div className="w-12 h-1 bg-blue-500 rounded mt-2 mb-4"></div>
                    <p className="text-base text-gray-400">Puesto de la persona o usuario.</p>
                  </div>
                </div>
                <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Bienvenido al Sistema de Inventarios</h1>
                  <p className="leading-relaxed text-lg mb-4">Este espacio está diseñado para ayudarte a gestionar productos, unidades, categorías y movimientos con rapidez y claridad. Explora las opciones del menú y mantén tu inventario siempre bajo control.</p>
                  <a className="text-blue-400 inline-flex items-center">Panel de control
                    <IconRowRight />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
    );
}

export default Index;