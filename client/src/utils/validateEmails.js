// export const invalidEmails = (emails) => {

//     const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/


//     let newEmails = emails
//     .split(',')
//     .map(email => email.trim())
//     .filter(email => (re.test(email) === false && email !== ''))
//     .map(email => " " + email + " ")

//     if (newEmails.length) {


//     return 'These email(s) are invalid:  ' + newEmails + " "

//     }

//     return ""

//   }

export const invalidEmails = (emails) => {
  const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  let emailArray = emails.split(',').map(email => email.trim());
  let invalidEmails = [];
  let duplicates = [];

  // Using a Set for efficient duplicate detection
  const seenEmails = new Set();

  for (const email of emailArray) {
      if (seenEmails.has(email)) {
          // Found a duplicate
          duplicates.push(email);
      } else {
          seenEmails.add(email);
          if (re.test(email) === false && email !== '') {
              invalidEmails.push(email);
          }
      }
  }

  let response = "";

  if (invalidEmails.length) {
      response += 'These email(s) are invalid: ' + invalidEmails.join(', ') + '. ';
  }

  if (duplicates.length) {
      response += 'These email(s) are duplicates: ' + duplicates.join(', ') + '. ';
  }

  return response;
}

