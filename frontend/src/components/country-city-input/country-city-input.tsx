import { useEffect, useState } from 'react';
import {
  Control,
  FieldErrors,
  FieldPath,
  FieldValues,
  useWatch,
} from 'react-hook-form';
import { Country, City, ICountry, ICity } from 'country-state-city';
import { SelectOption } from '~/common/types/types.js';
import { Select } from '../components';
import styles from './styles.module.css';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors?: FieldErrors<T>;
  countryName: FieldPath<T>;
  cityName: FieldPath<T>;
  cityLabel: string;
  countryLabel: string;
};

export const CountryCityInput = <T extends FieldValues>({
  control,
  countryName,
  cityName,
  cityLabel,
  countryLabel,
  errors,
}: Properties<T>) => {
  const [countryOptions, setCountryOptions] = useState<SelectOption<string>[]>(
    []
  );
  const [cityOptions, setCityOptions] = useState<SelectOption<string>[]>([]);

  const selectedCountry = useWatch({
    control,
    name: countryName,
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countries = await Country.getAllCountries();
        setCountryOptions(
          countries.map((country: ICountry) => ({
            label: country.name,
            value: country.isoCode,
          }))
        );
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const fetchCities = async () => {
        try {
          const cities = await City.getCitiesOfCountry(selectedCountry);
          setCityOptions(
            cities
              ? cities.map((city: ICity) => ({
                  label: city.name,
                  value: city.name,
                }))
              : []
          );
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };

      fetchCities();
    } else {
      setCityOptions([]);
    }
  }, [selectedCountry]);

  return (
    <div className={styles['container']}>
      <Select
        control={control}
        errors={errors}
        name={countryName}
        label={countryLabel}
        placeholder="Select a country"
        options={countryOptions}
        isSearchable
      />

      <Select
        control={control}
        errors={errors}
        name={cityName}
        label={cityLabel}
        placeholder="Select a city"
        options={cityOptions}
        isDisabled={!selectedCountry}
        isSearchable
      />
    </div>
  );
};
