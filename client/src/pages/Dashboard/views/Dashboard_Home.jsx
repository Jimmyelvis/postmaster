import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import Payments from "../components/Payments";
import RecentSurveyList from "../components/surveys/RecentSurveyList";
import { fetchSurveys } from "ReduxStore";
import { Panel } from "components/ui/Layout/Panel";
import SurveyIcon from "assets/images/survey-icon.svg";
import ChartsIcon from "assets/images/icon-charts.svg";
import { PieChart, Pie, Cell, Tooltip,
  BarChart, CartesianGrid, XAxis, YAxis, Bar, Legend,
  LabelList, Text, ResponsiveContainer
} from "recharts";




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

  const getPieChartData = () => {

    // const yes = survey?.yes;
    // const no = survey?.no;
  

  
    const data01 = [
      { name: "No", value: 19 },
      { name: "Yes", value: 78 },
    ];

        // Calculate the total value
    const total = data01.reduce((acc, item) => acc + item.value, 0);

    // Calculate the percentage for each item
    const dataWithPercentage = data01.map(item => ({
      ...item,
      percentage: ((item.value / total) * 100).toFixed(2) + '%' // Keeping two decimal places
    }));

    console.log(dataWithPercentage);
    
    
    // Custom label component
    const renderCustomizedLabel = ({
      cx, cy, midAngle, innerRadius, outerRadius, value, name, percent
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * Math.PI / 170);
      const y = cy + radius * Math.sin(-midAngle * Math.PI / 130);
     const percentage = (percent * 100).toFixed(0) + '%';
  
      return (
        <text 
          x={x} 
          y={y} 
          fill="white" 
          textAnchor={x > cx ? 'start' : 'end'} 
          dominantBaseline="central"
          fontWeight="bold" // Makes the text bold
          fontFamily="Arial, sans-serif"
          fontSize="20"
        >
          {`${percentage}`}
        </text>
      );
    };

    return (

      <ResponsiveContainer width="100%" height="100%">
          <PieChart>
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
              data={dataWithPercentage}
              cx="50%"
              cy="50%"
              outerRadius="80%"
              label={renderCustomizedLabel}
              labelLine={false}
              startAngle={90} // Change the starting angle
              endAngle={-270} // Change the ending angle
              stroke="none"
              filter="url(#shadow)"
            >
              {dataWithPercentage.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#${index % 2 === 0 ? "colorUv" : "colorPv"})`} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
      </ResponsiveContainer>
    )
    
  }

  const getBarChartData = () => { 

    const data = [
      {
        name: "Yes",
        number: 78,
        fill: "url(#colorYes)" // Add a fill property to your data objects
      },
      {
        name: "No",
        number: 19,
        fill: "url(#colorNo)" // Add a fill property to your data objects
      },
    ];

    return (
      <BarChart
      width={250}
      height={400}
      data={data}
      margin={{
        top: 75,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <defs>
        <linearGradient id="colorYes" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#BAD8F5" stopOpacity={1} />
          <stop offset="95%" stopColor="#0D66C2" stopOpacity={1} />
        </linearGradient>
        <linearGradient id="colorNo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#FFD7B8" stopOpacity={1} />
          <stop offset="95%" stopColor="#E1670C" stopOpacity={1} />
        </linearGradient>
      </defs>
      <CartesianGrid 
        strokeDasharray="4 1 2"
        vertical={false} 
      />
      <XAxis 
        dataKey="name"
      />
      <YAxis
        hide={true}
      />
      <Tooltip />
      <Text
        textAnchor="middle"
      />
      <Legend
        verticalAlign="bottom"
        height={30}
        align="right"
        iconSize={24}
      />
      <Bar dataKey="number" legendType="none">
        <LabelList 
          dataKey="number" 
          position="inside" 
          style={
            { 
              fill: 'white',
              fontWeight: "bold" 
            }
          } 
        />
        {
          data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))
        }
      </Bar>

    </BarChart>
    )
   }


  return (
    <>
      <Panel className="panel-dashboard welcome">
        <div className="mainarea">
          <div className="mainarea__heading mb-lg">
            <h2 className="heading-2 mb-md welcome-heading">Welcome to The PostMaster</h2>
            <p>The PostMaster allows you to send custom survey emails to your clients. Clients can answer your emails via a Yes/No option. Please follow the instructions listed below.</p>
          </div>
          <div className="mainarea__instructions mb-md">
            <h3 className="heading-3 mb-sm instructions-heading">Instructions</h3>
            <p>
              To start you will need to purchase credits to send out a survey. Click on the <span className="span-orange">ADD CREDITS</span> button on your left to add credits.{" "}
              <span className="span-orange">IMPORTANT</span> this app uses a developmental version of the Stripe Payment system. So DO NOT enter any real credit/debit card info, simply enter{" "}
              <span className="span-orange">4242 4242 4242 4242</span> and you should be all set.
            </p>
            <p>
              Then click the <span className="span-orange">NEW SURVEY</span> and fill out all the information that's needed. To View all your sent surveys, click the surveys button above
            </p>

            {/* <p>
              I'm baby mustache tattooed tote bag kitsch hashtag. Aesthetic franzen butcher vegan tumblr seitan bushwick migas DSA af small batch next level umami brunch cardigan. Ethical man braid
              tattooed taxidermy marfa. Keytar vice sartorial woke 8-bit tousled lyft shoreditch dreamcatcher viral hashtag DIY shaman same kickstarter. Whatever PBR&B irony, mlkshk vinyl iceland
              single-origin coffee. Lomo hoodie keffiyeh, bruh coloring book beard pinterest. You probably haven't heard of them chartreuse tumblr locavore master cleanse farm-to-table church-key
              meggings gochujang cred offal shabby chic cray. Franzen post-ironic blackbird spyplane, health goth snackwave iPhone schlitz af ennui vegan. Succulents enamel pin vice bitters
              farm-to-table, trust fund blackbird spyplane marxism aesthetic. Single-origin coffee kale chips live-edge, jawn kogi godard YOLO chillwave poutine humblebrag chicharrones. Vibecession
              gentrify poke put a bird on it skateboard. Chia wolf poutine leggings adaptogen, 90's umami sartorial hashtag gentrify green juice. Coloring book asymmetrical tumblr typewriter hashtag.
              Migas vibecession leggings yr hexagon. Blackbird spyplane actually roof party pinterest affogato jianbing cloud bread grailed dreamcatcher literally. Succulents bodega boys meggings, man
              bun hell of bespoke raw denim godard umami hammock williamsburg tumeric. Normcore bruh salvia messenger bag church-key jean shorts blue bottle godard 3 wolf moon post-ironic actually
              typewriter mixtape. Disrupt gastropub neutra sus. Humblebrag gochujang aesthetic tumeric pinterest. Man bun street art tofu twee, 90's helvetica fit seitan DIY jean shorts before they
              sold out bruh godard cliche. Listicle activated charcoal vape kinfolk organic waistcoat small batch taxidermy kogi fit four loko microdosing. Photo booth venmo man braid food truck ascot
              gochujang bitters blackbird spyplane farm-to-table jawn direct trade normcore hammock sus. Kinfolk deep v kickstarter, yr portland edison bulb paleo woke cronut meditation meh. Direct
              trade banjo banh mi, fashion axe truffaut echo park XOXO 3 wolf moon gatekeep thundercats ascot ugh umami hashtag. Celiac tilde jianbing deep v. Forage shabby chic knausgaard iPhone
              vibecession YOLO succulents freegan tumeric literally ethical swag tacos keytar intelligentsia. Vape austin gastropub +1 ethical godard tilde readymade fanny pack food truck blue bottle
              hexagon meh. Poutine marxism stumptown, messenger bag tumeric bitters man bun cred photo booth drinking vinegar celiac. Etsy sriracha sustainable jawn subway tile coloring book banh mi
              fanny pack glossier. Tofu portland schlitz jianbing. Master cleanse gentrify narwhal small batch, truffaut praxis DSA next level vice franzen cliche flexitarian. Vape everyday carry
              jianbing vinyl, la croix glossier ethical. Fanny pack raw denim cliche af post-ironic chambray typewriter single-origin coffee cloud bread sartorial photo booth. Copper mug chia glossier
              sus pitchfork, lyft air plant jianbing squid gluten-free hashtag heirloom. YOLO polaroid wolf blue bottle kinfolk pinterest. Etsy heirloom typewriter drinking vinegar. Tousled poke
              subway tile irony banjo bespoke cloud bread tattooed etsy pok pok heirloom. Drinking vinegar woke air plant lo-fi sriracha deep v. Unicorn Brooklyn kitsch quinoa selfies retro biodiesel
              hammock. Truffaut hashtag blackbird spyplane viral craft beer, lo-fi snackwave cray praxis helvetica microdosing sus yuccie. IPhone drinking vinegar knausgaard banjo. Tonx try-hard
              humblebrag master cleanse food truck. Praxis man bun microdosing squid. Intelligentsia XOXO sriracha, succulents cred vaporware yes plz polaroid. Tumblr asymmetrical etsy, scenester
              before they sold out fixie gochujang jianbing neutral milk hotel la croix. Praxis 3 wolf moon lumbersexual, seitan franzen pinterest cornhole fit banh mi. Vexillologist man braid small
              batch intelligentsia, before they sold out franzen air plant locavore letterpress affogato everyday carry ramps distillery dreamcatcher. Hoodie squid neutra wayfarers art party marxism
              crucifix. Lomo humblebrag blackbird spyplane VHS listicle disrupt cronut tonx. Kale chips heirloom stumptown lyft, taxidermy small batch cronut vinyl lumbersexual crucifix pabst pork
              belly tumblr taiyaki. IPhone blue bottle ascot disrupt cliche umami. Hashtag distillery photo booth authentic. Gatekeep selfies tumeric tumblr cliche synth keffiyeh portland fit drinking
              vinegar disrupt plaid YOLO dreamcatcher pickled. Tousled chambray echo park next level narwhal, farm-to-table health goth tbh 8-bit squid succulents leggings iceland. Readymade
              single-origin coffee ramps jean shorts grailed dreamcatcher. Glossier direct trade deep v trust fund stumptown typewriter blackbird spyplane. 8-bit chia yuccie keffiyeh humblebrag. Marfa
              authentic craft beer sartorial tonx sus Brooklyn. Freegan pug 90's tumeric listicle hashtag vape fixie helvetica tousled praxis next level blackbird spyplane iPhone. Yuccie adaptogen
              fanny pack tousled, fingerstache JOMO disrupt neutra iPhone retro seitan locavore praxis skateboard everyday carry. Tonx direct trade cornhole coloring book vape. Bodega boys ugh
              post-ironic gluten-free, pork belly plaid hexagon. Hot chicken fashion axe seitan quinoa next level. Small batch marxism flexitarian big mood gochujang freegan. Lyft sriracha aesthetic
              viral, pok pok you probably haven't heard of them copper mug taxidermy tote bag. Taiyaki 8-bit roof party activated charcoal, YOLO artisan craft beer authentic neutra pabst pinterest
              hell of taxidermy everyday carry slow-carb. Stumptown beard actually, knausgaard selvage JOMO shabby chic fixie quinoa shaman chia Brooklyn church-key. Literally PBR&B banh mi man braid
              vinyl. Gorpcore taiyaki +1 DSA drinking vinegar. Narwhal +1 truffaut, mustache praxis ethical tumeric XOXO hell of prism biodiesel brunch. Pug skateboard hot chicken typewriter jianbing,
              artisan blue bottle plaid tousled tumeric. Tumeric tilde la croix butcher, vegan small batch brunch paleo williamsburg cray green juice readymade. Wolf art party migas 8-bit glossier
              locavore poutine taiyaki cornhole drinking vinegar. Pickled ascot brunch kickstarter. Craft beer shoreditch scenester raclette vape deep v venmo pok pok bitters. Skateboard direct trade
              meditation drinking vinegar, street art neutral milk hotel echo park unicorn normcore lo-fi. Pork belly shaman knausgaard occupy, enamel pin kale chips meggings taxidermy affogato
              vibecession. Photo booth humblebrag salvia mukbang hell of. Meggings messenger bag semiotics fingerstache, PBR&B jianbing vegan brunch meh affogato pop-up occupy adaptogen. Lumbersexual
              tumblr copper mug before they sold out, authentic pop-up knausgaard. Direct trade swag blackbird spyplane leggings, distillery master cleanse franzen. Chillwave literally selfies, air
              plant echo park artisan viral enamel pin. Enamel pin bodega boys messenger bag pok pok iPhone pug. Four loko fashion axe wayfarers chia, af marfa crucifix direct trade meditation.
              Hammock austin vibecession direct trade humblebrag yr selfies keytar. Seitan hot chicken fingerstache, intelligentsia vexillologist art party venmo live-edge dreamcatcher quinoa
              pour-over retro fashion axe etsy. Listicle pour-over yuccie, normcore lyft actually raw denim knausgaard iPhone williamsburg gorpcore mustache tilde. Tumblr hexagon bespoke snackwave.
              Meditation marfa pour-over, raw denim sus keytar cray cronut tote bag stumptown disrupt paleo authentic. Portland aesthetic freegan flannel edison bulb tacos try-hard readymade retro
              mukbang fashion axe. Sus swag try-hard, flexitarian organic hammock snackwave gastropub dreamcatcher. Venmo semiotics messenger bag before they sold out poke blue bottle pug af
              meditation listicle pabst affogato. Echo park mixtape vinyl cupping messenger bag artisan everyday carry fingerstache organic bicycle rights iceland ethical. Four loko echo park hot
              chicken, street art pug pickled kale chips praxis deep v small batch fingerstache wolf flannel. Thundercats craft beer tonx grailed. Post-ironic williamsburg lumbersexual echo park
              normcore 90's kitsch coloring book. Raw denim austin vibecession, praxis typewriter paleo hell of narwhal letterpress kogi literally beard try-hard woke authentic. Mumblecore ascot
              yuccie, man bun small batch succulents wayfarers chia semiotics pitchfork everyday carry gastropub whatever. Twee next level keytar seitan unicorn. Blackbird spyplane typewriter mixtape,
              selfies skateboard heirloom subway tile paleo poke swag beard. Dummy text? More like dummy thicc text, amirite?
            </p> */}

          </div>
        </div>
      </Panel>

      <Panel className="panel-dashboard recent-surveys-list">
        <div className="recent-surveys-heading mb-md">
          <img src={SurveyIcon} alt="" className="icon survey-icon" />
          <h3 className="heading-3 mb-sm">Your Most Recent Surveys</h3>
        </div>

        <RecentSurveyList />
      </Panel>

      <Panel className="panel-dashboard survey-stats">

        <div className="survey-stats-heading mb-md">

            <div className="stats-data">

              <h3 className="heading-3">
                Stats and Data
              </h3>

              <img src={ChartsIcon} alt="" className="icon survey-icon" />

            </div>

            <ul>
              <li>
                <h4 className="heading-4 label">Total Surveys Sent</h4>
                <p className="paragraph">10</p>
              </li>

              <li>
                <h4 className="heading-4 label">Percentage Responded</h4>
                <p className="paragraph">80%</p>
              </li>
            </ul>

        </div>

        <div className="survey-stats-graph">

          <h3 className="heading-3">
            Survey Stats Graph
          </h3>

          <div className="bar-graph">
            {
              getBarChartData()
            }
          </div>

          <div className="pie-graph">
              {
                getPieChartData()
              }
          </div>
        </div>

      </Panel>
    </>
  );
};


