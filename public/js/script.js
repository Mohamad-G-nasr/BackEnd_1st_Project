let form = document.getElementById("form")
let address = document.getElementById("address")
let locationCS = document.getElementById("location")
let latitCS = document.getElementById("latit")
let longtitCS = document.getElementById("longtit")
let forcastCS = document.getElementById("forcast")
let errorCS = document.getElementById("error")

form.addEventListener('submit', (e) => {
    e.preventDefault()
    weatherfun()
    form.reset()
})

let weatherfun = async () => {
    try {
        const response = await fetch('http://localhost:3000/weather?address=' + address.value)
        const responseJson = await response.json()

        if (responseJson.error) {
            errorCS.innerHTML = responseJson.error
            locationCS.innerHTML = ""
            latitCS.innerHTML = ""
            longtitCS.innerHTML = ""
            forcastCS.innerHTML = ""
        } else {
            locationCS.innerHTML ="Country Name : " + responseJson.location
            latitCS.innerHTML = "Latitude : " + responseJson.latit
            longtitCS.innerHTML = "Longtitude : " + responseJson.longtit
            forcastCS.innerHTML =   "Forcast : " + responseJson.forcast
            errorCS.innerHTML = ""
        }
    } catch (e) {
        console.log(e)
    }
}