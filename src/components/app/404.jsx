import Image404 from "../icons/extra/404";

export default function Error404() {
  return(
    <>
      <h1 className="title">¡Oops!</h1>
      <Image404 className="w-64 h-64 mx-auto my-8 text-gray-400"/>
      <div className="text-md font-bold mb-4 mx-4 align-middle text-center text-gray-700 dark:text-gray-300">
        <p>Lo sentimos, pero la página que estás buscando no se pudo encontrar.</p>
        <p>Retroceda o vuelva al Home</p>
      </div>
    </>
  );
}
