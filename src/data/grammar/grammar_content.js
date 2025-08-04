export const grammarCategories = [
  {
    id: 'basic_particles',
    title: 'Basic Particles',
    description: 'Understand the fundamental particles like は, が, を, に, で.',
    topics: [
            {
        id: 'particle_wa',
        title: 'Particle は (wa)',
        content: `
# Particle は (wa)

The particle は (read as "wa", not "ha") is one of the most fundamental and frequently used particles in Japanese. It primarily marks the **topic** of a sentence.

## Topic vs. Subject

It's crucial to understand that the topic is not always the grammatical subject. The topic is what the speaker wants to talk about or focus on.

### Example:

*   **わたしはがくせいです。** (Watashi **wa** gakusei desu.)
    *   わたし (watashi) = I
    *   がくせい (gakusei) = student
    *   です (desu) = is/am/are (polite form)
    *   **Meaning:** As for me, I am a student. (More naturally: I am a student.)

In this sentence, "わたし" (I) is both the topic and the subject.

## Introducing New Information

は is often used to introduce new information or to make a general statement about the topic.

### Example:

*   **これはほんです。** (Kore **wa** hon desu.)
    *   これ (kore) = this
    *   ほん (hon) = book
    *   **Meaning:** This is a book.

Here, "これ" (this) is the topic, and "ほんです" (is a book) is the new information being provided about "this."

## Contrast and Emphasis

は can also be used to draw a contrast or put emphasis on the word preceding it. When used in this way, it often implies "as for X, but not Y" or "X, among other things."

### Example:

*   **ビールはのみません。** (Biiru **wa** nomimasen.)
    *   ビール (biiru) = beer
    *   のみません (nomimasen) = don't drink (polite negative of 飲む - nomu)
    *   **Meaning:** As for beer, I don't drink it (implying I might drink other things).

This usage highlights "beer" by contrasting it with other potential drinks.

## Placement

は always follows the word or phrase it marks as the topic. It can attach to nouns, pronouns, and sometimes even other particles (though this is more advanced).
        `,
        examples: [
          { japanese: 'わたしはエンジニアです。', romaji: 'Watashi wa enjinia desu.', english: 'I am an engineer.' },
          { japanese: 'きょうはあついです。', romaji: 'Kyou wa atsui desu.', english: 'Today is hot.' },
          { japanese: 'これはペンです。', romaji: 'Kore wa pen desu.', english: 'This is a pen.' },
          { japanese: 'さかなはたべません。', romaji: 'Sakana wa tabemasen.', english: 'As for fish, I don\'t eat it.' },
        ],
        nuances: [
          'The pronunciation of は as "wa" is a historical kana usage that has been preserved only for this particle.',
          'While は marks the topic, が marks the grammatical subject. The distinction can be subtle and is a common point of confusion for learners.',
          'は can be used to generalize or state a known fact about the topic.',
        ],
        quiz: [
          {
            question: 'Which particle marks the topic of a sentence?',
            options: ['が (ga)', 'を (wo)', 'は (wa)', 'に (ni)'],
            answer: 'は (wa)'
          },
          {
            question: 'In the sentence "わたしはがくせいです。", what does は mark?',
            options: ['Subject', 'Object', 'Topic', 'Location'],
            answer: 'Topic'
          },
          {
            question: 'How is は pronounced when used as a particle?',
            options: ['ha', 'wa', 'pa', 'ba'],
            answer: 'wa'
          }
        ]
      },
      {
        id: 'particle_ga',
        title: 'Particle が (ga)',
        content: `
# Particle が (ga)

The particle が (ga) primarily marks the **grammatical subject** of a sentence when that subject is introducing new information, is being emphasized, or is the answer to a question.

## Subject Marker

が explicitly identifies the subject performing the action or being described.

### Example:

*   **ねこがいます。** (Neko **ga** imasu.)
    *   ねこ (neko) = cat
    *   います (imasu) = is (for living things)
    *   **Meaning:** There is a cat. / A cat exists.

Here, "ねこ" (cat) is the subject that exists.

## Introducing New Information / Specific Subject

When you are introducing a new subject into the conversation, or when the subject is specific and not yet known to the listener, が is often used.

### Example:

*   **だれがきましたか？** (Dare **ga** kimashita ka?)
    *   だれ (dare) = who
    *   きました (kimashita) = came (past tense of 来る - kuru)
    *   **Meaning:** Who came?

*   **田中さんがきました。** (Tanaka-san **ga** kimashita.)
    *   田中さん (Tanaka-san) = Mr./Ms. Tanaka
    *   **Meaning:** Mr. Tanaka came.

In the answer, 田中さん is new information, so が is used.

## Emphasis or Exclusion

が can be used to emphasize the subject, often implying "X and only X" or "It is X who...". This is a key difference from は, which marks the topic.

### Example:

*   **わたしがやります。** (Watashi **ga** yarimasu.)
    *   わたし (watashi) = I
    *   やります (yarimasu) = will do (polite form of やる - yaru)
    *   **Meaning:** *I* will do it. (Implying that others won't or shouldn't, or that I am the one specifically designated to do it.)

Compare this to "わたしはやります。" (Watashi wa yarimasu.), which would mean "As for me, I will do it," a more general statement without the same emphasis on "I."

## With Adjectives and Verbs of Existence/Possession

が is commonly used with adjectives and verbs like あります (arimasu - to exist, for inanimate objects) and います (imasu - to exist, for living things), and ほしい (hoshii - to want).

### Examples:

*   **りんごがあります。** (Ringo **ga** arimasu.) - There is an apple.
*   **いぬがいます。** (Inu **ga** imasu.) - There is a dog.
*   **お金がほしいです。** (Okane **ga** hoshii desu.) - I want money.

## Placement

が always follows the word or phrase it marks as the subject.
        `,
        examples: [
          { japanese: '鳥がそらをとんでいます。', romaji: 'Tori ga sora o tonde imasu.', english: 'A bird is flying in the sky.' },
          { japanese: '何がおもしろいですか？', romaji: 'Nani ga omoshiroi desu ka?', english: 'What is interesting?' },
          { japanese: 'この本がおもしろいです。', romaji: 'Kono hon ga omoshiroi desu.', english: 'This book is interesting.' },
          { japanese: '私がおいしいケーキを作りました。', romaji: 'Watashi ga oishii keeki o tsukurimashita.', english: 'I made a delicious cake.' },
        ],
        nuances: [
          'The distinction between は and が is one of the most challenging aspects for Japanese learners. は marks the topic (what you\'re talking about), while が marks the subject (who or what performs the action or is described).',
          'が is often used when the subject is unknown or when you are providing new information about the subject.',
          'When answering a question that uses が, the answer will typically also use が to emphasize the specific subject.',
        ],
        quiz: [
          {
            question: 'Which particle marks the grammatical subject when introducing new information or emphasizing it?',
            options: ['は (wa)', 'が (ga)', 'を (wo)', 'で (de)'],
            answer: 'が (ga)'
          },
          {
            question: 'In the sentence "ねこがいます。", what does が mark?',
            options: ['Topic', 'Object', 'Location', 'Subject'],
            answer: 'Subject'
          },
          {
            question: 'Which of these verbs is typically used with が to indicate existence for living things?',
            options: ['あります (arimasu)', 'います (imasu)', 'します (shimasu)', '食べます (tabemasu)'],
            answer: 'います (imasu)'
          }
        ]
      },
      {
        id: 'particle_wo',
        title: 'Particle を (wo)',
        content: `
# Particle を (wo)

The particle を (read as "o", not "wo" in modern Japanese, though written with wo) is primarily used to mark the **direct object** of a transitive verb.

## Direct Object Marker

It indicates the thing or person that directly receives the action of the verb.

### Example:

*   **りんごを食べます。** (Ringo **o** tabemasu.)
    *   りんご (ringo) = apple
    *   食べます (tabemasu) = eat (polite form of 食べる - taberu)
    *   **Meaning:** I eat an apple. / Eat an apple.

Here, "りんご" (apple) is the direct object being eaten.

## Verbs of Movement (through a space)

While を typically marks direct objects, it can also be used with verbs of movement (like 散歩する - sanpo suru, to stroll; 飛ぶ - tobu, to fly; 走る - hashiru, to run) to indicate the space or area through which the movement occurs.

### Example:

*   **公園を散歩します。** (Kouen **o** sanpo shimasu.)
    *   公園 (kouen) = park
    *   散歩します (sanpo shimasu) = stroll (polite form of 散歩する - sanpo suru)
    *   **Meaning:** I stroll through the park.

In this case, "公園" (park) is not a direct object in the traditional sense, but the space traversed.

## Leaving a Place

When a verb implies leaving a place (e.g., 出る - deru, to exit; 卒業する - sotsugyou suru, to graduate), を marks the place being left.

### Example:

*   **家を出ます。** (Ie **o** demasu.)
    *   家 (ie) = house
    *   出ます (demasu) = exit (polite form of 出る - deru)
    *   **Meaning:** I leave the house.

## Placement

を always follows the noun or phrase that is the direct object or the space/place being acted upon.
        `,
        examples: [
          { japanese: '水を飲みます。', romaji: 'Mizu o nomimasu.', english: 'I drink water.' },
          { japanese: '本を読みます。', romaji: 'Hon o yomimasu.', english: 'I read a book.' },
          { japanese: '道を歩きます。', romaji: 'Michi o arukimasu.', english: 'I walk along the road.' },
          { japanese: '大学を卒業しました。', romaji: 'Daigaku o sotsugyou shimashita.', english: 'I graduated from university.' },
        ],
        nuances: [
          'Although written を, it is pronounced exactly the same as お (o) in modern Japanese.',
          'Be careful not to confuse を with other particles that indicate location, such as に or で, which have different nuances.',
        ],
        quiz: [
          {
            question: 'Which particle is primarily used to mark the direct object of a transitive verb?',
            options: ['が (ga)', 'を (wo)', 'は (wa)', 'に (ni)'],
            answer: 'を (wo)'
          },
          {
            question: 'How is を pronounced in modern Japanese?',
            options: ['wo', 'o', 'u', 'e'],
            answer: 'o'
          },
          {
            question: 'In the sentence "公園を散歩します。", what does を indicate?',
            options: ['Direct object', 'Location of action', 'Means of transport', 'Space through which movement occurs'],
            answer: 'Space through which movement occurs'
          }
        ]
      },
      {
        id: 'particle_ni',
        title: 'Particle に (ni)',
        content: `
# Particle に (ni)

The particle に (ni) is a versatile particle with several key functions, primarily indicating **location, direction, time, or the recipient of an action.**

## 1. Destination/Direction (to, toward)

に marks the destination or direction of movement verbs like 行く (iku - to go), 来る (kuru - to come), 帰る (kaeru - to return).

### Example:

*   **日本に行きます。** (Nihon **ni** ikimasu.)
    *   日本 (Nihon) = Japan
    *   行きます (ikimasu) = go (polite form of 行く - iku)
    *   **Meaning:** I go to Japan.

## 2. Location of Existence (in, at, on)

に indicates the static location where something or someone exists, used with います (imasu - for living things) and あります (arimasu - for inanimate objects).

### Example:

*   **部屋に本があります。** (Heya **ni** hon ga arimasu.)
    *   部屋 (heya) = room
    *   本 (hon) = book
    *   あります (arimasu) = exists (for inanimate objects)
    *   **Meaning:** There is a book in the room.

## 3. Time (at, on, in)

に specifies a point in time when an action occurs. It is used with specific times, days of the week, months, and years, but generally *not* with relative times like 今日 (kyou - today) or 毎日 (mainichi - every day).

### Example:

*   **７時に起きます。** (Shichi-ji **ni** okimasu.)
    *   ７時 (shichi-ji) = 7 o'clock
    *   起きます (okimasu) = wake up (polite form of 起きる - okiru)
    *   **Meaning:** I wake up at 7 o'clock.

## 4. Recipient of an Action (to, for)

に marks the indirect object or the recipient of an action, often with verbs like あげる (ageru - to give), もらう (morau - to receive), 教える (oshieru - to teach).

### Example:

*   **友達にプレゼントをあげます。** (Tomodachi **ni** purezento o agemasu.)
    *   友達 (tomodachi) = friend
    *   プレゼント (purezento) = present
    *   あげます (agemasu) = give
    *   **Meaning:** I give a present to my friend.

## 5. Purpose of Movement

に can indicate the purpose for which one goes or comes, often followed by a verb in the ます-stem form or a noun.

### Example:

*   **買い物に行きます。** (Kaimono **ni** ikimasu.)
    *   買い物 (kaimono) = shopping
    *   **Meaning:** I go for shopping. / I go to shop.

## Placement

に always follows the noun or phrase it modifies.
        `,
        examples: [
          { japanese: '学校に行きます。', romaji: 'Gakkou ni ikimasu.', english: 'I go to school.' },
          { japanese: '机の上に本があります。', romaji: 'Tsukue no ue ni hon ga arimasu.', english: 'There is a book on the desk.' },
          { japanese: '日曜日に映画を見ます。', romaji: 'Nichiyoubi ni eiga o mimasu.', english: 'I watch a movie on Sunday.' },
          { japanese: '先生に質問します。', romaji: 'Sensei ni shitsumon shimasu.', english: 'I ask the teacher a question.' },
          { japanese: '食べに行きます。', romaji: 'Tabe ni ikimasu.', english: 'I go to eat.' },
        ],
        nuances: [
          'に is often confused with で. Remember that に marks the location of existence (static) or destination, while で marks the location where an action takes place.',
          'When used with time, に is generally for specific points in time. For durations or general times, other expressions are used.',
        ],
        quiz: [
          {
            question: 'Which of the following is NOT a primary function of the particle に?',
            options: ['Indicating destination', 'Indicating location of action', 'Indicating time', 'Indicating recipient of action'],
            answer: 'Indicating location of action'
          },
          {
            question: 'In "日本に行きます。", what does に mark?',
            options: ['Origin', 'Destination', 'Means', 'Time'],
            answer: 'Destination'
          },
          {
            question: 'Which verb is typically used with に to indicate existence for inanimate objects?',
            options: ['います (imasu)', 'あります (arimasu)', 'します (shimasu)', '食べます (tabemasu)'],
            answer: 'あります (arimasu)'
          }
        ]
      },
      {
        id: 'particle_de',
        title: 'Particle で (de)',
        content: `
# Particle で (de)

The particle で (de) is a versatile particle with several key functions, primarily indicating **the location where an action takes place, the means/method, or the cause/reason.**

## 1. Location of Action (at, in)

で marks the place where an action or event occurs. This is a crucial distinction from に, which marks the location of existence or destination.

### Example:

*   **図書館で勉強します。** (Toshokan **de** benkyou shimasu.)
    *   図書館 (toshokan) = library
    *   勉強します (benkyou shimasu) = study (polite form of 勉強する - benkyou suru)
    *   **Meaning:** I study at the library.

Here, the action of studying is *performed* at the library.

## 2. Means or Method (by, with, using)

で indicates the tool, method, or means by which an action is performed.

### Example:

*   **バスで学校に行きます。** (Basu **de** gakkou ni ikimasu.)
    *   バス (basu) = bus
    *   学校 (gakkou) = school
    *   行きます (ikimasu) = go
    *   **Meaning:** I go to school by bus.

Here, "バス" (bus) is the means of transportation.

## 3. Cause or Reason (because of, due to)

で can indicate the cause or reason for something, often an undesirable outcome.

### Example:

*   **病気で会社を休みました。** (Byouki **de** kaisha o yasumimashita.)
    *   病気 (byouki) = sickness
    *   会社 (kaisha) = company
    *   休みました (yasumimashita) = rested/took a day off (past tense of 休む - yasumu)
    *   **Meaning:** I took a day off from work because of sickness.

## 4. Material (made of)

で can indicate the material something is made of.

### Example:

*   **木でできたテーブル。** (Ki **de** dekita teeburu.)
    *   木 (ki) = wood
    *   できた (dekita) = made
    *   テーブル (teeburu) = table
    *   **Meaning:** A table made of wood.

## 5. Scope or Limit (within, among)

で can also indicate a limit or scope, often translated as "within" or "among."

### Example:

*   **クラスで一番背が高いです。** (Kurasu **de** ichiban se ga takai desu.)
    *   クラス (kurasu) = class
    *   一番 (ichiban) = most/best
    *   背が高い (se ga takai) = tall
    *   **Meaning:** I am the tallest in the class.

## Placement

で always follows the noun or phrase it modifies.
        `,
        examples: [
          { japanese: 'レストランで食事をします。', romaji: 'Resutoran de shokuji o shimasu.', english: 'I eat a meal at the restaurant.' },
          { japanese: 'はしで食べます。', romaji: 'Hashi de tabemasu.', english: 'I eat with chopsticks.' },
          { japanese: '地震でビルが倒れました。', romaji: 'Jishin de biru ga taoremashita.', english: 'The building collapsed due to the earthquake.' },
          { japanese: '紙で飛行機を作ります。', romaji: 'Kami de hikouki o tsukurimasu.', english: 'I make a paper airplane from paper.' },
        ],
        nuances: [
          'The most common confusion is between で and に for location. Remember: で = location of action, に = location of existence/destination.',
          'When indicating a means, で can be used for transportation, tools, languages, etc.',
        ],
        quiz: [
          {
            question: 'Which particle marks the location where an action takes place?',
            options: ['に (ni)', 'で (de)', 'を (wo)', 'は (wa)'],
            answer: 'で (de)'
          },
          {
            question: 'In "バスで学校に行きます。", what does で indicate?',
            options: ['Destination', 'Time', 'Means/Method', 'Recipient'],
            answer: 'Means/Method'
          },
          {
            question: 'Which of the following sentences correctly uses で to indicate the location of an action?',
            options: [
              '公園に遊びます。 (Kouen ni asobimasu.)',
              '公園で遊びます。 (Kouen de asobimasu.)',
              '公園を遊びます。 (Kouen o asobimasu.)',
              '公園は遊びます。 (Kouen wa asobimasu.)'
            ],
            answer: '公園で遊びます。 (Kouen de asobimasu.)'
          }
        ]
      },
    ]
  },
  {
    id: 'verb_conjugation',
    title: 'Verb Conjugation',
    description: 'Learn how to conjugate verbs into different forms: ます, て, た, ない.',
    topics: [
      {
        id: 'masu_form',
        title: 'ます Form',
        content: `
# ます Form (Polite Form)

The ます form is the most common and fundamental polite form of Japanese verbs. It is used in everyday conversations to show respect to the listener and is a good starting point for beginners.

## Formation

The ます form is attached to the **masu-stem** of a verb. The masu-stem is derived differently for Group 1 (Godan) and Group 2 (Ichidan) verbs.

### Group 1 Verbs (Godan Verbs)

For Group 1 verbs, change the final "u" sound of the dictionary form to the "i" sound and then add ます.

*   **行く (iku - to go)** → 行き (iki) + ます → **行きます (ikimasu)**
*   **飲む (nomu - to drink)** → 飲み (nomi) + ます → **飲みます (nomimasu)**
*   **話す (hanasu - to speak)** → 話し (hanashi) + ます → **話します (hanashimasu)**

### Group 2 Verbs (Ichidan Verbs)

For Group 2 verbs, simply remove the final る (ru) from the dictionary form and add ます.

*   **食べる (taberu - to eat)** → 食べ (tabe) + ます → **食べます (tabemasu)**
*   **見る (miru - to see)** → 見 (mi) + ます → **見ます (mimasu)**
*   **起きる (okiru - to wake up)** → 起き (oki) + ます → **起きます (okimasu)**

### Irregular Verbs

There are two main irregular verbs:

*   **する (suru - to do)** → **します (shimasu)**
*   **来る (kuru - to come)** → **来ます (kimasu)**

## Usage

The ます form is used for:

1.  **Polite statements:** It makes your sentences polite and suitable for most social situations.
    *   **毎日日本語を勉強します。** (Mainichi Nihongo o benkyou shimasu.) - I study Japanese every day.

2.  **Present and Future Tense:** It can indicate actions happening now, habitually, or in the future.
    *   **今、本を読みます。** (Ima, hon o yomimasu.) - I am reading a book now.
    *   **明日、映画を見ます。** (Ashita, eiga o mimasu.) - I will watch a movie tomorrow.

3.  **Invitations/Suggestions (with か):** Adding か (ka) at the end turns it into a polite question or invitation.
    *   **一緒に食べませんか？** (Issho ni tabemasen ka?) - Won't you eat together? (Invitation)

## Negative Form (ません)

To make the ます form negative, change ます to ません (masen).

*   **行きます (ikimasu)** → **行きません (ikimasen - won't go)**
*   **食べます (tabemasu)** → **食べません (tabemasen - won't eat)**

## Past Tense (ました)

To make the ます form past tense, change ます to ました (mashita).

*   **行きます (ikimasu)** → **行きました (ikimashita - went)**
*   **食べます (tabemasu)** → **食べました (tabemashita - ate)**

## Past Negative (ませんでした)

To make the ます form past negative, change ます to ませんでした (masen deshita).

*   **行きます (ikimasu)** → **行きませんでした (ikimasen deshita - didn't go)**
*   **食べます (tabemasu)** → **食べませんでした (tabemasen deshita - didn't eat)**
        `,
        examples: [
          { japanese: '毎朝コーヒーを飲みます。', romaji: 'Maiasa koohii o nomimasu.', english: 'I drink coffee every morning.' },
          { japanese: '週末に友達と会います。', romaji: 'Shuumatsu ni tomodachi to aimasu.', english: 'I will meet my friend on the weekend.' },
          { japanese: '昨日は働きませんでした。', romaji: 'Kinou wa hatarakimasen deshita.', english: 'I didn\'t work yesterday.' },
        ],
        nuances: [
          'The ます form is essential for polite communication in Japanese. It is the default form you should use when speaking to people you don\'t know well, superiors, or in formal situations.',
          'While it covers present and future, context usually clarifies which tense is intended.',
        ],
        quiz: [
          {
            question: 'What is the ます form of the verb 食べる (taberu - to eat)?',
            options: ['食べます (tabemasu)', '食べます (tabemasu)', '食べます (tabemasu)', '食べます (tabemasu)'],
            answer: '食べます (tabemasu)'
          },
          {
            question: 'What is the negative ます form of 行く (iku - to go)?',
            options: ['行きます (ikimasu)', '行きません (ikimasen)', '行きました (ikimashita)', '行かなかった (ikanakatta)'],
            answer: '行きません (ikimasen)'
          },
          {
            question: 'Which of the following sentences uses the ます form correctly?',
            options: [
              '昨日、本を読みました。 (Kinou, hon o yomimashita.)',
              '明日、映画を見ます。 (Ashita, eiga o mimasu.)',
              '毎日日本語を勉強します。 (Mainichi Nihongo o benkyou shimasu.)',
              'All of the above.'
            ],
            answer: 'All of the above.'
          }
        ]
      },
      {
        id: 'te_form',
        title: 'て Form',
        content: `
# て Form

The て form is one of the most versatile and frequently used verb forms in Japanese. It does not have a tense on its own but connects clauses and indicates various relationships between actions or states.

## Formation

The formation of the て form depends on the verb group.

### Group 1 Verbs (Godan Verbs)

This group has several sound changes (euphonic changes) before adding て.

*   Verbs ending in う, つ, る → って
    *   **買う (kau - to buy)** → 買って (katte)
    *   **待つ (matsu - to wait)** → 待って (matte)
    *   **帰る (kaeru - to return)** → 帰って (kaette)

*   Verbs ending in む, ぶ, ぬ → んで
    *   **読む (yomu - to read)** → 読んで (yonde)
    *   **遊ぶ (asobu - to play)** → 遊んで (asonde)
    *   **死ぬ (shinu - to die)** → 死んで (shinde)

*   Verbs ending in く → いて
    *   **書く (kaku - to write)** → 書いて (kaite)

*   Verbs ending in ぐ → いで
    *   **泳ぐ (oyogu - to swim)** → 泳いで (oyoide)

*   Verbs ending in す → して
    *   **話す (hanasu - to speak)** → 話して (hanashite)

### Group 2 Verbs (Ichidan Verbs)

For Group 2 verbs, simply remove the final る (ru) and add て.

*   **食べる (taberu - to eat)** → 食べて (tabete)
*   **見る (miru - to see)** → 見て (mite)

### Irregular Verbs

*   **する (suru - to do)** → **して (shite)**
*   **来る (kuru - to come)** → **来て (kite)**

## Common Usages

1.  **Connecting Actions (and, then):** To list actions in chronological order.
    *   **朝ごはんを食べて、学校に行きます。** (Asagohan o tabete, gakkou ni ikimasu.) - I eat breakfast, and then go to school.

2.  **Request/Command (ください):** To make a polite request.
    *   **座ってください。** (Suwatte kudasai.) - Please sit down.

3.  **Ongoing Action (いる):** To indicate an action in progress.
    *   **本を読んでいます。** (Hon o yonde imasu.) - I am reading a book.

4.  **Permission (もいいです):** To ask for or grant permission.
    *   **入ってもいいですか？** (Haitte mo ii desu ka?) - May I come in?

5.  **Prohibition (はいけません):** To prohibit an action.
    *   **ここで写真を撮ってはいけません。** (Koko de shashin o totte wa ikemasen.) - You must not take pictures here.

6.  **Cause/Reason (から):** To state a reason or cause.
    *   **頭が痛くて、学校を休みました。** (Atama ga itakute, gakkou o yasumimashita.) - I had a headache, so I took a day off from school.

7.  **Sequential Actions (から):** To indicate that one action happens after another.
    *   **宿題をしてから、遊びに行きます。** (Shukudai o shite kara, asobi ni ikimasu.) - After doing homework, I will go play.

## Placement

て form connects verbs, adjectives, and nouns to other clauses or particles.
        `,
        examples: [
          { japanese: 'テレビを見て、寝ます。', romaji: 'Terebi o mite, nemasu.', english: 'I watch TV, then go to sleep.' },
          { japanese: 'この本を読んでください。', romaji: 'Kono hon o yonde kudasai.', english: 'Please read this book.' },
          { japanese: '雨が降っていて、寒いです。', romaji: 'Ame ga futte ite, samui desu.', english: 'It\'s raining and cold.' },
        ],
        nuances: [
          'The euphonic changes for Group 1 verbs are crucial to memorize. They are consistent and apply to other verb forms as well.',
          'The て form is incredibly versatile and its meaning often depends on the particle or verb that follows it.',
        ],
        quiz: [
          {
            question: 'What is the て form of the verb 食べる (taberu - to eat)?',
            options: ['食べって (tabette)', '食べて (tabete)', '食べで (tabede)', '食べし (tabeshi)'],
            answer: '食べて (tabete)'
          },
          {
            question: 'Which of the following is the て form of 行く (iku - to go)?',
            options: ['行って (itte)', '行きって (ikitte)', '行いて (iite)', '行んで (inde)'],
            answer: '行って (itte)'
          },
          {
            question: 'In the sentence "本を読んでいます。", what does the て form + います indicate?',
            options: ['Past action', 'Future action', 'Ongoing action', 'Completed action'],
            answer: 'Ongoing action'
          }
        ]
      },
      {
        id: 'ta_form',
        title: 'た Form',
        content: `
# た Form (Plain Past Form)

The た form is the plain past tense of Japanese verbs. It is equivalent to the "-ed" or irregular past tense forms in English (e.g., "ate," "went"). It is used in casual speech and as a building block for many other grammatical structures.

## Formation

The formation of the た form follows the same euphonic changes as the て form, simply replacing て with た, and で with だ.

### Group 1 Verbs (Godan Verbs)

*   Verbs ending in う, つ, る → った
    *   **買う (kau - to buy)** → 買った (katta)
    *   **待つ (matsu - to wait)** → 待った (matta)
    *   **帰る (kaeru - to return)** → 帰った (kaetta)

*   Verbs ending in む, ぶ, ぬ → んだ
    *   **読む (yomu - to read)** → 読んだ (yonda)
    *   **遊ぶ (asobu - to play)** → 遊んだ (asonda)
    *   **死ぬ (shinu - to die)** → 死んだ (shinda)

*   Verbs ending in く → いた
    *   **書く (kaku - to write)** → 書いた (kaita)

*   Verbs ending in ぐ → いだ
    *   **泳ぐ (oyogu - to swim)** → 泳いだ (oyoida)

*   Verbs ending in す → した
    *   **話す (hanasu - to speak)** → 話した (hanashita)

### Group 2 Verbs (Ichidan Verbs)

For Group 2 verbs, simply remove the final る (ru) and add た.

*   **食べる (taberu - to eat)** → 食べた (tabeta)
*   **見る (miru - to see)** → 見た (mita)

### Irregular Verbs

*   **する (suru - to do)** → **した (shita)**
*   **来る (kuru - to come)** → **来た (kita)**

## Usage

The た form is used for:

1.  **Plain Past Tense:** To indicate actions that happened in the past in casual speech.
    *   **昨日、映画を見た。** (Kinou, eiga o mita.) - I watched a movie yesterday.

2.  **As a Modifier:** It can directly modify nouns, acting like a relative clause.
    *   **昨日食べたケーキは美味しかった。** (Kinou tabeta keeki wa oishikatta.) - The cake I ate yesterday was delicious.

3.  **Experience (ことがある):** To express having done something before.
    *   **日本に行ったことがあります。** (Nihon ni itta koto ga arimasu.) - I have been to Japan.

4.  **Conditional (ら):** To form a conditional clause.
    *   **雨が降ったら、家にいます。** (Ame ga futtara, ie ni imasu.) - If it rains, I will stay home.

## Negative Form (なかった)

To make the た form negative, use the ない form stem and add かった.

*   **行く (iku)** → 行かない (ikanai) → **行かなかった (ikanakatta - didn't go)**
*   **食べる (taberu)** → 食べない (tabenai) → **食べなかった (tabenakatta - didn't eat)**
        `,
        examples: [
          { japanese: '先週、新しい本を買った。', romaji: 'Senshuu, atarashii hon o katta.', english: 'Last week, I bought a new book.' },
          { japanese: '友達と公園で遊んだ。', romaji: 'Tomodachi to kouen de asonda.', english: 'I played with my friend in the park.' },
          { japanese: 'あの映画は面白かった。', romaji: 'Ano eiga wa omoshirokatta.', english: 'That movie was interesting.' },
        ],
        nuances: [
          'The た form is the plain form equivalent of the polite ました form. It is crucial for casual conversations and for forming more complex grammatical structures.',
          'Mastering the euphonic changes is key to correctly forming both the て form and the た form.',
        ],
        quiz: [
          {
            question: 'What is the た form of the verb 食べる (taberu - to eat)?',
            options: ['食べった (tabetta)', '食べた (tabeta)', '食べだ (tabeda)', '食べし (tabeshi)'],
            answer: '食べた (tabeta)'
          },
          {
            question: 'Which of the following is the た form of 行く (iku - to go)?',
            options: ['行った (itta)', '行きった (ikitta)', '行いた (iita)', '行んだ (inda)'],
            answer: '行った (itta)'
          },
          {
            question: 'In the sentence "日本に行ったことがあります。", what does the た form + ことがあります express?',
            options: ['Future plan', 'Past experience', 'Current state', 'Obligation'],
            answer: 'Past experience'
          }
        ]
      },
      {
        id: 'nai_form',
        title: 'ない Form',
        content: `
# ない Form (Plain Negative Form)

The ない form is the plain negative form of Japanese verbs. It is used in casual speech to express that an action will not happen, is not happening, or did not happen. It is also a building block for many other negative grammatical structures.

## Formation

The formation of the ない form depends on the verb group.

### Group 1 Verbs (Godan Verbs)

For Group 1 verbs, change the final "u" sound of the dictionary form to the "a" sound and then add ない. If the verb ends in う (u), it changes to わ (wa) before adding ない.

*   **行く (iku - to go)** → 行か (ika) + ない → **行かない (ikanai)**
*   **飲む (nomu - to drink)** → 飲ま (noma) + ない → **飲まない (nomanai)**
*   **話す (hanasu - to speak)** → 話さ (hanasa) + ない → **話さない (hanasanai)**
*   **買う (kau - to buy)** → 買わ (kawa) + ない → **買わない (kawanai)**

### Group 2 Verbs (Ichidan Verbs)

For Group 2 verbs, simply remove the final る (ru) from the dictionary form and add ない.

*   **食べる (taberu - to eat)** → 食べ (tabe) + ない → **食べない (tabenai)**
*   **見る (miru - to see)** → 見 (mi) + ない → **見ない (minai)**
*   **起きる (okiru - to wake up)** → 起き (oki) + ない → **起きない (okinai)**

### Irregular Verbs

*   **する (suru - to do)** → **しない (shinai)**
*   **来る (kuru - to come)** → **来ない (konai)**

## Usage

The ない form is used for:

1.  **Plain Negative Statements:** To express negation in casual speech.
    *   **明日、学校に行かない。** (Ashita, gakkou ni ikanai.) - I won't go to school tomorrow.

2.  **Prohibition (でください):** To tell someone not to do something (less polite than ないでください).
    *   **ここに座らないでください。** (Koko ni suwaranai de kudasai.) - Please don't sit here.

3.  **Necessity (なければならない):** To express obligation or necessity.
    *   **勉強しなければならない。** (Benkyou shinakereba naranai.) - I must study.

4.  **Without Doing (ないで):** To indicate doing something without doing another action.
    *   **何も食べないで寝た。** (Nani mo tabenai de neta.) - I went to bed without eating anything.

## Past Negative (なかった)

To make the ない form past tense, replace the い with かった.

*   **行かない (ikanai)** → **行かなかった (ikanakatta - didn't go)**
*   **食べない (tabenai)** → **食べなかった (tabenakatta - didn't eat)**
        `,
        examples: [
          { japanese: '今日は何も食べない。', romaji: 'Kyou wa nani mo tabenai.', english: 'I won\'t eat anything today.' },
          { japanese: '嘘をつかないでください。', romaji: 'Uso o tsukanai de kudasai.', english: 'Please don\'t lie.' },
          { japanese: 'まだ宿題をしていない。', romaji: 'Mada shukudai o shite inai.', english: 'I haven\'t done my homework yet.' },
        ],
        nuances: [
          'The ない form is the plain negative equivalent of the polite ません form. It is crucial for casual conversations and for forming more complex negative grammatical structures.',
          'Pay close attention to the vowel changes for Group 1 verbs, especially the う → わ change.',
        ],
        quiz: []
      },
    ]
  },
  {
    id: 'adjective_forms',
    title: 'Adjective Forms',
    description: 'Explore the different forms of い-adjectives and な-adjectives.',
    topics: [
      {
        id: 'i_adjective',
        title: 'い-Adjectives',
        content: `
# い-Adjectives

い-adjectives (い形容詞 - i-keiyoushi) are a category of Japanese adjectives that always end with the hiragana い (i) in their dictionary form. They directly modify nouns and can be conjugated to express different tenses and polarities.

## Usage

1.  **Modifying Nouns:** Place the い-adjective directly before the noun it modifies.
    *   **高い山** (takai yama) - a tall mountain
    *   **新しい車** (atarashii kuruma) - a new car

2.  **Predicating Sentences:** When an い-adjective ends a sentence, it acts as the predicate.
    *   **この本は面白いです。** (Kono hon wa omoshiroi desu.) - This book is interesting.

## Conjugation

い-adjectives conjugate by changing the final い.

### 1. Negative Form (くない)

Replace the final い with くない (kunai).

*   **高い (takai - expensive/tall)** → 高くない (takakunai - not expensive/tall)
*   **美味しい (oishii - delicious)** → 美味しくない (oishikunai - not delicious)

### 2. Past Form (かった)

Replace the final い with かった (katta).

*   **高い (takai)** → 高かった (takakatta - was expensive/tall)
*   **美味しい (oishii)** → 美味しかった (oishikatta - was delicious)

### 3. Past Negative Form (くなかった)

Combine the negative and past forms: replace the final い with くなかった (kunakatta).

*   **高い (takai)** → 高くなかった (takakunakatta - was not expensive/tall)
*   **美味しい (oishii)** → 美味しくなかった (oishikunakatta - was not delicious)

### 4. Connecting Adjectives (くて)

To connect two い-adjectives or an い-adjective to a verb, change the final い to くて (kute).

*   **安くて美味しいレストラン** (yasukute oishii resutoran) - a cheap and delicious restaurant
*   **寒くて、外に出たくない。** (Samukute, soto ni detakunai.) - It's cold, so I don't want to go outside.

## Special Case: 良い (ii - good)

The adjective 良い (ii - good) is irregular. While its dictionary form is 良い (ii), its conjugations are based on 良い (yoi).

*   **良い (ii)** → 良くない (yokunai - not good)
*   **良い (ii)** → 良かった (yokatta - was good)
*   **良い (ii)** → 良くなかった (yokunakatta - was not good)
        `,
        examples: [
          { japanese: 'このりんごは甘いです。', romaji: 'Kono ringo wa amai desu.', english: 'This apple is sweet.' },
          { japanese: '昨日は寒かったです。', romaji: 'Kinou wa samukatta desu.', english: 'It was cold yesterday.' },
          { japanese: 'この映画は面白くないです。', romaji: 'Kono eiga wa omoshirokunai desu.', english: 'This movie is not interesting.' },
        ],
        nuances: [
          'い-adjectives directly modify nouns without needing any particle in between.',
          'The final い is dropped before adding conjugation endings.',
          'Remember the irregular conjugation of 良い (ii).',
        ],
        quiz: [
          {
            question: 'Which of the following is an い-adjective?',
            options: ['きれい (kirei)', '静か (shizuka)', '高い (takai)', '有名 (yuumei)'],
            answer: '高い (takai)'
          },
          {
            question: 'What is the negative form of 美味しい (oishii - delicious)?',
            options: ['美味しいじゃない (oishii janai)', '美味しくない (oishikunai)', '美味しくなかった (oishikunakatta)', '美味しいではありません (oishii dewa arimasen)'],
            answer: '美味しくない (oishikunai)'
          },
          {
            question: 'What is the past form of 良い (ii - good)?',
            options: ['良かった (yokatta)', 'いいかった (iikatta)', '良くない (yokunai)', '良いでした (ii deshita)'],
            answer: '良かった (yokatta)'
          }
        ]
      },
      {
        id: 'na_adjective',
        title: 'な-Adjectives',
        content: `
# な-Adjectives

な-adjectives (な形容詞 - na-keiyoushi), also known as nominal adjectives or adjectival nouns, are a category of Japanese adjectives that require the particle な (na) when directly modifying a noun. When used as a predicate at the end of a sentence, they typically end with です (desu) or だ (da).

## Usage

1.  **Modifying Nouns:** Add な (na) between the な-adjective and the noun it modifies.
    *   **きれいな花** (kirei **na** hana) - a beautiful flower
    *   **有名な場所** (yuumei **na** basho) - a famous place

2.  **Predicating Sentences:** When a な-adjective ends a sentence, it acts as the predicate and is followed by です (desu) for polite speech or だ (da) for plain speech.
    *   **この部屋はきれいです。** (Kono heya wa kirei desu.) - This room is beautiful.
    *   **彼は有名だ。** (Kare wa yuumei da.) - He is famous.

## Conjugation

な-adjectives conjugate using です/だ and their negative/past forms.

### 1. Negative Form (じゃない / ではありません)

For plain negative, add じゃない (janai). For polite negative, add ではありません (dewa arimasen) or じゃありません (ja arimasen).

*   **きれい (kirei - beautiful/clean)** → きれいじゃない (kirei janai - not beautiful/clean)
*   **きれい (kirei)** → きれいではありません (kirei dewa arimasen - not beautiful/clean, polite)

### 2. Past Form (だった / でした)

For plain past, add だった (datta). For polite past, add でした (deshita).

*   **きれい (kirei)** → きれいだった (kirei datta - was beautiful/clean)
*   **きれい (kirei)** → きれいでした (kirei deshita - was beautiful/clean, polite)

### 3. Past Negative Form (じゃなかった / ではありませんでした)

For plain past negative, add じゃなかった (janakatta). For polite past negative, add ではありませんでした (dewa arimasen deshita) or じゃありませんでした (ja arimasen deshita).

*   **きれい (kirei)** → きれいじゃなかった (kirei janakatta - was not beautiful/clean)
*   **きれい (kirei)** → きれいではありませんでした (kirei dewa arimasen deshita - was not beautiful/clean, polite)

### 4. Connecting Adjectives (で)

To connect two な-adjectives or a な-adjective to a verb, use で (de).

*   **静かで便利な場所** (shizuka **de** benri na basho) - a quiet and convenient place
*   **元気で頑張ります。** (Genki **de** ganbarimasu.) - I'll do my best energetically.
        `,
        examples: [
          { japanese: 'これは便利な辞書です。', romaji: 'Kore wa benri na jisho desu.', english: 'This is a convenient dictionary.' },
          { japanese: '昨日は暇でした。', romaji: 'Kinou wa hima deshita.', english: 'I was free yesterday.' },
          { japanese: 'この町は静かじゃない。', romaji: 'Kono machi wa shizuka janai.', english: 'This town is not quiet.' },
        ],
        nuances: [
          'The key difference from い-adjectives is the need for な when modifying nouns.',
          'な-adjectives behave more like nouns when used as predicates, taking です/だ and their conjugations.',
          'Many な-adjectives are derived from Chinese loanwords or are concepts that describe a state or quality.',
        ],
        quiz: [
          {
            question: 'Which particle is required when a な-adjective directly modifies a noun?',
            options: ['が (ga)', 'を (wo)', 'な (na)', 'に (ni)'],
            answer: 'な (na)'
          },
          {
            question: 'What is the polite past form of きれい (kirei - beautiful/clean)?',
            options: ['きれいだった (kirei datta)', 'きれいでした (kirei deshita)', 'きれいじゃない (kirei janai)', 'きれいではありません (kirei dewa arimasen)'],
            answer: 'きれいでした (kirei deshita)'
          },
          {
            question: 'In the phrase "静かで便利な場所", what does で connect?',
            options: ['Two nouns', 'A noun and a verb', 'Two な-adjectives', 'An い-adjective and a な-adjective'],
            answer: 'Two な-adjectives'
          }
        ]
      }
    ]
  }
];
