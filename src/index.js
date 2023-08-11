import React from 'react';
import ReactDOM from 'react-dom/client';
import Scene from "./lib/Scene";
import { delay } from "./lib/utils";

const modules = {
  helpers: {
    enabled: false,
    // this module will help you find the right people to help you with the party
    // people can help you during the party (set up, clean up) and with the planning (contacting restaurants for availability)
    // you'll need the timeline module to plan the set up and clean up times
    // realtime chat (link to chat module)
    // helpers can be volunteers, paid volunteers, or hired professionals
    // note - incentivising hired professionals to use the app will increase awareness of the app, and could allow you to advertise the ability to integrate with them
    // setup checklist
    // cleaning checklist
  },
  chat: {
    enabled: false,
    // realtime chat with helpers
    // realtime chat with guests
    // realtime chat with vendors
    // realtime chat with venue
    // text messaging vs email vs chat app
    // could be channel based (like slack) or user based (like whatsapp)
    // maybe it should integrate with discord or similar
    // lightweight, does not collect data, secure communication
  },
  themes: {
    enabled: false,
    // people who help set up the decorations (link to helpers module)
    // people who help clean up the decorations (link to helpers module)
    // theme ideas
    // color palette
    // decorative elements (backdrop, tables, balloons, banners/posters, scene setters like streamers, inflatable animals, etc)
    // purchased decorations (and byo)
    // safety (fire, water, etc) (link to safety module)
    // plan setup timing (link to timeline module)
  },
  venue: {
    enabled: false,
    // determine the guest count (link to rsvp module)
    // venue type (home, park, restaurant, rented space, activity center, etc)
    // availability (date, time, duration)
    // amenities (tables, chairs, kitchen, bathrooms, etc)
    // logistics (parking, accessibility, safety, etc)
    // reserve the venue (get written confirmation)
    // plan the layout
    // plan the setup and cleanup (link to helpers module)
  },
  food: {
    enabled: false,
    // guest count (adults, kids)
    // budget
    // menu planning
      // snacks
      // main course
      // desserts
    // themed food
    // dietary restrictions (link to rsvp module) (vegan, vegetarian, gluten free, allergies, etc)
    // presentation (plates, napkins, utensils, cups, etc)
    // cake (link to cake module)
    // beverages
    // cleanup (link to helpers module)
    // backup plan (link to backup plan module) (keep food protected from weather)
    // ordering/catering/pickup (link to inventory module)
  },
  cake: {
    enabled: false,
    // guest count (adults, kids)
    // budget
    // flavor
    // design
    // dietary restrictions (link to rsvp module) (vegan, vegetarian, gluten free, allergies, etc)
    // presentation (plates, napkins, utensils, cups, etc)
    // cake topper
    // cake stand
    // cake knife
  },
  entertainment: {
    enabled: false,
    // activities must be suitable for the age range of the guests
    // hire professionals (clowns, magicians, face painters, etc)
    // diy entertainment (games, crafts, dance party, story time, etc)
    // entertainment for adults vs kids (music, games, etc)
    // outdoor activities (karaoke, photo booth, movies, relay race, bubble station, pinata, bounce house, etc)
    // schedule the flow of entertainment (link to timeline module)
    // backup plan (link to backup plan module)
    // duration
  },
  music: {
    enabled: false,
    // hire a dj (link to inventory module)
    // hire a band (link to inventory module)
    // pick musical theme (link to themes module)
    // create a playlist (popular songs, age-appropriate, etc)
    // safety (volume, etc) (link to safety module)
    // equipment (link to inventory module)
    // set up and tear down (link to helpers module)
    // hire av tech (link to inventory module)
    // song requests (link to rsvp module)
    // backup plan (link to backup plan module) (weather, etc)
    // duration
    // schedule the flow of music (link to timeline module)
    // prepare for speeches (link to timeline module)
    // prepare playlists if using a streaming service (link to TODO module)
    // flexibility if people don't like the music
  },
  dressCode: {
    enabled: false,
    // dress code (link to themes module)
    // costume ideas (link to themes module)
    // costume contest (link to activities module)
    // costume prizes (link to inventory module)
    // costume safety (link to safety module)
  },
  gifts: {
    enabled: false,
    // idea suggestions
    // registry
    // gift tracking for thank you cards (who gave what)
    // a party director module can guide the party coordinator during the party to take pictures of all the gifts during gift opening
    // each gift image can be tagged with the name of the person who gave it and the gift itself
    // another option is when the guest arrives, they can take a picture of the gift and tag it with their name and fill out what the gift is.
    // The party coordinator can place a QR code on the gift table that links to the gift tracking module
  },
  partyFavors: {
    enabled: false,
    // the main thing here is to add it to the planning TODO list
    // idea suggestions
    // helpers
    // budget
    // safety (link to safety module)
    // shopping
    // presentation
  },
  invites: {
    enabled: false,
    // ai-assisted content based on parameters of all modules (like, "come to eli's party, there will be bounce, live music, and more")
    // the look and feel of the invite will represent and reflect how the planner feels about the event, so it should be frequently visible to help them guide their decisions.
    // digital vs paper
    // design (theme, photos, etc)
    // hire a professional?
    // information checklist (date, time, location, rsvp, special instructions, dietary information)
    // timing (2-4 weeks in advance, usually)
    // rsvp tracking
    // personal touch
    // distribution (email, text, social media, etc)
    // if printed, make more than needed in case of mistakes or last minute additions
  },
  budget: {
    enabled: false,
    // budgeting is a big part of planning, and should be a module that is always visible
    // total budget
    // expenses per module
    // research costs
    // track spending so far
    // contingency fund
    // show cost per guest
    // show cost per module
    // also keep in mind paying the helpers
    // crowdfunding options
    // integrated payment options
    // if guests are paying for themselves, make sure to communicate that clearly and give them options to pay online
  },
  timeline: {
    enabled: false,
    // see links from other modules
    // you should have a planning timeline, a setup timeline, a party timeline, and a cleanup timeline
    // the timeline guides the "party director" routine
  },
  backupPlan: {
    enabled: false,
    // backup plan for weather
    // have a party director routine for the backup plan (timeline switches if raining)
  },
  thankYouCards: {
    enabled: false,
    // timing: 1-2 weeks after the event
    // design (theme, photos, etc)
    // personal touch (involve the kids)
    // distribution (email, text, social media, etc)
    // media (paper/digital)
    // content (ai assisted?)
    // sustainability (link to sustainability module)
    // keep a list of who gave what gift
    // remember to thank the volunteers
    // optionally, thank any professionals that were hired and consider leaving reviews
  },
  travel: {
    enabled: false,
    // assist with travel arrangements (carpooling, public transportation, etc)
    // assist with lodging arrangements (hotel, airbnb, etc)
    // assist with parking arrangements
    // assist with directions
    // assist with transportation to and from the party
    // (maybe every individual has a party director, so the director tells each
    // person what is coming up and helps them get to the event and know where
    // to be etc)
    // maybe the party director just sends text messages to the guests, like 
    // "hey, we're about to do the cake cutting, come to the kitchen"
    // "based on traffic, you should leave 2 hours before the party starts, would you like me to send you a reminder?"
  },
  inventory: {
    enabled: false,
    // keep track of all the things you need to buy, rent, borrow, etc
    // guest book for gift table (should be part of setup checklist)
    // master list of all items needed for the party
    // shopping list
    // budget integration
    // storage (some things need refrigeration, some do not)
    // post-party inventory (what to keep, what to throw away, what to donate, what to sell)
    // borrowed and rented items (who to return them to)
    // safety 
  },
  website: {
    enabled: false,
    // homepage
    // details page
    // rsvp page
    // update and news
    // contact page
    // crowdfunding section
    // photo gallery
    // guest book
    // directions and map
    // gift registry
    // social media integration (tiktoks, instagram, etc)
  },
  notifications: {
    enabled: false,
    socialMedia: {},
    emailLists: {},
    textLists: {},
    partyChat: {},
    // send reminders to guests
    // send reminders to helpers
    // send reminders to the planner and keep them up to date on the weather if needed
    // collect contact information from guests (in the rsvp module)
    // notify of changes or updates
    // personal calls
    // dedicated event page (link to website module)
  },
  checklist: {
    enabled: false,
    // planning checklist
    // setup checklist
    // cleanup checklist
  },
}

async function main(shot) {
  const answers = {
    themes: 0,
    venue: 0,
    food: 0,
    entertainment: 0,
    music: 0,
    dressCode: 0,
    gifts: 0,
    partyFavors: 0,
    invites: 0,
    budget: 0,
    timeline: 0,
    backupPlan: 0,
    thankYouCards: 0,
    inventory: 0,
    website: 0,
    socialMedia: 0,
    emailLists: 0,
    textLists: 0,
  };

  // show checkboxes for each of the above:
  await shot.capture(<>
    <h1>What would you like help planning?</h1>
    <ul>
      {Object.keys(answers).map((answer, i) => (
        <li key={i}>
          <input
          type="checkbox"
          id={answer}
          name={answer}
          value={answer}
          onChange={(e) => {
            answers[answer] = e.target.checked ? 1 : -1;
          }}
          />
          <label htmlFor={answer}>{answer}</label>
        </li>
      ))}
    </ul>
    <button onClick={() => shot.answer()}>Let's plan!</button>
  </>);
  console.log(answers);
  await shot.show(<>
    <h1> Okay, let's get started!</h1>
  </>);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Scene director={main} />);
