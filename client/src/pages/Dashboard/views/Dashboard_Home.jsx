import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import Payments from "../components/Payments";
import RecentSurveyList from "../components/surveys/RecentSurveyList";
import { fetchSurveys } from "ReduxStore";

export const Dashboard_Home = () => {
  const [isLoadingSurveys, setIsLoadingSurveys] = useState(false);
  const [loadingSurveysError, setLoadingSurveysError] = useState(null);
  const dispatch = useDispatch();



  useEffect(() => {
    setIsLoadingSurveys(true);
    dispatch(fetchSurveys())
      .unwrap()
      .catch((err) => setLoadingUSurveysError(err))
      .finally(() => setIsLoadingSurveys(false));
  }, [dispatch]);

  let sideContent;

  const { surveyList } = useSelector((store) => store.surveys);

  const auth = useSelector((store) => {
    return store.auth
  });




  if (auth === null) {
    sideContent = "loading......";
  } else {
    sideContent = (
      <>
        <div className="newsurvey-btn mb-md">
          <span>
            <Link to="/surveys/new">
              <h3>New Survey</h3>
            </Link>
          </span>
        </div>
        <Payments />
      </>
    );
  }

  return (
    <div>

      <div className="dashboard">
        <div className="dashInfo">
          <div className="sidebar">{sideContent}</div>
          <div className="mainarea">
            <div className="mainarea__heading mb-lg">
              <h2 className="heading-2 mb-md">Welcome to The PostMaster</h2>
              <p>
                The PostMaster allows you to send custom survey emails to your
                clients. Clients can answer your emails via a Yes/No option.
                Please follow the instructions listed below.
              </p>
            </div>
            <div className="mainarea__instructions mb-md">
              <h3 className="heading-3 mb-sm">Instructions</h3>
              <p>
                To start you will need to purchase credits to send out a survey.
                Click on the <span className="span-orange">ADD CREDITS</span>{" "}
                button on your left to add credits.{" "}
                <span className="span-orange">IMPORTANT</span> this app uses a
                developmental version of the Stripe Payment system. So DO NOT
                enter any real credit/debit card info, simply enter{" "}
                <span className="span-orange">4242 4242 4242 4242</span> and you
                should be all set.
              </p>
              <p>
                Then click the <span className="span-orange">NEW SURVEY</span>{" "}
                and fill out all the information that's needed. To View all your
                sent surveys, click the surveys button above
              </p>
            </div>
            <div className="mainarea__surveys">
              <h3 className="heading-3 mb-sm">Your Most Recent Surveys</h3>
              <ul className="mb-sm">
                <li>TITLE</li>
                <li>DATE SENT</li>
                {/* <li>DETAILS</li> */}
              </ul>

              <RecentSurveyList />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


