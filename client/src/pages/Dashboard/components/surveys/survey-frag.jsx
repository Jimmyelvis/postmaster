<div className="card col-md-4" key={survey._id}>
  <div className="card-content">
    <span className="card-title">{survey.title}</span>
    <p>{survey.body}</p>
    <p className="pull-right">
      Sent On:{" "}
      <span className="date">
        {" "}
        {new Date(survey.dateSent).toLocaleDateString()}{" "}
      </span>
    </p>
  </div>

  <div className="card-action">
    <a>Yes: {survey.yes}</a>
    <a>No: {survey.no}</a>
  </div>
</div>;
