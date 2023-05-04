import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

import MeetupDetail from "../../components/meetups/MeetupDetails";


function MeetupDetails(props) {
  const {
    meetupData: { title = "", image = "", address = "", description = "" },
  } = props;

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content="NextJS test project"></meta>
      </Head>
      <MeetupDetail
        title={title}
        image={image}
        address={address}
        description={description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb://127.0.0.1:27017/learning"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    paths: meetups.map(({ _id }) => ({
      params: {
        meetupId: _id.toString(),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { meetupId } = params;
  const client = await MongoClient.connect(
    "mongodb://127.0.0.1:27017/learning"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();

  delete meetup._id;
  meetup.id = meetupId;

  return {
    props: {
      meetupData: meetup,
    },
  };
}

export default MeetupDetails;
