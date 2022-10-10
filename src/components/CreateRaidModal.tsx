import * as  Dialog from '@radix-ui/react-dialog'
import * as  Ckeckbox from '@radix-ui/react-checkbox'
import * as  ToggleGroup from '@radix-ui/react-toggle-group'
import { Check, GameController } from 'phosphor-react'
import Input from './Form/Input'
import { useEffect, useState, FormEvent } from 'react'
import axios from 'axios'

interface modalProps {
    min: string
    max: string
    level: number,
    img: string,
    gym: string,
    lat: string,
    lon: string,
    pokemonName: string,
    gymId: string,
}




export default function CreateRaidModal(props: modalProps) {


    interface Game {
        id: string,
        title: string,
    }



    const [games, setGames] = useState<Game[]>([])


    async function handleCreateAd(e: FormEvent) {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        const data = Object.fromEntries(formData)

        if (!data.username) {
            return alert('Você deve preencher todos os campos!')
        }

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/matches`, {
                username: data.username,
                playType: data.playType,
                hourStart: data.hourStart,
                hourEnd: props.max,
                pokemonName: props.pokemonName,
                pokemonImg: props.img,
                gymName: props.gym,
                gymId: props.gymId
            })
            alert('Raid agendada com sucesso!')

        } catch (error) {
            console.log(error)
            alert('Erro ao criar agendamento!')
        }



    }



    useEffect(() => {

    }, [])



    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed'
            />
            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25 z-20'
            >
                <Dialog.Title className='text-3xl font-black'>Agende uma Raid</Dialog.Title>
                <div className='h-24 my-4 flex items-stretch justify-start gap-2 '>
                    <div className='flex flex-col items-center'>
                        <div className='w-20 overflow-hidden rounded-2xl flex items-center justify-center'>
                            <img src={props.img} alt="" />
                        </div>
                        <span className='font-extrabold text-blue-600'> {props.pokemonName.toUpperCase()}</span>
                    </div>
                    <div className='p-2 w-[50%]'>
                        <h1 className='font-bold'>Raid Level {props.level}</h1>
                        <span>Ginásio: </span>
                        <h1 className='font-bold'>{props.gym}</h1>
                    </div>

                </div>

                <form className='flex flex-col gap-4' onSubmit={handleCreateAd}>
                    <div className='flex items-center justify-between w-full'>

                        <div className='p-2 gap-2 flex flex-col w-[60%]'>
                            <h1>Qual é seu usuário?</h1>
                            <Input type="text" name="username" id="username" placeholder='Usuário no Pokémon GO' />
                        </div>

                        <div className=' flex flex-col gap-2 flex-1'>
                            <label htmlFor='play-type'>Como vai participar?</label>
                            <select
                                className='bg-zinc-900 rounded py-3 px-4 text-sm placeholder:text-zinc-500'
                                id='play-type' name='play-type'>
                                <option disabled selected value=''>
                                    Seu estilo de jogo
                                </option>
                                <option>🚶‍♂️ Presencial</option>
                                <option>✈ Remoto</option>
                            </select>

                        </div>

                    </div>


                    <div className='flex w-full items-center justify-center'>
                        <div className='flex flex-col gap-2 items-center justify-center'>
                            <label htmlFor="hourStart">Qual horário deseja iniciar a Raid?</label>

                            <Input type="time" name="hourStart" id="hourStart" min={props.min} max={props.max} />

                        </div>
                    </div>

                    <footer className='mt-4 flex justify-end gap-4'>
                        <Dialog.Close
                            className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                            Cancelar
                        </Dialog.Close>
                        <button
                            className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
                            type='submit'>
                            <GameController size={24} />
                            Marcar Raid
                        </button>
                    </footer>
                </form>

            </Dialog.Content>
        </Dialog.Portal>
    )
}
