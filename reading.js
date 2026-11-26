/* =============================================================
   LITTLE EXPLORERS QUEST: READING ROCKET (decodable sentences and mini stories)
   Each level builds on the phonics before it. An item is [text, question, answer, "wrong1|wrong2", emoji].
   hl = letters to highlight in the words (the level's focus). Add new levels at the END of READING.
   ============================================================= */
const READING = [
  {name:"Fun sentences: short vowels", focus:"Sound out each little word: c-a-t!", hl:[], items:[
    ["The fat cat sat on my hat!","What did the cat sit on?","my hat","my bed|my bag","🐱"],
    ["A pig did a big jig in the mud.","Where did the pig dance?","in the mud","in the bin|in the bed","🐷"],
    ["Ten red ants ran up my leg!","How many ants?","ten","six|two","🐜"],
    ["The hen has a wig!","What does the hen have?","a wig","a hat|a bag","🐔"],
    ["Tim got a rat in his bag. It can hop!","What did Tim get in his bag?","a rat","a cat|a pig","🐀"],
    ["A red bug sat on the wet mop.","What sat on the mop?","a red bug","a fat cat|a big pig","🐞"],
    ["Zip! Zap! The van can hop!","What can hop?","the van","the bus|the cab","🚐"],
    ["Max has a jet. It is red and fast.","What is red?","the jet","the van|the bus","✈️"]]},
  {name:"Blends: frog, crab, drum", focus:"Two letters can blend together: fr, cr, dr, st, sp...", hl:["fr","cr","dr","st","sp","tr","pl","sn","sk","fl","gr"], items:[
    ["The frog can skip, jump and flip!","What can the frog do?","flip","fly|sing","🐸"],
    ["A crab can grab a big plum!","What can the crab grab?","a plum","a drum|a clam","🦀"],
    ["The plum fell. Splat! It hit the grass.","What did the plum hit?","the grass","the crab|the frog","🍑"],
    ["A skunk can stink!","What can the skunk do?","stink","sing|fly","🦨"],
    ["The clock went tick-tock, tick-tock, crash!","What went tick-tock?","the clock","the drum|the flag","🕐"],
    ["Stop! A truck is on the track!","What is on the track?","a truck","a drum|a frog","🚚"]]},
  {name:"sh, ch and th", focus:"Two letters, ONE sound: sh, ch, th.", hl:["sh","ch","th"], items:[
    ["A shark had fish and chips for lunch!","What did the shark have?","fish and chips","pizza and chips|fish and cake","🦈"],
    ["The chimp can chat and chomp on a chop.","What can the chimp do?","chat and chomp","sing and dance|jump and shout","🐒"],
    ["Chip the dog dug up a shiny dish!","What did Chip dig up?","a shiny dish","a shiny ship|a shiny fish","🐕"],
    ["Chef Josh can chop, shake and mash!","Who can chop?","Josh","Beth|Chen","👨‍🍳"],
    ["A moth had a bath in a dish!","Where did the moth have a bath?","in a dish","in a ship|in a shed","🦋"],
    ["This thin chick is shy and wet.","How does the chick feel?","shy","fast|hot","🐥"]]},
  {name:"wh, ng, ck, qu, ph", focus:"Spot the special letters: wh, ng, ck, qu, ph.", hl:["wh","ng","ck","qu","ph"], items:[
    ["Quick! The duck got stuck in the muck!","Where was the duck stuck?","in the muck","in the sack|in the truck","🦆"],
    ["The king can sing a long, long song.","Who can sing?","the king","the duck|the frog","🤴"],
    ["Jack had a black sock on his chin!","Where was the sock?","on his chin","on his foot|on his hat","🧦"],
    ["Phil has a pink phone!","What is pink?","the phone","the sock|the duck","📱"],
    ["The quick duck quacked at the black cat.","What did the duck do?","quacked at the cat","sang to the cat|sat on the cat","🦆"],
    ["Bang! Bang! The king hid in a thick sack!","Where did the king hide?","in a sack","in a bin|in a van","🤴"]]},
  {name:"ai, ee and oa", focus:"Two vowels team up: ai, ee, oa.", hl:["ai","ee","oa"], items:[
    ["A green goat can float in a boat!","What can the goat do?","float in a boat","jump on a train|sleep in a tree","🐐"],
    ["The snail got on the train. Toot toot!","What did the snail get on?","the train","the boat|the tree","🐌"],
    ["Beep beep! Dee the bee had a green jeep!","What did Dee have?","a green jeep","a green boat|a green train","🐝"],
    ["Rain, rain! Joan got in the soapy boat.","What did Joan get in?","the boat","the train|the jeep","🚣"],
    ["The toad had a snail and said, “Yum!”","What did the toad say?","yum","yuck|moo","🐸"],
    ["A goat is on the road! Beep, beep!","Who is on the road?","a goat","a snail|a bee","🐐"]]},
  {name:"igh, oo, ar and or", focus:"Look for igh, oo, ar and or in the words.", hl:["igh","oo","ar","or"], items:[
    ["The moon is bright at night. Look, a star!","When is the moon bright?","at night","at noon|at lunch","🌙"],
    ["A cow in a car can zoom to the farm!","What is in the car?","a cow","a goat|a hen","🐄"],
    ["The shark can bark in the dark.","Where can the shark bark?","in the dark","in the park|at the farm","🦈"],
    ["A frog took a book to the zoo.","What did the frog take?","a book","a boot|a fork","🐸"],
    ["The fork and the spoon went to the moon.","Where did they go?","to the moon","to the zoo|to the farm","🥄"],
    ["Mark can park a car on a roof!","Where can Mark park?","on a roof","in a barn|at the farm","🚗"]]},
  {name:"er, ir, ur, ow, ou and oi", focus:"More team letters: er ir ur ow ou oi.", hl:["er","ir","ur","ow","ou","oi"], items:[
    ["A girl got a bird in her skirt!","Where was the bird?","in her skirt","in her shirt|in her bag","👧"],
    ["A brown cow went to town to get a crown.","What did the cow get?","a crown","a gown|a drum","🐄"],
    ["The mouse ran out of the house, shouting “Ouch!”","What did the mouse shout?","ouch","wow|help","🐭"],
    ["A boy found a coin and a worm in the soil.","What did the boy find with the coin?","a worm","a bird|a bug","🪱"],
    ["A turtle can swim in the river. Splash! Splash!","What can the turtle do?","swim","run|fly","🐢"],
    ["The clown made a loud noise with his horn.","What did the clown have?","a horn","a drum|a coin","🤡"]]},
  {name:"Magic e: a-e, i-e, o-e, u-e", focus:"The magic e makes the vowel say its name!", hl:[], items:[
    ["Jake made a cake. It was as big as a gate!","How big was the cake?","as big as a gate","as big as a plate|as small as a lake","🎂"],
    ["Mike rode his bike to the lake and ate a pie.","What did Mike do at the lake?","ate a pie","read a book|hid a bone","🚲"],
    ["Dave hid a bone in a hole. Then he forgot where!","What did Dave hide?","a bone","a cake|a kite","🦴"],
    ["The kite flew up, up, up into the blue sky!","What flew up?","the kite","the cake|the bike","🪁"],
    ["June has a huge cube of ice. Her cute mule likes to lick it!","Who licks the ice?","a mule","a pig|a bird","🧊"],
    ["Five snakes came to the gate and ate our cake!","What did the snakes eat?","the cake","the pie|the bone","🐍"]]},
  {name:"Word endings: -ed, -ing, -s", focus:"Find the endings: jumped, hopping, frogs.", hl:["ed","ing"], items:[
    ["The kids jumped, clapped and yelled, “Hooray!”","What did the kids yell?","hooray","help|stop","🎉"],
    ["Dad is cooking and Mum is painting. What a mess!","Who is painting?","Mum","Dad|Ben","🎨"],
    ["The cat jumped on the dog and the dog barked!","What did the dog do?","barked","jumped|slept","🐈"],
    ["We played and splashed in the pond and got very wet.","What did we get?","wet","hot|cold","💦"],
    ["The bees were buzzing and the frogs were hopping.","What were the frogs doing?","hopping","buzzing|swimming","🐸"],
    ["The monkey grabbed my hat and started jumping.","Who grabbed the hat?","the monkey","the dog|the cat","🐒"]]},
  {name:"Tricky words: tiny stories", focus:"Two sentences now! Watch for tricky words: the, was, said, they.", hl:[], items:[
    ["Ben has a pet frog called Bud. Bud can jump on the bed!","What is the frog called?","Bud","Ben|Bob","🐸"],
    ["It was a wet day. Zoe put on her red boots and jumped in every puddle!","What did Zoe jump in?","puddles","a pond|a bin","☔"],
    ["Sam took his dad to the park. They had a picnic under a big tree and ate all the food.","Where was the picnic?","under a tree","on a boat|in a car","🧺"],
    ["The cat is on the bed. She is fast asleep and dreaming about fish.","What is the cat dreaming about?","fish","dogs|birds","😴"],
    ["Mia and Leo made a sandcastle at the beach. Then a big wave came and splash!","What came?","a big wave","a big dog|a big crab","🏖️"],
    ["Dad lit the fire. We toasted bread on sticks and one piece fell in the flames!","What fell in the flames?","a piece of bread","a stick|a fish","🔥"]]},
  {name:"Spelling rules: tch, dge, soft c and g", focus:"Look for tch, dge, soft c (ce, ci) and le endings.", hl:["tch","dge","ce","ci","le","tion"], items:[
    ["The witch can catch a fish in the ditch.","What can the witch catch?","a fish","a frog|a bat","🧙"],
    ["A giant gave the girl a gem as big as an egg!","How big was the gem?","as big as an egg","as big as a house|as small as a bee","💎"],
    ["Mice love to dance in the city.","What do mice love to do?","dance","sing|swim","🐭"],
    ["A turtle sat on a candle at the table and said, “Ouch!”","What did the turtle say?","ouch","yum|wow","🐢"],
    ["The judge sat on the edge of the stage and fell off!","What did the judge do?","fell off the stage","ate fudge|sang a song","👩‍⚖️"],
    ["I blew a big bubble in my bottle. Pop! It made me giggle.","What did I blow?","a bubble","a puzzle|a candle","🫧"]]},
  {name:"Mini stories", focus:"Three sentences each. Read the whole story, then answer!", hl:[], items:[
    ["Poppy the puppy ran out of the garden. She dug a hole under the fence. Then she saw a big, brown bone!","What did Poppy see?","a big brown bone","a small black cat|a red ball","🐶"],
    ["On Saturday, Max and his sister went to the shops. They bought bread, milk and green apples. Then it began to rain, so they put the apples on their heads!","What did they put on their heads?","the apples","the bread|the milk","🛒"],
    ["A little bird built a nest in the old oak tree. She laid three tiny eggs. Soon the eggs began to crack, and peep, peep, three fluffy chicks came out!","How many chicks came out?","three","two|four","🐣"],
    ["The night was cold, so Grandpa lit the fire. Ella and Harry drank hot chocolate and made marshmallow monsters. Soon they felt warm and sleepy.","What did Ella and Harry drink?","hot chocolate","cold milk|warm soup","🍫"],
    ["Every morning, a kind farmer feeds his animals. He gives the hens some corn and the cows some hay. But the naughty goat eats his hat!","What does the goat eat?","his hat","the corn|the hay","🧑‍🌾"],
    ["Jess found a shiny shell on the beach. She held it up to her ear and heard the sea. Then a tiny crab popped out and waved at her!","What popped out of the shell?","a tiny crab","a tiny fish|a tiny snail","🐚"]]}
];
