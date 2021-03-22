import {useState, useEffect} from 'react'
import { MenuItem, FormControl, Select, CardContent, Card } from '@material-ui/core'
import InfoBox from './InfoBox'
import Map from './Map'
import './App.css';



function App() {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("Worldwide")

  //Pull dat from the opened Online API https://desease.sh/v3/covid-19/countries
  // USEEFFECT rus a piece of code based on a given condition and

  useEffect(() => {
    //The code inside here will run once shen the app loads depending onn the change in the variable in the table in params
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data)=> {
        const countries = data.map((country)=>({
          name: country.country,
          value: country.countryInfo.iso2
        }))

        setCountries(countries)
      })
    }

    getCountries()
  },[])

  const onChangeCountry = async (event) => {
    const countryCode = event.target.value
    setCountry(countryCode)
  }

  return (
    <div className="app">
      <div className="app__left">
         <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        {/* dropdown menu to select countries*/}
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onChangeCountry}>
            <MenuItem value="worlwide">Worldwide</MenuItem>
            {
              countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
      
      

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={123} total={2000}/>
          <InfoBox title="Recovered" cases={1234} total={3000}/>
          <InfoBox title="Deaths" cases={12345} total={4000}/>
        </div>
        <Map/>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
           {/** Table */}
           <h3>Worldwide new cases</h3>
            {/** Graph */} 
        </CardContent> 
      </Card>
    </div>
  );
}

export default App;
