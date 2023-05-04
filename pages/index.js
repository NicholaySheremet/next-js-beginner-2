import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

function HomePage(props) {
  const { meetups = [] } = props;

  return (
    <Fragment>
      <Head>
        <title>NextJS Learn Project</title>
        <meta name="description" content="NextJS test project"></meta>
      </Head>
      <MeetupList meetups={meetups} />
    </Fragment>
  );
}

/*
export async function getServerSideProps({ req, res }) {
  return {
    props: {
      meetups: TEST_MEETUPS,
    },
  };
}
*/

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb://127.0.0.1:27017/learning"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}).toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map(({ title, address, image, description, _id }) => ({
        id: _id.toString(),
        title,
        address,
        image,
        description,
      })),
    },
    revalidate: 10, // timer for re-generate page (in seconds)
  };
}

export default HomePage;
