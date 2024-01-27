import SurveyIcon from "assets/images/survey-icon.svg";

export const SectionHeading = ({ title, children }) => {
  return (
    <div className="section-heading mb-lg">
      <div className="icon-heading">
        <img src={SurveyIcon} alt="" className="icon survey-icon" />
        <h2 className="heading-2 mb-md">{title}</h2>
      </div>

      {children}
    </div>
  );
};
