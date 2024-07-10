import Link from "next/link";
import PokedexList from "@/app/pokedex/page";

export default function Home() {
  return (
    <main className="p-12">
      <div className="w-full font-mono text-sm">
        <h1 className='w-full border border-solid rounded-2xl border-white text-center text-3xl py-5 mb-5'>Base de données Pokémon</h1>

        {/* <PokedexList /> */}
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <Link href={"/version"}>
            <button className="px-4 py-2 font-semibold text-sm bg-violet-500 text-white rounded-md shadow-sm hover:scale-125 ease-in-out duration-150">
              LES VERSIONS
            </button>
          </Link>
        </p>

        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <Link href={"/pokedex"}>
            <button className="px-4 py-2 font-semibold text-sm bg-violet-500 text-white rounded-md shadow-sm hover:scale-125 ease-in-out duration-150">
              LES POKÉDEX
            </button>
          </Link>
        </p>

        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <Link href={"/pokemonSpecies"}>
            <button className="px-4 py-2 font-semibold text-sm bg-violet-500 text-white rounded-md shadow-sm hover:scale-125 ease-in-out duration-150">
              TOUTES LES ESPÈCES
            </button>
          </Link>
        </p>

        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <Link href={"/pokemon"}>
            <button className="px-4 py-2 font-semibold text-sm bg-violet-500 text-white rounded-md shadow-sm hover:scale-125 ease-in-out duration-150">
              TOUS LES POKÉMON
            </button>
          </Link>
        </p>
        
      </div>
    </main>
  );
}
