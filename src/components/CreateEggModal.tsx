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
    lon: string
}




export default function CreateEggModal(props: modalProps) {

    const tilemap = {
        "style": "klokantech-basic",
        "latitude": props.lat,
        "longitude": props.lon,
        "zoom": 17,
        "width": 200,
        "height": 200,
        "scale": 1,
        "markers": [
            {
                "url": `/assets/img/egg-level-${props.level}.png`,
                "latitude": props.lat,
                "longitude": props.lon,
                "width": 50,
                "height": 50
            }
        ]
    }


    interface Game {
        id: string,
        title: string,
    }



    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)

    async function handleCreateAd(e: FormEvent) {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        const data = Object.fromEntries(formData)

        if (!data.name) {
            return alert('Você deve preencher todos os campos!')
        }

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/matches`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })
            alert('Raid agendada com sucesso!')

        } catch (error) {
            console.log(error)
            alert('Erro ao criar agendamento!')
        }



    }



    useEffect(() => {
        // axios('http://localhost:3333/games')
        //     .then(response => {
        //         setGames(response.data)
        //     })
        // axios.post('https://tileserver.neoscan.com.br/staticmap', tilemap)
        //     .then(response => {
        //         console.log(response.data)
        //     })

    }, [])



    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed'
            />
            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25 z-20'
            >
                <Dialog.Title className='text-3xl font-black'>Agende uma Raid</Dialog.Title>
                <div className='h-24 my-4 flex items-center justify-start gap-2 '>
                    <img src={props.img} alt="" width={50} height={50} />
                    <div className='p-2 w-[50%]'>
                        <h1 className='font-bold'>Ovo Level {props.level}</h1>
                        <span>Ginásio: </span>
                        <h1 className='font-bold'>{props.gym}</h1>
                    </div>
                    <div className='w-[40%]'>
                        <select
                            className='bg-zinc-900 rounded py-3 px-4 text-sm placeholder:text-zinc-500'
                            id='game' name='game'>
                            <option disabled selected value=''>
                                Qual é o pokémon?
                            </option>
                            <option>Não sei ainda</option>
                            <option>Pokemon 1</option>
                            <option>Pokemon 2</option>
                            <option>Pokemon 3</option>


                        </select>

                    </div>
                </div>

                <form className='flex flex-col gap-4' onSubmit={handleCreateAd}>
                    <div className='flex items-center justify-between w-full'>

                        <div className='p-2 gap-2 flex flex-col w-[60%]'>
                            <h1>Qual é seu usuário?</h1>
                            <Input type="text" name="username" id="username" placeholder='Usuário no Pokémon GO' />
                        </div>

                        <div className=' flex flex-col gap-2 flex-1'>
                            <label htmlFor='game-type'>Como vai participar?</label>
                            <select
                                className='bg-zinc-900 rounded py-3 px-4 text-sm placeholder:text-zinc-500'
                                id='game-type' name='game-type'>
                                <option disabled selected value=''>
                                    Seu estilo de jogo
                                </option>
                                <option>🚶‍♂️ Presencial</option>
                                <option>✈ Remoto</option>
                            </select>

                        </div>

                    </div>

                    {/* <div className='flex flex-col gap-2'>
                        <label className='font-semibold' htmlFor='game'>Qual o game?</label>
                        <select
                            className='bg-zinc-900 rounded py-3 px-4 text-sm placeholder:text-zinc-500'
                            id='game' name='game'>
                            <option disabled selected value=''>
                                Selecione o game que deseja jogar
                            </option>

                            {games.map(game => {
                                return <option key={game.id} value={game.id}>{game.title}</option>

                            })}
                        </select>

                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name">Seu nome (ou nickname)</label>
                        <Input name='name' id='name' placeholder='Como te chamam dentro do game?' />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                            <Input name='yearsPlaying' id="yearsPlaying" type='number' placeholder='Tudo bem ser ZERO' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="discord">Qual o seu discord?</label>
                            <Input name='discord' id="discord" type='text' placeholder='Usuario#0000' />
                        </div>
                    </div> */}
                    <div className='flex w-full items-center justify-center'>
                        <div className='flex flex-col gap-2 items-center justify-center'>
                            <label htmlFor="hourStart">Qual horário de início?</label>

                            <Input type="time" name="hourStart" id="hourStart" min={props.min} max={props.max} />
                            {/*                                 
                                <Input type="time" name="hourEnd" id="hourEnd" placeholder='Até' /> */}

                            {/* <ToggleGroup.Root
                                type='multiple'
                                className='grid grid-cols-4 gap-2'
                                value={weekDays}
                                onValueChange={setWeekDays}
                            >
                                <ToggleGroup.Item
                                    value='0'
                                    className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : ' bg-zinc-900'}`}
                                    title='Domingo'>D</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='1'
                                    className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : ' bg-zinc-900'}`}
                                    title='Segunda'>S</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='2'
                                    className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : ' bg-zinc-900'}`}
                                    title='Terça'>T</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='3'
                                    className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : ' bg-zinc-900'}`}
                                    title='Quarta'>Q</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='4'
                                    className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : ' bg-zinc-900'}`}
                                    title='Quinta'>Q</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='5'
                                    className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : ' bg-zinc-900'}`}
                                    title='Sexta'>S</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='6'
                                    className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : ' bg-zinc-900'}`}
                                    title='Sábado'>S</ToggleGroup.Item>
                            </ToggleGroup.Root> */}

                        </div>
                        {/* <div className='flex flex-col gap-2 flex-1'>
                            <label htmlFor="hourStart">Qual horário do dia?</label>


                        </div> */}
                    </div>
                    {/* <label className='mt-2 flex gap-2 text-sm items-center'>
                        <Ckeckbox.Root
                            onCheckedChange={(checked) => {
                                if (checked == true) {
                                    setUseVoiceChannel(true)
                                } else {
                                    setUseVoiceChannel(false)
                                }
                            }}
                            className='w-6 h-6 rounded bg-zinc-900 p-1'
                        >
                            <Ckeckbox.Indicator>
                                <Check className='w-4 h-4 text-emerald-400' />
                            </Ckeckbox.Indicator>
                        </Ckeckbox.Root>
                        Costumo me conectar ao chat de voz
                    </label> */}
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
