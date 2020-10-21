import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';

function WebinarsSubPage() {
  const airtableKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  // all the data for the particular webinar is stored here
  const [webinar, setWebinar] = useState([]);

  // change to different IDs from the airtable here. right now, it fetches one I chose at random.
  const currentWebinarID = 'reczyNRsb4jOYuMVb';

  useEffect(() => {
    axios
      .get(
        `https://api.airtable.com/v0/appWPIPmVSmXaMhey/Opportunities/${currentWebinarID}`,
        {
          headers: { Authorization: `Bearer ${airtableKey}` },
        },
      )
      .then((result) => {
        setWebinar(result.data.fields);
        console.log(result.data.fields);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [airtableKey]);

  return (
    <div>
      <section className="section is-white">
        <Heading>{webinar.Title}</Heading>
        <p>{webinar.Description}</p>
      </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(WebinarsSubPage);