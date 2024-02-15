const keys = require('../../config/keys');

module.exports = (survey, profile) => {
  const flex = `
    display: flex; 
    justify-content: center;
    gap: 10px; 
    align-items: center;
  `.trim().replace(/\s*\n\s*/g, ' ');

  const footer = `
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  `.trim().replace(/\s*\n\s*/g, ' ');

  if (profile) {
    console.log('====================================');
    console.log('surveyTemplate.js: profile: ', profile);
    console.log('====================================');

  }

  /* html */
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>We'd love to have your feedback!</h3>
          <p>Please answer the following question:</p>
          <p>${survey.body}</p>
          <div style="${flex}">
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes" style="margin: 0 10px;">Yes</a>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no" style="margin: 0 10px;">No</a>
          </div>
        </div>

        <div style="${footer}">
          <p>Thank you for your time!</p>
          ${profile && profile.company_name ? 
            `<p>${profile.company_name}</p>` : ''}
          ${profile && profile.company_website ? 
            `<p>${profile.company_website}</p>` : ''}
          ${profile && profile.company_address ?
            `<p>${profile.company_address}</p>` : ''}
          ${profile && profile.company_city ?
            `<p>${profile.company_city}</p>` : ''}
          ${profile && profile.company_state ?
            `<p>${profile.company_state}</p>` : ''}
          <p>Powered By The PostMaster</p>
        </div>
      </body>
    </html>
  `;
};
