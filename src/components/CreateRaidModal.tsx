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
    gymTeam: number
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


            const dataFull = {
                username: data.username,
                playType: data.playType,
                hourStart: new Date(2022, 11, 10),
                hourEnd: new Date(2022, 11, 10),
                raidLevel: props.level,
                pokemonImg: props.img,
                pokemonName: props.pokemonName,
                gym: props.gym,
                id: props.gymId,
                raidId: props.gymId,
                gymTeam: props.gymTeam,
                playerLevel: Number(data.playerLevel),
                lat: `${props.lat}`,
                lon: `${props.lon}`,
                team: data.team
            }
            console.log(dataFull)
            await axios.post('/api/matches', dataFull)
            location.reload()
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
                <form className='flex flex-col gap-4' onSubmit={handleCreateAd}>
                    <div className=' my-4 flex items-center justify-start gap-2'>
                        <img src={props.img} alt="" width={100} height={100} />
                        <div className='p-2 w-[50%]'>
                            <h1 className='font-bold text-blue-500'>{props.pokemonName.toUpperCase()}</h1>
                            <span>Ginásio: </span>
                            <h1 className='font-bold'>{props.gym}</h1>
                        </div>

                    </div>



                    <div className='flex items-center w-full flex-col'>

                        <div className='w-full flex items-center justify-between'>
                            <div className='gap-2 flex flex-col'>
                                <h1>Qual é seu usuário?</h1>
                                <Input type="text" name="username" id="username" placeholder='no Pokémon GO'
                                />
                            </div>

                            <div className=' flex flex-col gap-2'>
                                <label htmlFor='playerLevel'>Qual o seu nível?</label>
                                <Input
                                    name='playerLevel'
                                    id='playerLevel'
                                    type='number'
                                    placeholder='Digite seu nível'
                                    min={5}
                                    max={50}
                                />
                            </div>

                        </div>

                        <div className='w-full flex items-center justify-between'>
                            <div className=' flex flex-col gap-2 mt-1'>
                                <label htmlFor='playType'>Como vai participar?</label>
                                <select
                                    className='bg-zinc-900 rounded py-3 px-4 text-sm placeholder:text-zinc-500 w-48'
                                    id='playType' name='playType'>
                                    <option disabled selected value=''>
                                        Seu estilo de jogo
                                    </option>
                                    <option>🚶‍♂️</option>
                                    <option>✈</option>
                                </select>

                            </div>

                            <div className=' flex flex-col gap-2 mt-1'>
                                <label htmlFor='team'>Qual a sua equipe?</label>
                                <select
                                    className='bg-zinc-900 rounded py-3 px-4 text-sm placeholder:text-zinc-500'
                                    id='team' name='team'>
                                    <option disabled selected value=''>
                                        Selecione sua equipe
                                    </option>
                                    <option value='valor'>
                                        Valor
                                    </option>
                                    <option value='instinct'>
                                        Instinct
                                    </option>
                                    <option value='mystic'>
                                        Mystic
                                    </option>
                                </select>

                            </div>

                        </div>


                    </div>

                    <div className='flex w-full items-center justify-center'>
                        <div className='flex flex-col gap-2 items-center justify-center'>
                            <label htmlFor="hourStart">Qual horário de início?</label>

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
