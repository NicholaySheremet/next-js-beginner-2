import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetup() {
  const router = useRouter();

  async function addMeetupHandler(data) {
    const result = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resuldData = await result.json();
    console.log(resuldData);

    router.push("/");
  }
  return (
    <Fragment>
      <Head>
        <title>NextJS Learn Project</title>
        <meta name="description" content="NextJS test project"></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetup;
