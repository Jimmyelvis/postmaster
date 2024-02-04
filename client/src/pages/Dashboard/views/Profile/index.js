import React, { useEffect, useState } from "react";
import { Panel } from "components/ui/Layout/Panel";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SectionHeading } from "pages/Dashboard/components/SectionHeading";
import { CreateProfile } from "./components/CreateProfile";
import { EditProfile } from "./components/EditProfile";
import { ViewProfile } from "./components/ViewProfile";
import { fetchProfile } from "ReduxStore";
import { Spinner } from "components/ui/LoadingAnimations/Spinner";
import { Colorfullsquare } from "components/ui/LoadingAnimations/Colorfullsquare";

export const Profile = () => {
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const [currentProfile, setCurrentProfile] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState(null);

  const { profile } = useSelector((state) => state.profile);
  const loading = useSelector((state) => state.profile.loading);

  const profileState = useSelector((state) => state.profile);

  const View_Profile = "View Profile";
  const Edit_Profile = "Edit Profile";

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile]);

  useEffect(() => {
    setView(View_Profile);
  }, []);

  const renderView = () => {
    /*
      If profile is not null, then we are editing, viewing the profile
      else we are creating a new profile
  */

    if (loading) {
      return <Colorfullsquare />;
    } else if (profile) {
      if (view === View_Profile) {
        return <ViewProfile />;
      } else {
        return <EditProfile />;
      }
    } else {
      return <CreateProfile />;
    }
  };

  const renderTitle = () => {
    if (loading) {
      return
    } else if (profile) {
      return
    } else {
      return <SectionHeading title="Create Profile" />
    }
  };


  return (
    <Panel className="panel-dashboard profile-page">

      {
        profile && (
          <ul className="profile-tabs">
            <li className={view === View_Profile ? "active" : "profile-tab"} onClick={() => setView(View_Profile)}>
              View Profile
            </li>
            <li className={view === Edit_Profile ? "active" : "profile-tab"} onClick={() => setView(Edit_Profile)}>
              Edit Profile
            </li>
          </ul>
        )
      }

      {renderTitle()}

      {renderView()}
    </Panel>
  );
};
