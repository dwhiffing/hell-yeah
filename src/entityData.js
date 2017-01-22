export default {
  sokoban: [
    [
      {
        movement: [],
        direction: 2,
        key: 'skull',
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
      key: 'charon',
      direction: 1,
      convo: [
        "...................................................................................................",
        "Oh.",
        "I'm busy over here, could you get back to 'cleaning'?",
      ],
    }]
  ],
  stealth: [
    [
      {
        movement: [],
        speed: 2,
        direction: 1,
        key: 'skull',
        convo: [
          "Hey you!",
        ],
      }, {
        movement: [1, 1, 1, 1, 2, 3, 3, 3, 3],
        speed: 4,
        direction: 2,
        key: 'charon',
        convo: [
          "Hey you!",
        ],
      }, {
        movement: [0, 1, 2, 3],
        speed: 8,
        direction: 2,
        key: 'woman',
        convo: [
          "Hey you!",
        ],
      },
    ]
  ],
  trivia: [
    [
      {
        movement: [],
        direction: 2,
        key: 'skull',
        convo: [
          "Hey you!",
        ],
      }
    ], [{
      movement: [],
      key: 'charon',
      direction: 1,
      convo: [
        "Oh.",
      ],
    }]
  ]
}
