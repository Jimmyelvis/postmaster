import React, { useEffect, useState } from "react";
import { Panel } from "components/ui/Layout/Panel";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SectionHeading } from "pages/Dashboard/components/SectionHeading";
import { CreateProfile } from "./components/CreateProfile";
import { EditProfile } from "./components/EditProfile";
import { ViewProfile } from "./components/ViewProfile";

export const Profile = () => {
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const [currentProfile, setCurrentProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState(null);

  const { profile } = useSelector((state) => state.profile);

  const View_Profile = "View Profile";
  const Edit_Profile = "Edit Profile";

  useEffect(() => {
    setView(View_Profile);
  }, []);

  const renderView = () => {
    /*
      If profile is not null, then we are editing, viewing the profile
      else we are creating a new profile
  */

    if (profile?.profile) {
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
    if (profile?.profile) {
      if (view === View_Profile) {
        return "View Profile";
      } else {
        return "Edit Profile";
      }
    } else {
      return "Create Profile";
    }
  };

  return (
    <Panel className="panel-dashboard profile-page">
      

      <ul className="profile-tabs">
        <li
          className={view === View_Profile ? "active" : "profile-tab"}
          onClick={() => setView(View_Profile)}
        >
          View Profile
        </li>
        <li
          className={view === Edit_Profile ? "active" : "profile-tab"}
          onClick={() => setView(Edit_Profile)}
        >
          Edit Profile
        </li>
      </ul>

      <SectionHeading title={renderTitle()} />

      {renderView()}
    </Panel>
  );
};
