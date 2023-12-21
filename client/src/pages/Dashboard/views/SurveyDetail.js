import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Panel } from 'components/ui/Layout/Panel';
import { Link, useParams } from 'react-router-dom';
import Payments from '../components/Payments';
import { fetchSurvey } from 'ReduxStore';
import SurveyIcon from "assets/images/survey-icon.svg";
import { dashBoardPath } from 'pages/Dashboard/utils/constants';
import { PieChart, Pie, Cell, Tooltip } from "recharts";



export const SurveyDetail = () => {
  const { surveyId } = useParams();
  const dispatch = useDispatch();
  const { survey } = useSelector((state) => state.surveys);
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchSurvey(surveyId));
  }, [dispatch, surveyId]);



  const getChartData = () => {

    const yes = survey?.yes;
    const no = survey?.no;
  
    // const data01 = [
    //   { name: "No", value: no },
    //   { name: "Yes", value: yes },
    // ];
  
    const data01 = [
      { name: "No", value: 19 },
      { name: "Yes", value: 78 },
    ];
    
    
    // Custom label component
    const renderCustomizedLabel = ({
      cx, cy, midAngle, innerRadius, outerRadius, value
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
      const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
  
      return (
        <text 
          x={x} 
          y={y} 
          fill="white" 
          textAnchor={x > cx ? 'start' : 'end'} 
          dominantBaseline="central"
          fontWeight="bold" // Makes the text bold
          fontFamily="Arial, sans-serif"
          fontSize="40"
        >
          {value}
        </text>
      );
    };

    return (
      <PieChart width={400} height={400}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#FFD7B8" stopOpacity={1} />
          <stop offset="95%" stopColor="#E1670C" stopOpacity={1} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#BAD8F5" stopOpacity={1} />
          <stop offset="95%" stopColor="#0D66C2" stopOpacity={1} />
        </linearGradient>
        <filter id="shadow" height="130%">
          <feDropShadow dx="1" dy="2" stdDeviation="9" flood-color="rgba(0, 0, 0, 0.39)" />
        </filter>
        {/* Define more gradients as needed */}
      </defs>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data01}
        cx={200}
        cy={200}
        outerRadius={180}
        label={renderCustomizedLabel}
        labelLine={false}
        startAngle={90} // Change the starting angle
        endAngle={-270} // Change the ending angle
        stroke="none"
        filter="url(#shadow)"
      >
        {data01.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={`url(#${index % 2 === 0 ? "colorUv" : "colorPv"})`} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
    )
    
  }



  let surveyContent;


  if (survey?.recipients === null) {
    surveyContent = 'loading......';
  } else {
    surveyContent = (
      <React.Fragment>
        <div className="survey-content">
          <div className="info-details">
            
            <div className="info-details__title">
              <h3 className="heading-3">Survey Title</h3>

              <p>{survey?.title}</p>
            </div>

            <div className="info-details__subject">
              <h3 className="heading-3">Survey Subject</h3>
              <p>{survey?.subject}</p>
            </div>

            <div className="info-details__body">
              <h3 className="heading-3">Survey Body</h3>

              <p>{survey?.body}</p>
            </div>

            <button className="btn btn--primary">
              <Link to={`${dashBoardPath}/surveyList`}>Return</Link>
            </button>
          </div>

          <div className="results">
            <h3 className="heading-3">Survey Results</h3>

            <div className="yesnodata">
              <p className="yesnodata-label">
                YES <span className="badge badge-yes">{survey?.yes}</span>
              </p>

              <p className="yesnodata-label">
                NO <span className="badge badge-no">{survey?.no}</span>
              </p>
            </div>

            <div className="chart">

              {getChartData()}

            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    
      <Panel className="survey-detail">

        <div className="survey-detail__heading mb-lg">

          <img src={SurveyIcon} alt="" className='icon survey-list-icon' />

          <h2 className="heading-2 mb-md">Survey Details</h2>

          <p>
            An informational overview of this survey
          </p>

        </div>
        
        {surveyContent}

       
      </Panel>
    
  );
};

