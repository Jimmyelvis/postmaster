

  export const invalidEmails = (emails) => {

    const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/


    let newEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => (re.test(email) === false && email !== ''))
    .map(email => " " + email + " ")

    if (newEmails.length) {


    return 'These email(s) are invalid:  ' + newEmails + " "

    }

    return ""

  }

