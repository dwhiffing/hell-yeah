export default {
  sokoban: [
    [{
      movement: [],
      direction: 1,
      convo: [
        "Hey you!",
        "Yeah, you...",
        "...",
        "I need your 'help'",
        {
          text: "I'll explain more later, but for now can you clean up this grave yard for me?",
          choiceA: { text: 'Sure', value: 1, response: 'Great! Thanks a million.' },
          choiceB: { text: 'Hell no', value: 2, response: 'Ok, let me know how that goes for you' }
        },
      ],
    }], [{
      movement: [],
      direction: 1,
      convo: [
        "Oh.",
        "I'm busy over here, could you get back to 'cleaning'?",
      ],
    }]
  ]
}
