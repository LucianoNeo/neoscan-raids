import { LinkedinLogo, GithubLogo } from 'phosphor-react'

export default function Footer() {
    return (
        <footer className="flex items-center h-28 lg:h-14 bg-slate-900 text-white overflow-hidden lg:w-[100vw] w-[165vw] z-50 justify-end text-2xl lg:text-xs gap-5 px-5">
            <span>Desenvolvido por LucianoNeo 2022</span>
            <a href="https://linkedin.com/in/lucianoneo" target='_blank' rel="noreferrer"><LinkedinLogo className='lg:w-10 lg:h-10 w-16 h-16' /></a>
            <a href="https://github.com/lucianoneo" target='_blank' rel="noreferrer"><GithubLogo className='lg:w-10 lg:h-10 w-16 h-16' /></a>
        </footer>
    )
}
