// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory } = require('botbuilder');

class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            const asking_conditions = ["are", "Are", "is", "Is"];
            const setting_conditions = ["want", "Want", "set", "Set", "book", "Book"];

            const asking_test = asking_conditions.some(el => context.activity.text.includes(el));
            const setting_test = setting_conditions.some(el => context.activity.text.includes(el));

            let replyText = "I'm sorry I didn't understand that, please rephrase."
            if (asking_test) {
                replyText = "Current time slots available:\n8am9am10am11am12pm1pm2pm3pm4pm"
            } else if (setting_test) {
                replyText = "Your appointment was set."
            } else if (context.activity.text.includes("insurance")) {
                replyText = "We accept patients no matter their insurance situation.  There are many payment options available to you!"
            }
            await context.sendActivity(MessageFactory.text(replyText, replyText));
            
            /* OG Echo code here
            const replyText = `Echo: ${ context.activity.text }`;
            await context.sendActivity(MessageFactory.text(replyText, replyText));
            // By calling next() you ensure that the next BotHandler is run. */
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Welcome to the dental assistant chatbot.  Find or schedule appointments.';
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
