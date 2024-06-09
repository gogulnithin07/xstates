import { useEffect, useState } from "react"

function Comp(){
    const [country,setCountry]=useState("");
    const [countryList,setCountryList]=useState([]);
    const [stateList,setStateList]=useState([]);
    const [state,setState]=useState("")
    const [cityList,setCityList]=useState([]);
    const [city,setCity]=useState("");
useEffect(()=>{
    async function getState(){
        try{
        const req=await fetch("https://crio-location-selector.onrender.com/countries");
    if(!req.ok){
        throw new Error(`HTTP error! status: ${req.status}`);
    }
        const res=await req.json();
        console.log(res)
        setCountryList((c)=>[...res])
    }catch(error){
        console.log(error);
    }
}
    getState();
},[])
useEffect(()=>{

    async function getState(){
        try{
        const req=await fetch(`https://crio-location-selector.onrender.com/country=${country}/states`);
        const res=await req.json();
        console.log(res)
        setStateList((c)=>[...res])
        setCity("")
        setState("");
        }catch(error){
            console.log(error)
        }

    }
    getState()
},[country])
useEffect(()=>{
    async function getState(){
        try{
        const req=await fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`);
        const res=await req.json();
        console.log(res)
        setCityList((c)=>[...res])
        }catch(error){
            console.log(error)
        }
    }
    getState()
},[state])
    return <div>
        <h1>Select Location</h1>
        <select
        value={country}
        onChange={(e)=>setCountry(e.target.value)}>
        <option value="" disabled>Select Country</option>
            {countryList.map((val)=>{
                return <option value={val}>{val}</option>
            })}
        </select>
        <select
        value={state}
        
        onChange={(e)=>setState(e.target.value)}>
        <option value="" disabled>Select State</option>

            {stateList.map((val)=>{
                return <option value={val}>{val}</option>
            })}
        </select>
        <select 
        value={city}
        onChange={(e)=>setCity(e.target.value)}>
        <option 
        value=""
        disabled>Select City</option>
            {cityList.map((val)=>{
                return <option value={val}>{val}</option>
            })}
        </select>
        {city&&<h2>You selected {city}, {state}, {country}</h2>}
    </div>
}
export {Comp}