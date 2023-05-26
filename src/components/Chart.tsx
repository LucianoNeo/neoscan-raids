import axios from "axios";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const data = [
    ['Level', 'Raids por dia'],
];

export default function RaidsChart() {

    const [isLoading, setIsLoading] = useState(true)

    async function getCount(maxlevel) {
        for (let index = 0; index < maxlevel; index++) {
            const level = await axios.get(`/api/raidLevel/${index + 1}`)
            const array = [`Level ${index + 1}`.toString()]
            array.push(level.data)
            data.push(array)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getCount(9)
    }, [])



    const options = {
        title: "% DE RAIDS NAS ÚLTIMAS 24 HORAS",
        titleTextStyle: {
            fontSize: 18,
            color: 'white'
        },
        pieHole: 0.4,
        is3D: true,
        backgroundColor: '#1E293B',
        legend: {
            textStyle: {
                color: 'white'
            }
        }

    };

    return (
        <div className='text-white font-bold py-4'>
            {!isLoading &&
                <Chart
                    chartType="PieChart"
                    width="100vw"
                    height="400px"
                    data={data}
                    options={options}
                    style={{ backgroundColor: '#222' }}
                />
            }
        </div>

    )
}





