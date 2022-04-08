import { RiverReading } from './models/RiverReading'
import { fetchRiverReadingData } from './services/river_reading_service'
import { saveToCsvFile } from './utils/file_utils'

let date = new Date()
let day = String(date.getDate())
let month = String(date.getMonth() + 1)
let year = date.getFullYear()

let presentDate = `${year}/${month}/${day}`
let dateLessSeven = new Date(presentDate)
dateLessSeven.setDate(dateLessSeven.getDate() - 7)

var riverNames = [
  {
    stationCode: '66945000',
    riverName: 'Rio Aquidauana'
  },
  {
    stationCode: '66870000',
    riverName: 'Rio Taquari'
  },
  {
    stationCode: '66825000',
    riverName: 'Rio Paraguai'
  },
  {
    stationCode: '66900000',
    riverName: 'Rio Miranda'
  },
  {
    stationCode: '63970000',
    riverName: 'Rio Pardo'
  },
]

const getRiverReadingList = async (
  riverNames: any[],
  initialDate: Date,
  finalDate: Date 
) => {

  var riverReadingList = []

  for (let river of riverNames){
    const readings: RiverReading[] = await fetchRiverReadingData(
      river.stationCode,
      river.riverName,
      initialDate,
      finalDate
    )

  riverReadingList.push(readings)
  }

  return riverReadingList.flat()

}
      const generateRiverDataFiles = async (
          readings: RiverReading[]

    ) => {

      saveToCsvFile(readings, 'leituras.csv')
      console.log('Planilha gerada!')

    }

      const worksheet = async () => {
        let readings = await getRiverReadingList(riverNames, new Date(dateLessSeven), new Date(presentDate))
        generateRiverDataFiles(readings)

  }

  worksheet()
