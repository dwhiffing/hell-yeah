export default {
  sokoban: [
    [
      {
        movement: [],
        direction: 1,
        key: 'man',
        convo: [
          "Hey you!",
          "Yeah, you.....",
          "I need your 'help'",
          "I'll explain more later, but for now can you clean up this grave yard for me?",
          {
            text: "What do you think?",
            choiceA: { text: 'Sure', value: 1, response: 'Great! As a thank you for your help, you can hit "R" to restart.' },
            choiceB: { text: 'Hell no', value: 2, response: 'Ok, let me know how that goes for you' }
          },
        ],
      }
    ], [{
      movement: [],
      key: 'woman',
      direction: 1,
      convo: [
        "...................................................................................................",
        "Oh.",
        "I'm busy over here, could you get back to 'cleaning'?",
      ],
    }]
  ]
}
