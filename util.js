function dataCallback(response) {
    console.log("dataCallback", response)
    message = document.getElementById ("captcha").message
    window.location.href = "/checkRecaptcha?response=" + encodeURIComponent(response) + message
}
function dataExpiredCallback() {
    console.log("dataExpiredCallback")
}

function submit () {
    inputs = document.getElementById ("contact-form").querySelectorAll ("input")
    data = ''
    for (i of inputs) {
        console.log (i.id, i.value)
        if (i.value == '') {
            alert ("Kindly fill all fields before submitting")
            i.focus ()
            return
        }

        data = data + '&' + i.id + '=' + i.value 
    }

    captcha = document.getElementById ("captcha")
    captcha.message = data // ("message", data)
    console.log (data)
    alert ('s')
    captcha.classList.remove ('d-none')
}