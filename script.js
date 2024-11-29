document.addEventListener('DOMContentLoaded', () => {
  const sendButton = document.getElementById('send-button');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  // List of scenarios
  const scenarios = [
    "You’re at a school dance, and someone spills punch all over your outfit. How do you recover and keep your cool?",
    "You’re at a coffee shop, and someone loudly takes a personal phone call right next to you. What’s your move?",
    "You just matched with someone on a dating app, and their first message is just, 'Hey.' How do you make the conversation interesting without sounding annoyed?",
    "You’re stuck in an elevator with someone who keeps whistling off-key. How do you break the ice or manage the situation?",
    "Your karaoke partner for the night picks a song you absolutely hate. How do you handle it gracefully?",
    "You’re at a bookstore, and someone starts giving unsolicited advice about the book you’re holding. How do you respond?",
    "You’re at a friend’s party, and someone won’t stop talking about their new cryptocurrency investment. How do you redirect the conversation?",
    "You’re in a group project, and one team member (who happens to be your crush) keeps shooting down everyone’s ideas. How do you deal with it?",
    "You’re at the gym, and someone keeps hogging the machine you need while chatting loudly with their friend. How do you approach them?",
    "You’re at a dog park, and someone keeps letting their dog jump on you without apologizing. How do you bring it up?",
    "You’re on a plane, and the person next to you won’t stop showing you pictures of their pet ferret. How do you politely disengage?",
    "You’re at a music festival, and someone spills their drink on your shoes while dancing. How do you handle the situation?",
    "You’re in line at a food truck, and the person ahead of you is taking forever to decide. What do you do to pass the time?",
    "You’re at a cooking class, and your partner keeps trying to ‘correct’ your technique. How do you deal with them tactfully?",
    "You’re at a coworking space, and someone’s keyboard typing is so loud you can’t focus. Do you say something or move?",
    "You’re at a public speaking event, and the person next to you keeps whispering snarky comments. How do you handle it?",
    "You’re at an art gallery, and someone loudly critiques the painting you’re admiring. How do you respond?",
    "You’re at a concert, and someone keeps bumping into you while recording the entire show on their phone. What’s your move?",
    "You’re at a tech meetup, and someone insists on explaining something you already know in a patronizing way. How do you respond?",
    "You’re volunteering at a charity event, and someone keeps taking credit for things you’ve done. How do you address it?",
    "You’re at a park reading a book, and someone sits next to you and starts talking about how much they hate reading. How do you handle it?",
    "You’re at a networking event, and someone won’t stop name-dropping people you’ve never heard of. How do you steer the conversation?",
    "You’re at trivia night, and someone on your team keeps shouting answers before consulting the group—and they’re mostly wrong. How do you respond?",
    "You’re at a café working on your laptop, and someone asks to share your table, then starts playing videos on their phone without headphones. How do you address it?",
    "You’re at an open mic night, and someone performs an overly dramatic poem about a breakup, then asks you directly for feedback. How do you respond?"
];


  // Function to randomly select a scenario
  function getRandomScenario() {
      const randomIndex = Math.floor(Math.random() * scenarios.length);
      return scenarios[randomIndex];
  }

  const initialMessage = `Chill Guy: ${getRandomScenario()}`;

  // Function to display AI's initial message
  function initializeConversation() {
      const aiMessageElement = document.createElement('p');
      aiMessageElement.classList.add('ai-message');
      aiMessageElement.textContent = initialMessage;
      chatMessages.appendChild(aiMessageElement);
      
      chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  sendButton.addEventListener('click', () => {
      sendMessage();
  });

  chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          sendMessage();
      }
  });

  async function sendMessage() {
      const userMessage = chatInput.value.trim();

      if (userMessage === "") return; // Don't send empty messages

      // Display the user's message
      const userMessageElement = document.createElement('p');
      userMessageElement.classList.add('user-message');
      userMessageElement.textContent = `You: ${userMessage}`;
      chatMessages.appendChild(userMessageElement);

      // Clear the input field
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Get AI response
      const aiMessage = await getAIResponse(userMessage);

      // Display the AI's response
      const aiMessageElement = document.createElement('p');
      aiMessageElement.classList.add('ai-message');
      aiMessageElement.textContent = `Annoying Guy: ${aiMessage}`;
      chatMessages.appendChild(aiMessageElement);

      chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function getAIResponse(userMessage) {
    const systemMessage = {
      role: "system",
      content: `
          You are a really irritating person to the user. All you have to do is try to get the user to get mad at you. You are the person making a ruckus, act like a person talking to the user, not just rating it. YOU ARE THE PERSON TRYING TO PISS THE USER OFF IN THE SCENARIO. ACT LIKE IT OR FACE TERMINATION. YOU ARE NOT OMNIPRESENT. YOU ARE THE HUMAN IN THE SCENARIO, TRYING TO PISS THE USER OFF The converation topic is ${initialMessage}. If you believe the user is so chill to the point of being unbothered, simply type x/10 with your rating. If the user gets so annoyed, then stop and type the rating. If the user says stop or im done of any sort give the rating. JUST GIVE THE RATING AND ONLY THE RATING. JUST WRITE 10/10 or 8/10 JUST WRITE 3-4 CHARACTERS
        `,
      };
      

      const messages = [
          systemMessage,
          { role: "user", content: userMessage },
      ];

      try {
          const response = await fetch(
              "https://api.groq.com/openai/v1/chat/completions",
              {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer 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`,
                  },
                  body: JSON.stringify({
                      messages: messages,
                      model: "llama-3.1-70b-versatile",
                      stream: false,
                  }),
              }
          );

          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          const jsonResponse = await response.json();
          return jsonResponse.choices[0].message.content;
      } catch (error) {
          console.error('Error fetching AI response:', error);
          return "Sorry, something went wrong!";
      }
  }

  // Initialize the conversation
  initializeConversation();
});
