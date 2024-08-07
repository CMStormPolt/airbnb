import countries from 'world-countries';

interface formatedCountry {
    value: string,
    label: string,
    flag: string,
    latlng: [number, number],
    region: string
}

const formattedCountries = countries.map((country) => {
    return {
        value: country.cca2,
        label: country.name.common,
        flag: country.flag,
        latlng: country.latlng,
        region: country.region
    }
})

interface UseCountriesStore {
    getAll: () => formatedCountry[];
    getByValue: (value: string) => formatedCountry | undefined;
}

export const useCountries = (): UseCountriesStore => {
    const getAll = () => formattedCountries;

    const getByValue = (value: string) => {
        return formattedCountries.find((item) => {
            return item.value === value
        })
    }

    return {
        getAll,
        getByValue
    }
}