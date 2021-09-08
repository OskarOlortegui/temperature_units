const sideA_output = document.querySelector('#sideA_output')
const sideB_output = document.querySelector('#sideB_output')
const selectInputs = document.querySelectorAll('.selectInput')

function toFahrenheit(num) {
    return ((num * (9/5)) + 32)
}
function toCelsius(num){
    return ((num - 32) * (5/9))
}
function toKelvin(num){
    return (num + 273.15)
}

let params = {
    a_curr_val: 'celsius',
    b_curr_val: 'fahrenheit'
}

function Main(entry) {
    let {a_curr_val, b_curr_val} = params;

    let units = JSON.stringify(Object.values(params));
    console.log(units)

    switch (units) {
        case JSON.stringify(["celsius","fahrenheit"]):
            sideB_output.value = toFahrenheit(+entry).toFixed(2)
            break;
        case JSON.stringify(["celsius","kelvin"]):
            sideB_output.value = toKelvin(+entry).toFixed(2)
            break;
        case JSON.stringify(["fahrenheit","kelvin"]):
            sideB_output.value = toKelvin(toCelsius(+entry)).toFixed(2)
            break;
        case JSON.stringify(["fahrenheit","celsius"]):
            sideB_output.value = toCelsius(+entry).toFixed(2)
            break;
        case JSON.stringify(["kelvin","celsius"]):
            sideB_output.value = (+entry - 273.15).toFixed(2)
            break;
        case JSON.stringify(["kelvin","fahrenheit"]):
            sideB_output.value = toFahrenheit(+entry - 273.15).toFixed(2)
            break;
        default:
            console.log('wubba lubbu dub dub')
            if(a_curr_val == b_curr_val){
                sideB_output.value = entry
            }
            break;
    }
}

function validation(entry) {
    if(!entry || isNaN(entry)){
        sideB_output.value = null //stays with the placeholder text
        return //it will break the function by doing nothing
    }
    else{
        Main(entry)
    }
}

function setParams(i,ind) {
    let val = i.value
        if(ind === 0) params.a_curr_val = val
        else params.b_curr_val = val
}

sideA_output.addEventListener('input', (e)=>{
    let entry = e.target.value
    validation(entry)
})

selectInputs.forEach((i,ind) => {
    i.addEventListener('change',()=>{
        setParams(i,ind)
        //console.log(params)

        let entry = sideA_output.value
        validation(entry)

         // console.log(i.selectedIndex)
         i.querySelectorAll('option').forEach((y,index)=>{
            if(y.hasAttribute("selected")){
                y.removeAttribute("selected")
            }
            else if(i.selectedIndex === index){
                y.setAttribute("selected", "selected")
            }
        })
        
    })
})