export default {
  sokoban: [
    [// LEVEL ONE --------------------------------------
      {
        movement: [],
        direction: 2,
        key: 'skull',
        convo: [
          "Hey you!",
          "Welcome to the underworld!",
          "I need your 'help' with something important.",
          "As you might have noticed, you can swipe to move around, and tap to interact",
          "I'll explain more later, but for now can you clean up this grave yard for me?",
          "Just push the tombstone there over that poor sap to put them to rest and head on up the stairs",
          "It'll be great! I promise!",
          "Oh yeah, Did you hear the record holder for pot thrower threw it 4 metres?",
          {
            text: "Don't you think that's interesting?",
            choiceA: { text: 'Hell yeah!', value: 1, response: "Great!" },
            choiceB: { text: 'Hell no!', value: 2, response: 'Ok, hope you find another way out of this place before you end up like your friend over there!' }
          },
        ],
      }
    ], [// LEVEL TWO --------------------------------------[
      {
        movement: [],
        key: 'charon',
        direction: 1,
        convo: [
          "...................................................................................",
          "Oh.",
          "A demon once lifted an entire lake, but he couldn’t lift a single leaf.",
        ],
      }
    ], [ // LEVEL THREE -------------------------------------- [
      {
        movement: [],
        key: 'woman',
        direction: 0,
        convo: [
          "This looks really confusing...",
          "Hm",
          "Hmmm..",
          "Hmmmmmm...",
          "Hmmmmmmmmmm.....",
          "Hmmmmmmmmmmmmmmmmmmmmm................",
          "Mm.",
          "See if you can work this one out, I'm a bit tired from all this thinking.",
          "By the way, look out for the lost souls in the next area.",
          "They tend to be obsessed with thoughts from their lives",
          "Red peppers…. My Mom always said that’s the stuff.",
          "That and 3 cow bones make any soup delicious.  Don’t matter which bones though. Bones is bones!"
        ],
      }
    ],
  ],
  stealth: [
    [// LEVEL ONE --------------------------------------
      {
        movement: [3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],
        speed: 1000,
        direction: 0,
        key: 'man',
        convo: [
          "Have you ever wondered why sea water is soo salty?",
          "Well this folk tale from Norway tells us why.",
          "Long long ago the ocean waters were as clear and fresh of those of mountain streams.",
          "Infact there was hardly any salt to be found anywhere.",
          "There was no salt for French fries, popcorn, or pretzels.",
          "And what very little there was had a value much greater than gold or jewels.",
        ],
      }, {
        movement: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3],
        speed: 1000,
        direction: 1,
        key: 'woman',
        convo: [
          "Wild salmon and sardines do contain ocean contaminants.",
          "But in much lower amounts than other seafood.",
          "Buy these fish fresh or packed in olive oil or water.",
        ],
      }
    ], [// LEVEL TWO --------------------------------------
      {
        movement: [1, 2],
        speed: 1000,
        direction: 2,
        key: 'man2',
        convo: [
          "It was at that time there were two brothers living in a small fishing village on the coast to Norway.",
          "The older brother lived in a giant mansion ontop of a hill overlooking the entire village.",
          "He was the richest in the area because his ships carried salt from the mines far to the south",
        ],
      }, {
        movement: [0, 1],
        speed: 1000,
        direction: 1,
        key: 'skull',
        convo: [
          "Ha!",
          "You know very well that if I give you something today you’ll be back here tomorrow asking for more!",
          "I don’t know why I put up with a brother like you, but alright!",
          "Just this once!",
          "I think my cook through out some pickled pigs feet this morning.",
          "Take them!",
          "But if you want salt you’d have better luck asking the devil himself!",
        ],
      },{
        movement: [3, 2],
        speed: 1000,
        direction: 2,
        key: 'man3',
        convo: [
          "The younger brother was very hurt and depressed.",
          "He began thinking that he would have better luck with the Devil.",
        ],
      },{
        movement: [0, 1],
        speed: 1000,
        direction: 1,
        key: 'charon',
        convo: [
          "During the creations of Klimt's paintings he would paint wearing his favourite blue smock completely naked underneath.",
          "After changing into his favourite blue robe, with nothing underneath it was said, he would settle down to the days painting.",
          "He liked to work alone and undisturbed.",
        ],
      },{
        movement: [0, 1, 3],
        speed: 1000,
        direction: 3,
        key: 'woman',
        convo: [
          "Eating non-starchy vegetables starves the Candida of the sugar that feeds it.",
          "You should buy your vegetables fresh and eat them raw, steamed or grilled.",
        ],
      }
    ], [// LEVEL THREE --------------------------------------
      {
        movement: [1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 0, 0, 0],
        speed: 1000,
        direction: 2,
        key: 'skull',
        convo: [
          "Hey you!",
          "Hows it going?",
          "Kruger uses these subtle changes to give life and to reflect the personality to the people he portrays.",
          "In this example he shows the playful mischievous look based off the song by Motorhead, Smiling Like a Killer.",
          "Even though the band is known for not drinking to the excess and not doing any drugs.",
        ],
      }, {
        movement: [1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 0, 0, 0],
        speed: 1000,
        direction: 2,
        key: 'charon',
        convo: [
          "There is evidence that Klimt would change what he wanted the final look to be be as he was given to retouching or even completely repainting canvases that were, in name at least, already finished.",
          "Other times he would think it over for long period.",
          "He would lay aside a picture that was half completed resuming work on it only after an interval of months or sometimes years had elapsed.",
        ],
      }, {
        movement: [1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 0, 0, 0],
        speed: 1000,
        direction: 2,
        key: 'man',
        convo: [
          "The younger brother did as the old man said and kept walking and walking straight down the road and out into the deep dark forest.",
          "As he walked it got colder and colder and he began to worry because he had always heard the Devil preferred warmer places.",
        ],
      }, {
        movement: [1, 1, 1, 0, 0, 0, 0, 3, 3, 3, 2, 2, 2, 2],
        speed: 1000,
        direction: 2,
        key: 'woman',
        convo: [
          "Many Candida sufferers have a high sensitivity to Gluten.",
          "Give your immune system a break and stay off gluten during your Candida diet.",
          "Corn-by products like popcorn tend to be contaminated with mold.",
        ],
      },
    ]
  ],
  trivia: [
    [// LEVEL ONE --------------------------------------
      {
        movement: [],
        direction: 2,
        key: 'woman',
        convo: [
          "Riddle me this!",
          "What’s the stuff??",
          {
            text: "What do you think?",
            correct: 1,
            choiceA: { text: 'Red Peppers', value: 1, response: "Right!" },
            choiceB: { text: 'Green Grapes', value: 2, response: 'Wrong!' }
          },
        ],
      }, {
        movement: [],
        direction: 2,
        key: 'charon',
        convo: [
          "Riddle me this!",
          "What couldn’t the demon Lift?",
          {
            text: "What do you think?",
            correct: 1,
            choiceA: { text: 'A leaf', value: 1, response: "Right!" },
            choiceB: { text: 'A bowling ball', value: 2, response: 'Wrong!' }
          },
        ],
      }, {
        movement: [],
        direction: 2,
        key: 'skull',
        convo: [
          "Riddle me this!",
          "What is the record holding distance for pot throwing?",
          {
            text: "What do you think?",
            correct: 2,
            choiceA: { text: '5 meters', value: 1, response: "Wrong!" },
            choiceB: { text: '4 meters', value: 2, response: 'Right!' }
          },
        ],
      },
    ]
  ]
}
