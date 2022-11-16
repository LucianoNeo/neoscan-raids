import { format, utcToZonedTime } from 'date-fns-tz';
import Image from 'next/image';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

function Items({ currentItems }) {
    if (!currentItems) return <h1>Carregando...</h1>

    return (
        <div className='overflow-x-auto'        >

            <table className='text-white gap-4 bg-[#1E293B] mb-4 rounded-lg text-xs'>
                <tbody>
                    <tr>
                        <th className='text-xl md:text-sm pl-4 md:p-4'>Pokémon</th>
                        <th className='text-xl md:text-sm md:p-4'>Ginásio</th>
                        <th className='text-xl md:text-sm pl-4 md:p-4'>Abre</th>
                        <th className='text-xl md:text-sm pl-4 md:p-4'>Fecha</th>
                        <th className='text-xl md:text-sm pl-4 md:p-4'>Coords</th>
                    </tr>
                    {currentItems &&
                        currentItems.map((item, index) => (

                            <tr key={index} className='bg-[#353535] border-t-[1px] border-white '>
                                <td className='px-4 flex items-center gap-4'>
                                    <Image src={item.pokemonImg} alt='pokemon img' width={80} height={80} />
                                </td>
                                <td className='px-4 text-xl'>{item.ginásio.toUpperCase()}</td>
                                <td className='px-4 text-xl'>{format(utcToZonedTime(item.inicio, 'America/Sao_Paulo'), 'HH:mm', { timeZone: 'America/Sao_Paulo' })}</td>
                                <td className='px-4 text-xl'>{format(utcToZonedTime(item.fim, 'America/Sao_Paulo'), 'HH:mm', { timeZone: 'America/Sao_Paulo' })}</td>
                                <td className='px-4'>{item.lat},{item.lon}</td>
                            </tr>

                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default function PaginatedItems({ itemsPerPage, items }) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel="Próximo >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< Anterior"
                renderOnZeroPageCount={null}
                containerClassName='pagination'
                activeClassName="active"
            />
        </>
    );
}