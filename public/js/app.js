console.log('some message from js file')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent='Type in a city name or postal code'
messageTwo.textContent=''
weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    messageOne.textContent='Loading search...'
    messageTwo.textContent=''
    const location = search.value
    console.log(location)
    const url = 'http://localhost:3000/weather?address=' + location
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                messageOne.textContent = data.error
            }else{
                console.log(data.location)
                messageOne.textContent=data.location
                console.log(data.forecast)
                messageTwo.textContent= data.forecast
            }
        })
    })
})

