

export default function Header() {
    return (
        <header className="flex items-center h-16 lg:h-12 sticky top-0 bg-slate-900 text-white overflow-hidden lg:w-[100vw] w-[165vw] z-50">
            <img src="./assets/img/rotom.gif" alt="rotom" width={80} className='translate-y-2 bg-slate-900 z-50' />
            <div className="flex whitespace-nowrap gap-2 text-xl lg:text-xs lg:animate-bannerWeb animate-bannerMobile absolute z-40 right-[-1700px]">
                <h1 className="">CONHEÇA O NEOSCAN! Além de raids você terá acesso a notificações de pokémon 100%, rank1 para PVP, quests, invasões Rocket e muito mais! Para saber mais</h1>
                <a className="font-extrabold" href="https://neoscan.com.br" target='_blank' rel="noreferrer">CLIQUE AQUI!</a>
            </div>

        </header>
    )
}
